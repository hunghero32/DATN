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
use App\Services\NotificationService;
use Carbon\Carbon;

class BookingController extends Controller
{
    private $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
        $this->middleware('auth:sanctum'); // Add sanctum authentication
        $this->middleware('web');
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
                'message' => 'Không tìm thấy thông tin đặt lịch tạm thời'
            ], 422);
        }

        // Get authenticated user ID
        $userId = $request->user()->id;

        // Only check for duplicate name
        $existingGuest = Guest::where('user_id', $userId)
            ->where('guest_name', $request->guest_name)
            ->first();

        if ($existingGuest) {
            return response()->json([
                'status' => false,
                'message' => 'Tên khách hàng đã tồn tại trong tài khoản của bạn'
            ], 422);
        }

        // Create new guest without checking phone/email
        $guest = Guest::create([
            'user_id' => $userId,
            'guest_name' => $request->guest_name,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
            'guest_phone' => $request->guest_phone,
            'guest_email' => $request->guest_email,
            'address' => json_encode($request->address),
            'file' => $request->file ?? null
        ]);

        $booking = Booking::create([
            'doctor_id' => $tempBooking['doctor_id'],
            'service_id' => $tempBooking['service_id'],
            'guest_id' => $guest->id,
            'booking_date' => $tempBooking['date'],
            'booking_time' => $tempBooking['time'],
            'notes' => $request->notes ?? null,
            'status' => 'pending'
        ]);

        // Send notification
        $this->sendBookingNotification($booking);

        // Clear all related booking sessions
        Session::forget(['temp_booking', 'last_booking_guest']);

        return response()->json([
            'status' => true,
            'message' => 'Đặt lịch thành công',
            'data' => [
                'booking' => $booking,
                'guest' => $guest
            ]
        ]);
    }

    public function appointments()
    {
        try {
            // Get authenticated user's ID
            $userId = auth()->id();

            // Get all bookings for guests associated with this user
            $bookings = Booking::with(['doctor', 'service', 'guest'])
                ->whereHas('guest', function($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($booking) {
                    return [
                        'id' => $booking->id,
                        'doctor_name' => $booking->doctor->doctor_name,
                        'doctor_avatar' => $booking->doctor->doctor_avatar,
                        'service_name' => $booking->service->services_name,
                        'guest_name' => $booking->guest->guest_name,
                        'guest_phone' => $booking->guest->guest_phone,
                        'booking_date' => $booking->booking_date,
                        'booking_time' => $booking->booking_time,
                        'status' => $booking->status,
                        'notes' => $booking->notes,
                        'created_at' => $booking->created_at
                    ];
                });

            if ($bookings->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy thông tin đặt lịch'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Danh sách lịch hẹn',
                'data' => $bookings
            ]);
        } catch (\Exception $e) {
            Log::error('Error in appointments: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi lấy danh sách lịch hẹn: ' . $e->getMessage()
            ], 500);
        }
    }
    private function sendBookingNotification(Booking $booking)
    {
        $doctor = Doctor::find($booking->doctor_id);
        $guest = Guest::find($booking->guest_id);

        if (!$guest || !$doctor) return;
        $bookingDate = Carbon::parse($booking->booking_date)->format('d/m/Y');
        $bookingTime = Carbon::parse($booking->booking_time)->format('H:i');
        // Gửi thông báo cho bác sĩ về lịch hẹn mới
        $this->notificationService->sendNotification(
            $doctor->user_id,
            "Lịch hẹn mới về {$booking->service->services_name}",
            "Bạn có một lịch hẹn mới về {$booking->service->services_name} từ bệnh nhân {$guest->guest_name} vào lúc {$bookingTime} ngày {$bookingDate}.",
            "booking",
            $booking->id
        );
        // Gửi thông báo cho khách hàng về lịch hẹn đã được ghi nhận
        $this->notificationService->sendNotification(
            $guest->user_id,
            "Xác nhận lịch hẹn {$booking->service->services_name}",
            "Lịch hẹn của bạn với bác sĩ {$doctor->doctor_name} về {$booking->service->services_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được tạo và đang chờ xử lý.",
            "booking",
            $booking->id
        );
    }
}