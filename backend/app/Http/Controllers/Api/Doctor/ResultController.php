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
        $results = Result::with(['guest', 'doctor', 'booking'])
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

        if ($results->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy kết quả phù hợp.'
            ], 200);
        }

        return response()->json($results, 200);
    }

    /**
     * Thêm kết quả khám thủ công chắc không dùng tới đâu
     */
    public function store(StoreResultRequest $request)
    {
        $data = $request->validated();
        if (isset($data['booking_id'])) {
            $booking = Booking::find($data['booking_id']);
            if (!$booking) {
                return response()->json([
                    'message' => 'Booking không hợp lệ.'
                ], 404);
            }
        } else {
            // Nếu không có booking_id, tìm booking gần nhất của bệnh nhân
            $booking = Booking::where('guest_id', $request->input('guest_id'))
                ->where('status', 'confirmed')
                ->whereDate('booking_date', today())
                ->whereTime('booking_time', '>=', now()->format('H:i:s'))
                ->orderBy('booking_date', 'asc')
                ->orderBy('booking_time', 'asc')
                ->first();
            if (!$booking) {
                return response()->json([
                    'message' => 'Không tìm thấy booking phù hợp.'
                ], 404);
            }
            $data['booking_id'] = $booking->id;
        }
        $data['doctor_id'] = $booking->doctor_id;
        $data['guest_id'] = $booking->guest_id;
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('results', 'public');
        }
        $result = Result::create($data);
        return response()->json([
            'message' => 'Tạo kết quả thành công.',
            'data' => $result
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
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền chỉnh sửa kết quả này.'], 403);
        }

        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');

        // Tìm kết quả theo booking_id và đảm bảo nó thuộc về bác sĩ hiện tại
        $result = Result::where('booking_id', $booking_id)
            ->where('doctor_id', $doctorId)
            ->first();

        if (!$result) {
            return response()->json(['message' => 'Không tìm thấy kết quả hoặc bạn không có quyền chỉnh sửa.'], 404);
        }

        $data = $request->validated();

        // Nếu có file mới, xóa file cũ rồi lưu file mới
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
            'data'    => $result
        ], 200);
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
