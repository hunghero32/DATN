<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Booking;
use App\Models\Guest;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:client_api'); // Yêu cầu đăng nhập qua API
        $this->middleware('web'); // Đã thêm trước đó cho session
    }
    public function tempBooking(Request $request)
    {
        $data = $request->validate([
            'specialty_id' => 'required',
            'doctor_id' => 'required',
            'schedule_id' => 'required',
            'date' => 'required|date',
            'service_id' => 'required',
            'time' => 'required'
        ]);

        Session::put('temp_booking', $data);
        Session::save();

        // Debug
        Log::info('Temp booking saved: ' . json_encode(Session::get('temp_booking')));

        return response()->json([
            'status' => true,
            'message' => 'Lưu thông tin đặt lịch tạm thời thành công',
            'data' => $data
        ]);
    }

    public function getTempBooking()
    {
        // Debug
        Log::info('Session in getTempBooking: ' . json_encode(Session::all()));

        $data = Session::get('temp_booking', []);

        return response()->json([
            'status' => true,
            'message' => 'Thông tin đặt lịch tạm thời',
            'data' => $data
        ]);
    }

    public function confirmBooking(Request $request)
    {
        $validated = $request->validate([
            'guest_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,other',
            'birthday' => 'required|date_format:Y-m-d', 
            'guest_phone' => 'required|string|max:20',
            'guest_email' => 'required|email',
            'address' => 'required|array',
            'notes' => 'nullable|string'
        ]);

        $tempBooking = Session::get('temp_booking');
        if (!$tempBooking) {
            return response()->json([
                'status' => false,
                'message' => 'Không có dữ liệu booking tạm thời'
            ], 400);
        }

        $guest = Guest::where('guest_phone', $request->guest_phone)
            ->orWhere('guest_email', $request->guest_email)
            ->first();

        if (!$guest) {
            $guest = Guest::create([
                'user_id' => $request->user_id ?? 2, // user_id có thể là NULL
                'guest_name' => $request->guest_name,
                'gender' => $request->gender,
                'birthday' => $request->birthday,
                'guest_phone' => $request->guest_phone,
                'guest_email' => $request->guest_email,
                'address' => json_encode($request->address),
                'file' => $request->file ?? null
            ]);
        }

        $booking = Booking::create([
            'doctor_id' => $tempBooking['doctor_id'],
            'service_id' => $tempBooking['service_id'],
            'guest_id' => $guest->id,
            'booking_date' => $tempBooking['date'],
            'booking_time' => $tempBooking['time'],
            'notes' => $request->notes ?? null,
            'status' => 'pending'
        ]);

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
