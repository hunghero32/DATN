<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Booking;
use App\Models\Guest;

class BookingController extends Controller
{
    // Lưu thông tin booking tạm thời
    public function tempBooking(Request $request)
    {
        $data = $request->validate([
            'specialty_id' => 'required',
            'doctor_id' => 'required',
            'schedule_id' => 'required',
            'date' => 'required|date',
            'service_id' => 'required',  // Add this
            'time' => 'required'         // Add this
        ]);

        // Store in session
        Session::put('temp_booking', $data);

        // Force session to be saved
        Session::save();

        return response()->json([
            'status' => true,
            'message' => 'Lưu thông tin đặt lịch tạm thời thành công',
            'data' => $data
        ])->withCookie(cookie('laravel_session', Session::getId()));
    }

    // Lấy thông tin booking tạm thời
    public function getTempBooking()
    {
        $data = Session::get('temp_booking', []);

        return response()->json([
            'status' => true,
            'message' => 'Thông tin đặt lịch tạm thời',
            'data' => $data
        ]);
    }


   // Lưu booking vào database
   public function confirmBooking(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'guest_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,other',
            'birthday' => 'required|date',
            'guest_phone' => 'required|string|max:20',
            'guest_email' => 'required|email',
            'address' => 'required|array',
            'notes' => 'nullable|string'
        ]);

        // Kiểm tra dữ liệu booking tạm thời
        $tempBooking = Session::get('temp_booking');

        if (!$tempBooking) {
            return response()->json([
                'status' => false,
                'message' => 'Không có dữ liệu booking tạm thời'
            ], 400);
        }

        // Add logging to debug


        // Kiểm tra khách đã tồn tại chưa
        $guest = Guest::where('guest_phone', $request->guest_phone)
                      ->orWhere('guest_email', $request->guest_email)
                      ->first();

        if (!$guest) {
            // Tạo mới guest nếu chưa có
            $guest = Guest::create([
                'user_id' => $request->user_id ?? null, // Nếu có user_id (nếu user đã đăng nhập)
                'guest_name' => $request->guest_name,
                'gender' => $request->gender,
                'birthday' => $request->birthday,
                'guest_phone' => $request->guest_phone,
                'guest_email' => $request->guest_email,
                'address' => json_encode($request->address),
                'file' => $request->file ?? null
            ]);
        }

        // Tạo booking với thông tin khách
        $booking = Booking::create([
            'doctor_id' => $tempBooking['doctor_id'],
            'service_id' => $tempBooking['service_id'],
            'guest_id' => $guest->id, // Liên kết với guest
            'booking_date' => $tempBooking['date'],
            'booking_time' => $tempBooking['time'],
            'notes' => $request->notes ?? null,
            'status' => 'pending'
        ]);

        // Xóa session sau khi lưu thành công
        Session::forget('temp_booking');

        return response()->json([
            'status' => true,
            'message' => 'Đặt lịch thành công',
            'data' => [
                'booking' => $booking,
                'guest' => $guest
            ]
        ]);
    }
}
