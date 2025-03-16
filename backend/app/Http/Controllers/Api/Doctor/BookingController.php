<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;

class BookingController extends Controller
{
    /**
     * Lấy danh sách đặt lịch.
     */
    public function index(Request $request)
    {
        // Sử dụng Scope để xử lý tìm kiếm và bộ lọc trong model Booking đọc kỹ vào nhé :))
        $bookings = Booking::with(['doctor', 'service', 'guest'])
            ->where('isDeleted', 0)
            ->where('doctor_id', auth()->id())
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
            ->latest('updated_at')
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
        // Kiểm tra quyền truy cập (chỉ cho phép bác sĩ xem lịch của mình)
        if (auth()->user()->role === 'doctor' && $booking->doctor_id !== auth()->id()) {
            return response()->json(['message' => 'Bạn không có quyền xem lịch hẹn này.'], 403);
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
        // Kiểm tra xem có đúng là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền cập nhật lịch hẹn này.'], 403);
        }
        // Kiểm tra quyền sở hữu booking
        if ($booking->doctor_id !== auth()->id()) {
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
            $this->createResultForBooking($booking);
        }
        // Cập nhật trạng thái
        $booking->update(['status' => $validate['status']]);
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
}
