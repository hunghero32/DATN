<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Doctor;
use App\Services\NotificationService;
use Carbon\Carbon;

class BookingController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Lấy danh sách đặt lịch.
     */
    public function index(Request $request)
    {
        $bookings = Booking::with(['doctor', 'service', 'guest'])
            ->where('isDeleted', 0)
            ->whereHas('doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->searchGuest($request->search)
            ->filterGender($request->gender)
            ->filterAge($request->age)
            ->filterSpecialty($request->specialty)
            ->when(auth()->user()->role === 'doctor' && $request->status === 'pending', function ($query) {
                return $query->filterDoctorPending();
            })
            ->when(auth()->user()->role === 'doctor' && $request->status === 'confirmed', function ($query) {
                return $query->filterDoctorConfirmed();
            })
            ->when(auth()->user()->role === 'doctor' && $request->status === 'completed', function ($query) {
                return $query->filterDoctorCompleted();
            })
            ->when($request->boolean('available_for_result'), function ($query) {
                return $query->whereDoesntHave('result')
                    ->whereIn('status', ['confirmed', 'completed']);
            })
            ->orderBy('booking_date', 'asc')
            ->orderBy('booking_time', 'asc')
            ->get();

        if ($bookings->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy thông tin đặt lịch phù hợp.',
                'data' => []
            ], 200);
        }
        return response()->json($bookings, 200);
    }

    /**
     * Hiển thị chi tiết đặt lịch.
     */
    public function show($bookingId)
    {
        $booking = Booking::with(['doctor', 'service', 'guest'])
            ->where('isDeleted', 0)
            ->whereHas('doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->find($bookingId);

        if (!$booking) {
            return response()->json(['message' => 'Không tìm thấy lịch hẹn'], 404);
        }

        return response()->json($booking, 200);
    }

    /**
     * Cập nhật đặt lịch.
     */
    public function update(Request $request, Booking $booking)
    {
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền cập nhật lịch hẹn này.'], 403);
        }

        $doctorId = Doctor::where('user_id', auth()->id())->value('id');

        if (!$doctorId || $booking->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể cập nhật lịch hẹn của bác sĩ khác.'], 403);
        }

        $validate = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled'
        ]);

        if ($booking->status === 'completed') {
            return response()->json([
                'message' => 'Lịch hẹn đã hoàn thành và kết quả đã được tạo trước đó.'
            ], 400);
        }

        if ($validate['status'] === 'completed' && $booking->status !== 'confirmed') {
            return response()->json(['message' => 'Lịch hẹn phải được xác nhận trước khi hoàn thành.'], 400);
        }

        if ($validate['status'] === 'confirmed') {
            $this->createMedicalRecord($booking);
        }

        if ($validate['status'] === 'completed') {
            $bookingDateTime = Carbon::parse($booking->booking_date . ' ' . $booking->booking_time);

            if (now()->lt($bookingDateTime)) {
                return response()->json(['message' => 'Bạn chỉ có thể hoàn thành lịch hẹn sau thời gian đã đặt.'], 400);
            }

            $this->createResultForBooking($booking);
        }

        $booking->update(['status' => $validate['status']]);
        $this->sendBookingNotification($booking, $validate['status']);
        $updatedBooking = Booking::with('doctor', 'service', 'guest')->find($booking->id);

        return response()->json([
            'booking' => $updatedBooking,
            'message' => 'Cập nhật trạng thái lịch hẹn thành công.'
        ], 200);
    }

    private function createResultForBooking(Booking $booking)
    {
        if ($booking->result()->exists()) {
            return;
        }

        $booking->result()->create([
            'doctor_id' => $booking->doctor_id,
            'guest_id' => $booking->guest_id,
            'booking_id' => $booking->id,
        ]);
    }

    private function createMedicalRecord(Booking $booking)
    {
        if ($booking->guest->medicalRecord()->exists()) {
            return;
        }

        $booking->guest->medicalRecord()->create([
            'guest_id'           => $booking->guest_id,
            'BHYT'               => null,
            'medical_condition'  => null,
            'medications'        => null,
            'allergies'          => null,
            'family_history'     => null,
            'treatment'          => null,
            'note'               => null,
        ]);
    }

    private function sendBookingNotification(Booking $booking, $status)
    {
        $statusMap = [
            'pending' => 'Chờ xác nhận',
            'confirmed' => 'Đã xác nhận',
            'completed' => 'Đã hoàn thành',
            'cancelled' => 'Đã hủy',
        ];

        $statusVi = $statusMap[$status] ?? 'Không xác định';
        $bookingDate = Carbon::parse($booking->booking_date)->format('d/m/Y');
        $bookingTime = Carbon::parse($booking->booking_time)->format('H:i');
        $title = "Cập nhật trạng thái lịch khám về {$booking->service->services_name}";
        $content = "Lịch khám #{$booking->id} về {$booking->service->services_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được cập nhật trạng thái: {$statusVi}";

        $doctorId = $booking->doctor->user_id ?? null;
        $guestId = $booking->guest->user_id ?? null;

        $recipientIds = array_unique(array_filter(array_merge([$doctorId, $guestId])));

        foreach ($recipientIds as $userId) {
            $this->notificationService->sendNotification(
                $userId,
                $title,
                $content,
                "booking",
                $booking->id
            );
        }

        if ($status === 'completed' && $guestId) {
            $this->notificationService->sendNotification(
                $guestId,
                "Kết quả khám sắp có",
                "Kết quả khám của bạn về {$booking->service->services_name} vào lúc {$bookingTime} ngày {$bookingDate} sắp có, chờ xíu nhé!",
                "result",
                $booking->id
            );
        }
    }
}