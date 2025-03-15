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
     * Cập nhật đặt lịch.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        $validatedData = $request->validated();
        // Chỉ bác sĩ mới có quyền cập nhật booking
        if (auth()->user()->role === 'doctor') {
            if ($validatedData['status'] === 'confirmed') {
                // Khi xác nhận thì gán doctor_id cho bác sĩ đăng nhập
                $validatedData['doctor_id'] = auth()->id();
            } elseif ($validatedData['status'] === 'completed') {
                // Chỉ cho phép hoàn thành nếu booking đã được xác nhận trước đó
                if ($booking->status !== 'confirmed') {
                    return response()->json([
                        'message' => 'Lịch hẹn phải được xác nhận trước khi hoàn thành.'
                    ], 400);
                }
                $this->createResultForBooking($booking);
            }
        } else {
            return response()->json([
                'message' => 'Bạn không có quyền cập nhật lịch hẹn này.'
            ], 403);
        }
        $booking->update($validatedData);
        return response()->json([
            'booking' => $booking,
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