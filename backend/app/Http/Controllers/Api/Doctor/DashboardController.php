<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Schedule;
use App\Models\Guest;
use App\Models\Doctor;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $doctorId = Doctor::where('user_id', auth()->id())->value('id');
            if (!$doctorId) {
                return response()->json(['error' => 'Doctor not found'], 404);
            }

            $currentMonth = Carbon::now()->month; // Current month (e.g., 5 for May)
            $currentYear = Carbon::now()->year;   // Current year (e.g., 2025)
            $today = Carbon::now()->toDateString(); // Current date (e.g., 2025-05-14)

            // Tổng số khách đã khám (đã hoàn thành) - Distinct guests to avoid counting same guest multiple times
            $totalPatients = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->distinct('guest_id')
                ->count('guest_id');

            // Số khách đã khám trong tháng này
            $monthlyPatients = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->whereMonth('booking_date', $currentMonth)
                ->whereYear('booking_date', $currentYear)
                ->distinct('guest_id')
                ->count('guest_id');

            // Tổng số lịch đã nhận
            $totalAppointments = Booking::where('doctor_id', $doctorId)->count();

            // Tổng số lịch đã hoàn thành
            $completedAppointments = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->count();

            // Tổng số lịch đang chờ (pending + confirmed)
            $pendingAppointments = Booking::where('doctor_id', $doctorId)
                ->where('status', 'pending')
                ->count();

            $confirmedAppointments = Booking::where('doctor_id', $doctorId)
                ->where('status', 'confirmed')
                ->count();

            $totalPendingAndConfirmed = $pendingAppointments + $confirmedAppointments;

            // Tổng số ngày nghỉ trong tháng này
            $daysOff = Schedule::where('doctor_id', $doctorId)
                ->where('status', 'off')
                ->whereMonth('working_date', $currentMonth)
                ->whereYear('working_date', $currentYear)
                ->count();

            // Số lượng lịch còn trống từ hôm nay đến cuối tháng
            $availableSlots = Schedule::where('doctor_id', $doctorId)
                ->where('status', 'available')
                ->where('working_date', '>=', $today)
                ->whereMonth('working_date', $currentMonth)
                ->whereYear('working_date', $currentYear)
                ->count();

            // Thống kê số lượng lịch theo trạng thái
            $appointmentsByStatus = Booking::where('doctor_id', $doctorId)
                ->selectRaw("status, COUNT(*) as count")
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray();

            // Thống kê số lượng lịch theo ngày (pending, confirmed) - Lấy danh sách hôm nay
            $appointmentsByDate = Booking::where('doctor_id', $doctorId)
                ->whereDate('booking_date', $today)
                ->whereIn('status', ['pending', 'confirmed'])
                ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
                ->get();

            $todayAppointmentsCount = $appointmentsByDate->count();

            // Thống kê số lượng khách theo từng tháng trong năm
            $patientsByMonth = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->whereYear('booking_date', $currentYear)
                ->selectRaw("MONTH(booking_date) as month, COUNT(DISTINCT guest_id) as count")
                ->groupBy('month')
                ->orderBy('month')
                ->pluck('count', 'month')
                ->toArray();

            // Thống kê lịch hẹn theo từng ngày trong tháng hiện tại
            $appointmentsByDay = Booking::where('doctor_id', $doctorId)
                ->whereMonth('booking_date', $currentMonth)
                ->whereYear('booking_date', $currentYear)
                ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
                ->orderBy('booking_date')
                ->get()
                ->groupBy(function ($booking) {
                    return Carbon::parse($booking->booking_date)->format('Y-m-d'); // Nhóm theo ngày đầy đủ
                })
                ->map(function ($group) {
                    return [
                        'total' => $group->count(),
                        'appointments' => $group->map(function ($booking) {
                            return [
                                'id' => $booking->id,
                                'booking_date' => $booking->booking_date,
                                'booking_time' => $booking->booking_time,
                                'status' => $booking->status,
                                'guest' => $booking->guest,
                                'service' => $booking->service,
                            ];
                        })->toArray(),
                    ];
                })
                ->toArray();

            // Lấy danh sách khách đã khám hôm nay
            $patientsToday = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->whereDate('booking_date', $today)
                ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
                ->get();

            // Lấy danh sách lịch hẹn sắp tới (pending, confirmed, examining)
            $upcomingAppointments = Booking::where('doctor_id', $doctorId)
                ->whereIn('status', ['pending', 'confirmed', 'examining'])
                ->where('booking_date', '>=', $today)
                ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
                ->orderBy('booking_date')
                ->orderBy('booking_time')
                ->take(10) // Limit to 10 for performance
                ->get();

            // Lấy danh sách lịch đã hoàn thành (giới hạn 10 bản ghi gần nhất)
            $completedAppointmentsList = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
                ->orderBy('booking_date', 'desc')
                ->orderBy('booking_time', 'desc')
                ->take(10)
                ->get();

            // Tính doanh thu tháng này
            $monthlyEarnings = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->whereMonth('booking_date', $currentMonth)
                ->whereYear('booking_date', $currentYear)
                ->sum('service_price');

            // Tính tổng doanh thu
            $totalEarnings = Booking::where('doctor_id', $doctorId)
                ->where('status', 'completed')
                ->sum('service_price');

            return response()->json([
                'success' => true,
                'data' => [
                    'total_patients' => $totalPatients,
                    'monthly_patients' => $monthlyPatients,
                    'total_appointments' => $totalAppointments,
                    'today_appointments_count' => $todayAppointmentsCount,
                    'completed_appointments' => $completedAppointments,
                    'pending_appointments' => $pendingAppointments,
                    'confirmed_appointments' => $confirmedAppointments,
                    'total_pending_and_confirmed' => $totalPendingAndConfirmed,
                    'days_off' => $daysOff,
                    'available_slots' => $availableSlots,
                    'appointments_by_status' => $appointmentsByStatus,
                    'patients_by_month' => $patientsByMonth,
                    'appointments_by_day' => $appointmentsByDay,
                    'patients_today' => $patientsToday,
                    'upcoming_appointments' => $upcomingAppointments,
                    'completed_appointments_list' => $completedAppointmentsList,
                    'monthly_earnings' => (float)$monthlyEarnings,
                    'total_earnings' => (float)$totalEarnings,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'An error occurred while fetching dashboard data',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}