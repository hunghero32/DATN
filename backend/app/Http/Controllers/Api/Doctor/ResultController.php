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
            return response()->json(['message' => 'Booking ID is required to create a result.'], 400);
        }

        // Check if the booking exists and belongs to the doctor
        $booking = Booking::where('id', $data['booking_id'])
                           ->where('doctor_id', $doctorId)
                           ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking không hợp lệ hoặc không thuộc về bác sĩ này.'], 404);
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

            // Handle file upload
            if ($request->hasFile('file')) {
                // Delete old file if it exists
                if ($result->file) {
                    Storage::disk('public')->delete($result->file);
                }
                // Store the new file
                $data['file'] = $request->file('file')->store('results', 'public');
            } else {
                // If no new file is uploaded, keep the existing file path unless explicitly cleared
                // (UpdateResultRequest should handle if null is allowed)
                // Ensure 'file' key exists in $data if it's being kept or nulled
                 if ($request->filled('file')) { // Check if 'file' field was sent (even if empty)
                     $data['file'] = $result->file; // Keep existing if not explicitly cleared
                 } else if (!$request->exists('file')) { // If 'file' key wasn't sent at all
                     // This means no change was intended for the file, keep existing
                     $data['file'] = $result->file;
                 }
                 // If $request->hasFile('file') is false but $request->filled('file') is true with an empty value,
                 // it implies the user wants to remove the file - $data['file'] would be null via validation.
            }


            // Update the result using fill() which respects $fillable or use forceFill() if needed
            // Using fill() is generally safer if $fillable is defined correctly in Result model
            $result->fill([
                'diagnosis' => $data['diagnosis'] ?? $result->diagnosis,
                'prescription' => $data['prescription'] ?? $result->prescription,
                'note' => $data['note'] ?? $result->note,
                'file' => $data['file'] ?? $result->file, // Assign the potentially updated file path
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
                'message' => 'Lỗi xác thực dữ liệu.',
                'errors' => $e->errors()
            ], 422);
        }
         catch (\Exception $e) {
            Log::error('Error Updating Result by Booking', [
                'booking_id' => $booking_id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Lỗi máy chủ khi cập nhật kết quả: ' . $e->getMessage()
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
            "result",
            $booking->id
        );
    }
}