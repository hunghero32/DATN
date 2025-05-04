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
            'guest_email' => 'nullable|email',
            'address' => 'nullable|max:255',
            'notes' => 'nullable|string'
        ]);

        // Get authenticated user ID
        $userId = $request->user()->id;

        // Check for cancellation limit
        $yesterday = now()->subDay()->startOfDay();
        $today = now()->startOfDay();

        $cancelledBookingsToday = Booking::whereHas('guest', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('status', 'canceled')
            ->whereBetween('updated_at', [$today, now()])
            ->count();

        if ($cancelledBookingsToday >= 2) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn đã hủy lịch 2 lần trong ngày hôm nay. Vui lòng đợi 24 giờ để đặt lịch lại.'
            ], 422);
        }

        // Check weekly booking limit
        $startOfWeek = now()->startOfWeek();
        $endOfWeek = now()->endOfWeek();

        $weeklyBookingsCount = Booking::whereHas('guest', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->whereBetween('booking_date', [$startOfWeek, $endOfWeek])
            ->where('status', '!=', 'cancelled')
            ->count();

        if ($weeklyBookingsCount >= 5) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn đã đạt giới hạn đặt lịch trong tuần này (tối đa 5 lần/tuần)'
            ], 422);
        }

        $tempBooking = Session::get('temp_booking');
        if (!$tempBooking) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin đặt lịch tạm thời'
            ], 422);
        }

        // Check for existing booking with same service, date and time
        $existingTimeBooking = Booking::where('service_id', $tempBooking['service_id'])
            ->where('booking_date', $tempBooking['date'])
            ->where('booking_time', $tempBooking['time'])
            ->where('status', '!=', 'cancelled')
            ->first();

        if ($existingTimeBooking) {
            return response()->json([
                'status' => false,
                'message' => 'Đã có người đặt lịch dịch vụ này vào thời gian này'
            ], 422);
        }

        // Get authenticated user ID
        $userId = $request->user()->id;

        // Check for existing guest with same name and service
        $existingGuest = Guest::where('user_id', $userId)
            ->where('guest_name', $request->guest_name)
            ->first();

        if ($existingGuest) {
            // Check if there's an existing booking with the same service
            $existingBooking = Booking::where('guest_id', $existingGuest->id)
                ->where('service_id', $tempBooking['service_id'])
                ->where('status', '!=', 'completed')
                ->first();

            if ($existingBooking) {
                return response()->json([
                    'status' => false,
                    'message' => 'Khách hàng này đã đặt lịch hẹn cho dịch vụ này'
                ], 422);
            }
        }

        // Create new guest
        $guest = Guest::create([
            'user_id' => $userId,
            'guest_name' => $request->guest_name,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
            'guest_phone' => $request->guest_phone,
            'guest_email' => $request->guest_email,
            'address' => $request->address,
            'file' => $request->file ?? null
        ]);

        // Fetch doctor and service details
        $doctor = Doctor::find($tempBooking['doctor_id']);
        $service = Services::find($tempBooking['service_id']);

        // Create new booking with additional fields
        $booking = Booking::create([
            'doctor_id' => $tempBooking['doctor_id'],
            'service_id' => $tempBooking['service_id'],
            'guest_id' => $guest->id,
            'booking_date' => $tempBooking['date'],
            'booking_time' => $tempBooking['time'],
            'notes' => $request->notes ?? null,
            'status' => 'pending',
            'doctor_name' => $doctor ? $doctor->doctor_name : null,
            'service_name' => $service ? $service->services_name : null,
            'service_price' => $service ? $service->price : null
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
                ->whereHas('guest', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($booking) {
                    return [
                        'id' => $booking->id,
                        'doctor_id' => $booking->doctor_id,
                        'doctor_name' => $booking->doctor_name ?? optional($booking->doctor)->doctor_name ?? 'Không có bác sĩ',
                        'doctor_avatar' => $booking->doctor->doctor_avatar,
                        'service_id' => $booking->service_id,
                        'service_name' => $booking->services_name ?? optional($booking->service)->services_name ?? 'Không có dịch vụ',
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

    public function cancelBooking(Request $request, $id)
    {
        try {
            // Get authenticated user's ID
            $userId = auth()->id();

            // Find the booking
            $booking = Booking::with('guest')->findOrFail($id);

            // Check if the booking belongs to the authenticated user
            if ($booking->guest->user_id != $userId) {
                return response()->json([
                    'status' => false,
                    'message' => 'Bạn không có quyền hủy lịch hẹn này'
                ], 403);
            }

            // Check if booking is already completed or cancelled
            if ($booking->status == 'completed') {
                return response()->json([
                    'status' => false,
                    'message' => 'Không thể hủy lịch hẹn đã hoàn thành'
                ], 422);
            }

            if ($booking->status == 'canceled') {
                return response()->json([
                    'status' => false,
                    'message' => 'Lịch hẹn này đã được hủy trước đó'
                ], 422);
            }

            // Check if booking date is in the past
            $bookingDate = Carbon::parse($booking->booking_date . ' ' . $booking->booking_time);
            if ($bookingDate->isPast()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không thể hủy lịch hẹn đã qua'
                ], 422);
            }

            // Check if cancellation is within 24 hours of appointment
            // $cancellationDeadline = $bookingDate->subHours(24);
            // if (now()->isAfter($cancellationDeadline)) {
            //     return response()->json([
            //         'status' => false,
            //         'message' => 'Không thể hủy lịch hẹn trong vòng 24 giờ trước thời gian hẹn'
            //     ], 422);
            // }

            // Update booking status
            $booking->status = 'canceled';
            // $booking->cancellation_reason = $request->reason ?? 'Hủy bởi khách hàng';
            $booking->save();

            // Send notification about cancellation
            $this->sendCancellationNotification($booking);

            return response()->json([
                'status' => true,
                'message' => 'Hủy lịch hẹn thành công',
                'data' => $booking
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy lịch hẹn'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error in cancelBooking: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi hủy lịch hẹn: ' . $e->getMessage()
            ], 500);
        }
    }

    private function sendCancellationNotification(Booking $booking)
    {
        $doctor = Doctor::find($booking->doctor_id);
        $guest = Guest::find($booking->guest_id);

        if (!$guest || !$doctor) return;
        $bookingDate = Carbon::parse($booking->booking_date)->format('d/m/Y');
        $bookingTime = Carbon::parse($booking->booking_time)->format('H:i');

        // Gửi thông báo cho bác sĩ về việc hủy lịch hẹn
        $this->notificationService->sendNotification(
            $doctor->user_id,
            "Lịch hẹn đã bị hủy",
            "Lịch hẹn về {$booking->service_name} với bệnh nhân {$guest->guest_name} vào lúc {$bookingTime} ngày {$bookingDate} đã bị hủy. Lý do: {$booking->cancellation_reason}",
            "booking",
            $booking->id
        );

        // Gửi thông báo xác nhận cho khách hàng
        $this->notificationService->sendNotification(
            $guest->user_id,
            "Xác nhận hủy lịch hẹn",
            "Lịch hẹn của bạn với bác sĩ {$doctor->doctor_name} về {$booking->service_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được hủy thành công.",
            "booking",
            $booking->id
        );
    }
}
