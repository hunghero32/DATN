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
            ->searchGuest($request->search) // search theo tên, sđt, email của guest
            ->filterGender($request->gender) // lọc theo giới tính
            ->filterAge($request->age) // lọc theo độ tuổi
            ->filterSpecialty($request->specialty) // lọc theo chuyên khoa  
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
        if (auth()->user()->role === 'doctor' && isset($validatedData['status']) && $validatedData['status'] === 'confirmed') {
            $validatedData['doctor_id'] = auth()->id();
        }
        $booking->update($validatedData);
        return response()->json([
            'booking' => $booking,
            'message' => 'Bác sĩ nhận lịch thành công.'
        ], 200);
    }
}