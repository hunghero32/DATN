<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Booking;
use App\Models\Guest;
use Illuminate\Support\Facades\Log;
use App\Models\Doctor;
use App\Models\Specialty;
use App\Models\Service;
use App\Models\Schedule;
use App\Models\Services;

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

        // Store in session
        Session::put('temp_booking', $data);
        Session::save();

        // Get additional data for immediate response
        $doctor = Doctor::find($data['doctor_id']);
        $specialty = Specialty::find($data['specialty_id']);
        $service = Services::find($data['service_id']);
        $schedule = Schedule::find($data['schedule_id']);

        // Prepare response data
        $responseData = [
            'doctor_id' => $data['doctor_id'],
            'service_id' => $data['service_id'],
            'schedule_id' => $data['schedule_id'],
            'date' => $data['date'],
            'time' => $data['time'],
            'specialty_id' => $data['specialty_id'],
            'doctor_name' => $doctor ? $doctor->doctor_name : null,
            'doctor_avatar' => $doctor ? $doctor->doctor_avatar : null,
            'doctor_bio' => $doctor ? $doctor->doctor_bio : null,
            'doctor_exp' => $doctor ? $doctor->exp : null,
            'service_name' => $service ? $service->services_name : null,
            'specialty_name' => $specialty ? $specialty->name : null,
            'price' => $service ? $service->price : null,
            'duration' => $service ? $service->duration : null,
            'max_patients' => $schedule ? $schedule->max_patients : null,
            'time_start' => $schedule ? $schedule->time_start : null,
            'time_end' => $schedule ? $schedule->time_end : null,
            'booking_time' => $schedule ? "{$schedule->time_start} - {$schedule->time_end}" : null
        ];

        return response()->json([
            'status' => true,
            'message' => 'Lưu thông tin đặt lịch tạm thời thành công',
            'data' => $responseData
        ]);
    }

    public function getTempBooking()
    {
        try {
            $tempBooking = Session::get('temp_booking');

            if (!$tempBooking) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy thông tin đặt lịch tạm thời'
                ]);
            }

            // Get related data
            $doctor = Doctor::find($tempBooking['doctor_id']);
            $specialty = Specialty::find($tempBooking['specialty_id']);
            $service = Services::find($tempBooking['service_id']);
            $schedule = Schedule::find($tempBooking['schedule_id']);

            // Format response data to match localStorage structure
            $bookingData = [
                'doctor_id' => $tempBooking['doctor_id'],
                'service_id' => $tempBooking['service_id'],
                'schedule_id' => $tempBooking['schedule_id'],
                'date' => $tempBooking['date'],
                'time' => $tempBooking['time'],
                'specialty_id' => $tempBooking['specialty_id'],
                'doctor_name' => $doctor ? $doctor->doctor_name : null,
                'doctor_avatar' => $doctor ? $doctor->doctor_avatar : null,
                'doctor_bio' => $doctor ? $doctor->doctor_bio : null,
                'doctor_exp' => $doctor ? $doctor->exp : null,
                'service_name' => $service ? $service->services_name : null,
                'specialty_name' => $specialty ? $specialty->name : null,
                'price' => $service ? $service->price : null,
                'duration' => $service ? $service->duration : null,
                'max_patients' => $schedule ? $schedule->max_patients : null,
                'time_start' => $schedule ? $schedule->time_start : null,
                'time_end' => $schedule ? $schedule->time_end : null,
                'booking_time' => $schedule ? "{$schedule->time_start} - {$schedule->time_end}" : null
            ];

            return response()->json([
                'status' => true,
                'message' => 'Thông tin đặt lịch tạm thời',
                'data' => $bookingData
            ]);
        } catch (\Exception $e) {
            Log::error('Error in getTempBooking: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi lấy thông tin đặt lịch: ' . $e->getMessage()
            ], 500);
        }
    }

    public function confirmBooking(Request $request)
    {
        $validated = $request->validate([
            'guest_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,other',
            'birthday' => 'required|date',
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
