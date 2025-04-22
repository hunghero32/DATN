<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotificationEmail;

class BookingController extends Controller
{
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $data = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select('bookings.*', 'guests.guest_name')
            ->where('bookings.isDeleted', 0)
            ->orderBy('bookings.created_at', 'desc')
            ->paginate($perPage);

        return view('admin.pages.booking.index', compact('data'));
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

        // Enhanced search functionality
        if ($search !== null && $search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('guests.guest_name', 'like', '%' . $search . '%')
                    ->orWhere('doctors.doctor_name', 'like', '%' . $search . '%')
                    ->orWhere('services.services_name', 'like', '%' . $search . '%');
            });
        }

        if ($status !== null && $status !== '') {
            $query->where('bookings.status', $status);
        }

        if ($doctor_id !== null && $doctor_id !== '') {
            $query->where('bookings.doctor_id', $doctor_id);
        }

        if ($service_id !== null && $service_id !== '') {
            $query->where('bookings.service_id', $service_id);
        }

        if ($date_from !== null && $date_from !== '') {
            $query->whereDate('bookings.booking_date', '>=', $date_from);
        }

        if ($date_to !== null && $date_to !== '') {
            $query->whereDate('bookings.booking_date', '<=', $date_to);
        }

        $data = $query->orderBy('bookings.created_at', 'desc')
            ->paginate($perPage);
        $data->appends($request->all());

        $doctors = Doctor::where('isDeleted', 0)->pluck('doctor_name', 'id')->toArray();
        $services = Services::where('isDeleted', 0)->pluck('services_name', 'id')->toArray();
        $statuses = config('app.order_statuses');

        return view('admin.pages.booking.index', compact('data', 'doctors', 'services', 'statuses'));
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $booking = Booking::findOrFail($id);
            $booking->status = $request->status;
            $booking->save();

            // 2. Gửi email thông báo nếu booking liên kết với guest có email
            //    (giả sử bảng guests có cột `email`)
            $guest = $booking->guest;
            if ($guest && isset($guest->email)) {
                $title   = 'Cập nhật trạng thái đặt lịch';
                $content = "Lịch khám #{$booking->id} của bạn đã được cập nhật sang trạng thái: {$booking->status}.";
                
                $url     = route('admin.bookings.edit', ['booking' => $booking->id]);

                Mail::to($guest->email)
                    ->send(new NotificationEmail($title, $content, $url));
            }

            return redirect()->back()->with('success', 'Cập nhật trạng thái thành công');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Có lỗi xảy ra khi cập nhật trạng thái');
        }
    }
}
