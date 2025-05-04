<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Services;
use App\Models\Guest;
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

        $doctors = Doctor::join('bookings', 'doctors.id', '=', 'bookings.doctor_id')
            ->where('doctors.isDeleted', 0)
            ->where('bookings.isDeleted', 0)
            ->distinct()
            ->pluck('doctors.doctor_name', 'doctors.id')
            ->toArray();

        return view('admin.pages.booking.index', compact('data', 'doctors'));
    }

    public function search(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $status = $request->input('status');
        $search = $request->input('search');
        $guest_name = $request->input('guest_name');

        $query = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select(
                'bookings.*',
                'doctors.doctor_name',
                'guests.guest_name',
                'services.services_name',
                'services.price as service_price'
            )
            ->where('bookings.isDeleted', 0);

        // Search by keyword across multiple fields
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('doctors.doctor_name', 'like', '%' . $search . '%')
                    ->orWhere('guests.guest_name', 'like', '%' . $search . '%')
                    ->orWhere('services.services_name', 'like', '%' . $search . '%')
                    ->orWhere('bookings.booking_date', 'like', '%' . $search . '%')
                    ->orWhere('bookings.booking_time', 'like', '%' . $search . '%');
            });
        }

        // Filter by guest name
        if ($guest_name) {
            $query->where('guests.guest_name', 'like', '%' . $guest_name . '%');
        }

        // Filter by status
        if ($status && $status !== 'all') {
            $query->where('bookings.status', $status);
        }

        // Add specific filters
        if ($request->input('guest_id') && $request->input('guest_id') !== 'all') {
            $query->where('bookings.guest_id', $request->input('guest_id'));
        }
        if ($request->input('doctor_id') && $request->input('doctor_id') !== 'all') {
            $query->where('bookings.doctor_id', $request->input('doctor_id'));
        }
        if ($request->input('service_id') && $request->input('service_id') !== 'all') {
            $query->where('bookings.service_id', $request->input('service_id'));
        }

        $data = $query->orderBy('bookings.created_at', 'desc')
            ->paginate($perPage);
        $data->appends($request->all());

        // Get data for dropdowns
        $guests = Guest::join('bookings', 'guests.id', '=', 'bookings.guest_id')
            ->where('guests.isDeleted', 0)
            ->where('bookings.isDeleted', 0)
            ->distinct()
            ->pluck('guests.guest_name', 'guests.id')
            ->toArray();
        $doctors = Doctor::join('bookings', 'doctors.id', '=', 'bookings.doctor_id')
            ->where('doctors.isDeleted', 0)
            ->where('bookings.isDeleted', 0)
            ->distinct()
            ->pluck('doctors.doctor_name', 'doctors.id')
            ->toArray();

        $services = Services::where('isDeleted', 0)->pluck('services_name', 'id')->toArray();
        $statuses = config('app.statuses');

        return view('admin.pages.booking.index', compact('data', 'guests', 'doctors', 'services', 'statuses'));
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
