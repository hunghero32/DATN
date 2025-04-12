<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Doctor;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Services\NotificationService;
use Carbon\Carbon;

class BookingController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }
    /**
     * Lấy danh sách đặt lịch.
     */
    public function index(Request $request)
    {
        // Sử dụng Scope để xử lý tìm kiếm và bộ lọc trong model Booking đọc kỹ vào nhé :))
        $bookings = Booking::with(['doctor', 'service', 'guest'])
            ->where('isDeleted', 0)
            ->whereHas('doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->searchGuest($request->search) // search theo tên, sđt, email của guest
            ->filterGender($request->gender) // lọc theo giới tính
            ->filterAge($request->age) // lọc theo độ tuổi
            ->filterSpecialty($request->specialty) // lọc theo chuyên khoa  
            ->when(auth()->user()->role === 'doctor' && $request->status === 'pending', function ($query) {
                return $query->filterDoctorPending(); // lọc theo trạng thái xác nhận
            })
            ->when(auth()->user()->role === 'doctor' && $request->status === 'confirmed', function ($query) {
                return $query->filterDoctorConfirmed(); // lọc theo trạng thái xác nhận
            })
            ->when(auth()->user()->role === 'doctor' && $request->status === 'completed', function ($query) {
                return $query->filterDoctorCompleted(); // lọc theo trạng thái hoàn thành
            })
            // Chỉ lấy booking chưa có kết quả khi có yêu cầu từ form
            ->when($request->boolean('available_for_result'), function ($query) {
                return $query->whereDoesntHave('result') // Chỉ lấy booking chưa có kết quả
                    ->whereIn('status', ['confirmed', 'completed']); // Chỉ lấy booking đã xác nhận hoặc hoàn thành
            })
            ->orderBy('booking_date', 'asc')
            ->orderBy('booking_time', 'asc')
            ->paginate(10);
        if ($bookings->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy thông tin đặt lịch phù hợp.',
                'data' => []
            ], 200);
        }
        return response()->json($bookings, 200);
    }
    /**
     * Hiển thị chi tiết đặt lịch.
     */
    public function show(Booking $booking)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền xem lịch hẹn này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu lịch hẹn
        if (!$doctorId || $booking->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể xem lịch hẹn của bác sĩ khác.'], 403);
        }
        // Load thông tin chi tiết với các quan hệ liên quan
        $booking->load(['doctor', 'service', 'guest', 'result']);

        return response()->json([
            'booking' => $booking
        ], 200);
    }
    /**
     * Cập nhật đặt lịch.
     */
    public function update(Request $request, Booking $booking)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền cập nhật lịch hẹn này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu lịch hẹn
        if (!$doctorId || $booking->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể cập nhật lịch hẹn của bác sĩ khác.'], 403);
        }
        // Validate trạng thái
        $validate = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled'
        ]);
        if ($booking->status === 'completed') {
            return response()->json([
                'message' => 'Lịch hẹn đã hoàn thành và kết quả đã được tạo trước đó.'
            ], 400);
        }
        // Kiểm tra logic cập nhật status
        if ($validate['status'] === 'completed' && $booking->status !== 'confirmed') {
            return response()->json(['message' => 'Lịch hẹn phải được xác nhận trước khi hoàn thành.'], 400);
        }
        // Nếu trạng thái là completed, tạo kết quả
        if ($validate['status'] === 'completed') {
            // Gộp ngày và giờ thành 1 đối tượng Carbon để so sánh
            $bookingDateTime = Carbon::parse($booking->booking_date . ' ' . $booking->booking_time);

            if (now()->lt($bookingDateTime)) {
                return response()->json(['message' => 'Bạn chỉ có thể hoàn thành lịch hẹn sau thời gian đã đặt.'], 400);
            }
            $this->createResultForBooking($booking);
        }
        // Cập nhật trạng thái
        $booking->update(['status' => $validate['status']]);
        // Gửi thông báo
        $this->sendBookingNotification($booking, $validate['status']);
        // Load lại dữ liệu để đảm bảo trạng thái mới nhất
        $updatedBooking = Booking::with('doctor', 'service', 'guest')->find($booking->id);
        return response()->json([
            'booking' => $updatedBooking,
            'message' => 'Cập nhật trạng thái lịch hẹn thành công.'
        ], 200);
    }


    private function createResultForBooking(Booking $booking)
    {
        // Kiểm tra nếu đã có Result thì không tạo lại
        if ($booking->result()->exists()) {
            return;
        }
        $booking->result()->create([
            'doctor_id' => $booking->doctor_id,
            'guest_id' => $booking->guest_id,
            'booking_id' => $booking->id,
        ]);
    }
    /**
     * Hàm riêng để xử lý thông báo khi cập nhật lịch
     */
    private function sendBookingNotification(Booking $booking, $status)
    {
        $statusMap = [
            'pending' => 'Chờ xác nhận',
            'confirmed' => 'Đã xác nhận',
            'completed' => 'Đã hoàn thành',
            'cancelled' => 'Đã hủy',
        ];
        $statusVi = $statusMap[$status] ?? 'Không xác định';
        $bookingDate = Carbon::parse($booking->booking_date)->format('d/m/Y');
        $bookingTime = Carbon::parse($booking->booking_time)->format('H:i');
        $title = "Cập nhật trạng thái lịch khám về {$booking->service->services_name}";
        $content = "Lịch khám #{$booking->id} về {$booking->service->services_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được cập nhật trạng thái: {$statusVi}";
        // Lấy ID của bác sĩ & khách hàng
        $doctorId = $booking->doctor->user_id ?? null;
        $guestId = $booking->guest->user_id ?? null;

        // Tạo danh sách người nhận
        $recipientIds = array_unique(array_filter(array_merge([$doctorId, $guestId])));
        // Gửi thông báo cập nhật trạng thái lịch khám
        foreach ($recipientIds as $userId) {
            $this->notificationService->sendNotification(
                $userId,
                $title,
                $content,
                "booking",
                $booking->id
            );
        }
        // Nếu trạng thái là "completed", gửi thêm thông báo về kết quả khám
        if ($status === 'completed' && $guestId) {
            $this->notificationService->sendNotification(
                $guestId,
                "Kết quả khám sắp có",
                "Kết quả khám của bạn về {$booking->service->services_name} vào lúc {$bookingTime} ngày {$bookingDate} sắp có, chờ xíu nhé!",
                "result",
                $booking->id
            );
        }
    }
}
