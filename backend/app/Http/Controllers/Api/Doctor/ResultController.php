<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Result;
use App\Models\Booking;
use App\Models\Doctor;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\UpdateResultRequest;
use App\Services\NotificationService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ResultController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $results = Result::with([
            'guest',
            'doctor',
            'booking.service'
        ])
            ->where('isDeleted', 0)
            ->whereHas('doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->when($request->booking_id, function ($query) use ($request) {
                return $query->where('booking_id', $request->booking_id);
            })
            ->searchGuest($request->search)          // Tìm theo tên, sđt, email khách hàng
            ->filterBookingDate($request->booking_date) // Lọc theo ngày đặt lịch
            ->filterBookingTime($request->booking_time) // Lọc theo giờ đặt lịch
            ->latest('updated_at')->paginate(10);

        return response()->json($results, 200);
    }

    /**
     * Thêm kết quả khám thủ công chắc không dùng tới đâu
     */
    public function store(StoreResultRequest $request)
    {
        $data = $request->validated();
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');

        if (!isset($data['booking_id'])) {
            return response()->json(['message' => 'Cần có mã lịch hẹn để tạo kết quả.'], 400);
        }

        // Check if the booking exists and belongs to the doctor
        $booking = Booking::where('id', $data['booking_id'])
            ->where('doctor_id', $doctorId)
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking không hợp lệ hoặc không thuộc về bác sĩ này.'], 404);
        }
        // Kiểm tra nếu chưa đến thời gian khám thì không cho phép tạo kết quả
        $bookingDateTime = Carbon::parse($booking->booking_date . ' ' . $booking->booking_time);
        if (now()->lt($bookingDateTime)) {
            return response()->json([
                'message' => 'Bạn chỉ có thể tạo kết quả sau khi lịch hẹn đã diễn ra.'
            ], 400);
        }
        // Check if a result already exists for this booking
        $existingResult = Result::where('booking_id', $data['booking_id'])->first();
        if ($existingResult) {
            return response()->json(['message' => 'Kết quả cho lịch khám này đã tồn tại. Vui lòng cập nhật.'], 409); // 409 Conflict
        }

        $data['doctor_id'] = $doctorId;
        $data['guest_id'] = $booking->guest_id;

        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('results', 'public');
        }

        $result = Result::create($data);
        $booking->update(['status' => 'completed']);
        // Send notification upon creation
        $this->sendResultNotification($booking);

        return response()->json([
            'message' => 'Tạo kết quả thành công.',
            'data' => $result->load(['guest', 'doctor', 'booking']) // Load relationships
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Result $result)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền xem kết quả này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu kết quả
        if (!$doctorId || $result->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể xem kết quả của bác sĩ khác.'], 403);
        }
        return response()->json($result->load(['guest', 'doctor', 'booking']), 200);
    }
    public function showByBooking($booking_id)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền xem kết quả này.'], 403);
        }

        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');

        // Tìm kết quả theo booking_id và đảm bảo nó thuộc về bác sĩ hiện tại
        $result = Result::with(['guest', 'doctor', 'booking'])
            ->where('booking_id', $booking_id)
            ->where('doctor_id', $doctorId) // Chỉ lấy kết quả của bác sĩ hiện tại
            ->first();

        if (!$result) {
            return response()->json(['message' => 'Không tìm thấy kết quả hoặc bạn không có quyền truy cập.'], 404);
        }

        return response()->json($result, 200);
    }
    public function updateByBooking(UpdateResultRequest $request, $booking_id)
    {
        try {
            // Ensure user is an authenticated doctor
            if (!auth()->check() || auth()->user()->role !== 'doctor') {
                return response()->json(['message' => 'Bạn không có quyền chỉnh sửa kết quả này.'], 403);
            }

            // Get doctor_id for the current user
            $doctorId = Doctor::where('user_id', auth()->id())->value('id');
            if (!$doctorId) {
                return response()->json(['message' => 'Không tìm thấy thông tin bác sĩ.'], 404);
            }

            // Find the existing result by booking_id and doctor_id
            $result = Result::where('booking_id', $booking_id)
                ->where('doctor_id', $doctorId)
                ->first();

            // If result doesn't exist, return 404
            if (!$result) {
                return response()->json(['message' => 'Không tìm thấy kết quả để cập nhật hoặc bạn không có quyền truy cập.'], 404);
            }

            // Log before update
            Log::info('Result Before Update', [
                'result_id' => $result->id,
                'booking_id' => $booking_id,
                'doctor_id' => $doctorId,
                'request_data' => $request->all()
            ]);

            // Get validated data
            $data = $request->validated();

            // Xử lý upload file
            if ($request->hasFile('file')) {
                // Xóa file cũ nếu tồn tại
                if ($result->file) {
                    Storage::disk('public')->delete($result->file);
                }
                // Lưu file mới
                $data['file'] = $request->file('file')->store('results', 'public');
            } else {
                if ($request->filled('file')) { // Kiểm tra xem trường 'file' có được gửi không (kể cả rỗng)
                    $data['file'] = $result->file; // Giữ file hiện tại nếu không bị xóa rõ ràng
                } else if (!$request->exists('file')) { // Nếu key 'file' không được gửi
                    $data['file'] = $result->file;
                }
            }

            $result->fill([
                'diagnosis' => $data['diagnosis'] ?? $result->diagnosis,
                'prescription' => $data['prescription'] ?? $result->prescription,
                'note' => $data['note'] ?? $result->note,
                'file' => $data['file'] ?? $result->file, 
            ]);

            // Save the changes
            $result->save();

            // Log after update
            Log::info('Result After Update', [
                'result' => $result->fresh()->toArray() // Get fresh data
            ]);

            // Send notification (consider if needed on every update)
            if ($result->booking) {
                $this->sendResultNotification($result->booking);
            }

            return response()->json([
                'message' => 'Cập nhật kết quả thành công.',
                // Load relationships for the response
                'data' => $result->load(['guest', 'doctor', 'booking'])
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation Error during Result Update', [
                'booking_id' => $booking_id,
                'errors' => $e->errors(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error Updating Result by Booking', [
                'booking_id' => $booking_id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Đã xảy ra lỗi khi cập nhật kết quả: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResultRequest $request, Result $result)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền chỉnh sửa kết quả này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu kết quả
        if (!$doctorId || $result->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể chỉnh sửa kết quả của bác sĩ khác.'], 403);
        }
        $data = $request->validated();
        if ($request->hasFile('file')) {
            if ($result->file) {
                Storage::disk('public')->delete($result->file);
            }
            $data['file'] = $request->file('file')->store('results', 'public');
        }
        $result->update($data);
        // Gửi thông báo
        $this->sendResultNotification($result->booking);
        return response()->json([
            'message' => 'Cập nhật kết quả thành công.',
            'data' => $result
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($result)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền xóa kết quả này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu kết quả
        if (!$doctorId || $result->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể xóa kết quả của bác sĩ khác.'], 403);
        }
        if ($result->file) {
            Storage::disk('public')->delete($result->file);
        }
        $result->delete();
        return response()->json(['message' => 'Xóa kết quả thành công.'], 200);
    }
    /**
     * Gửi thông báo khi có kết quả khám
     */
    private function sendResultNotification(Booking $booking)
    {
        $bookingDate = Carbon::parse($booking->booking_date)->format('d/m/Y');
        $bookingTime = Carbon::parse($booking->booking_time)->format('H:i');
        $title = "Kết quả khám {$booking->service->services_name} đã có";
        $content = "Lịch khám mã #{$booking->id} vào lúc {$bookingTime} ngày {$bookingDate} về {$booking->service->services_name} đã có kết quả khám. Hãy kiểm tra ngay!";
        $this->notificationService->sendNotification(
            $booking->guest->user_id ?? null,
            $title,
            $content,
            "result_complete",
            $booking->id
        );
    }
}
