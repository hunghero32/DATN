<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Services;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $data = Booking::join('doctors','bookings.doctor_id','=','doctors.id')
            ->join('guests','bookings.guest_id','=','guests.id')
            ->join('services','bookings.service_id','=','services.id')
            ->select('bookings.*','doctors.doctor_name','guests.guest_name','services.services_name')
            ->where('bookings.isDeleted',0)
            ->paginate($perPage);

        $doctors = Doctor::pluck('doctor_name', 'id')->toArray();
        $services = Services::pluck('services_name', 'id')->toArray();
        $statuses = [
            '' => 'Tất cả trạng thái',
            'pending' => 'Chờ xác nhận',
            'confirmed' => 'Đã xác nhận',
            'completed' => 'Hoàn thành',
            'cancelled' => 'Đã hủy'
        ];

        return view('admin.pages.booking.index', compact('data', 'doctors', 'services', 'statuses'));
    }

    public function search(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $status = $request->input('status');
        $search = $request->input('search');
        $doctor_id = $request->input('doctor_id');
        $service_id = $request->input('service_id');
        $date_from = $request->input('date_from');
        $date_to = $request->input('date_to');

        $query = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select('bookings.*', 'doctors.doctor_name', 'guests.guest_name', 'services.services_name')
            ->where('bookings.isDeleted', 0);

        if (!empty($status)) {
            $query->where('bookings.status', $status);
        }

        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('guests.guest_name', 'like', '%' . $search . '%')
                  ->orWhere('doctors.doctor_name', 'like', '%' . $search . '%')
                  ->orWhere('services.services_name', 'like', '%' . $search . '%');
            });
        }

        if (!empty($doctor_id)) {
            $query->where('bookings.doctor_id', $doctor_id);
        }

        if (!empty($service_id)) {
            $query->where('bookings.service_id', $service_id);
        }

        if (!empty($date_from)) {
            $query->whereDate('bookings.booking_date', '>=', $date_from);
        }

        if (!empty($date_to)) {
            $query->whereDate('bookings.booking_date', '<=', $date_to);
        }

        $data = $query->paginate($perPage);
        $data->appends($request->all());

        $doctors = Doctor::pluck('doctor_name', 'id')->toArray();
        $services = Services::pluck('services_name', 'id')->toArray();
        $statuses = [
            '' => 'Tất cả trạng thái',
            'pending' => 'Chờ xác nhận',
            'confirmed' => 'Đã xác nhận',
            'completed' => 'Hoàn thành',
            'cancelled' => 'Đã hủy'
        ];

        return view('admin.pages.booking.index', compact('data', 'doctors', 'services', 'statuses'));
    }



}
