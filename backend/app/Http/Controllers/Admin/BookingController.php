<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
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
        return view('admin.pages.booking.index',compact('data'));
    }

    public function search(Request $request)
    {
        $perPage = $request->get('per_page', 10);
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

        $data = $query->paginate($perPage);
        $data->appends($request->all());

        return view('admin.pages.booking.index', compact('data'));
    }



}
