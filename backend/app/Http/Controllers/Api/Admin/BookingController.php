<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $data = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select('bookings.*', 'doctors.doctor_name', 'guests.guest_name', 'services.services_name')
            ->where('bookings.isDeleted', 0)
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách đặt lịch khám bệnh',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Booking::find($id);
        if (!$data) {
            return response()->json(['success' => false, 'message' => 'Không tìm thấy đặt lịch'], 404);
        }

        if ($data->status == 'pending') {
            $data->isDeleted = 1;
            $data->save();

            return response()->json([
                'success' => true,
                'message' => 'Xóa thành công đặt lịch khám bệnh'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Không thể xóa đặt lịch khám bệnh đã được xác nhận'
            ], 400);
        }
    }

    public function search(Request $request)
    {
        $status = $request->input('status');
        $search = $request->input('search');

        $query = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select('bookings.*', 'doctors.doctor_name', 'guests.guest_name', 'services.services_name')
            ->where('bookings.isDeleted', 0);

        if (!empty($status) && $status !== 'all') {
            $query->where('bookings.status', $status);
        }

        if (!empty($search)) {
            $query->where('guests.guest_name', 'like', '%' . $search . '%');
        }

        $data = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Kết quả tìm kiếm đặt lịch khám bệnh',
            'data' => $data
        ], 200);
    }


    public function showDoctor($doctor_id)
    {
        $today = Carbon::today()->toDateString(); // Lấy ngày hôm nay
        $data = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->select('doctors.doctor_name', 'bookings.booking_date', 'bookings.booking_time')
            ->where('bookings.doctor_id', $doctor_id)
            ->where('bookings.booking_date', '>=', $today)
            ->where('bookings.isDeleted', 0) // loại bỏ lịch đã bị xóa (nếu có cờ này)
            ->whereNotIn('bookings.status', ['canceled', 'examining']) // loại bỏ lịch đã hủy hoặc đang khám
            ->orderBy('bookings.booking_date')
            ->orderBy('bookings.booking_time')
            ->get();
        if ($data->isEmpty()) {
            return response()->json(['success' => false, 'message' => 'Không có lịch khám từ hôm nay '], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Danh sách lịch khám   ',
            'data' => $data
        ], 200);
    }
}
