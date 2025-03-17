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
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $today = Carbon::now()->toDateString();

        // Tổng số khách đã khám (đã hoàn thành)
        $totalPatients = Booking::where('doctor_id', $doctorId)
            ->where('status', 'completed')
            ->count();

        // Số khách đã khám trong tháng này
        $monthlyPatients = Booking::where('doctor_id', $doctorId)
            ->where('status', 'completed')
            ->whereMonth('booking_date', $currentMonth)
            ->whereYear('booking_date', $currentYear)
            ->count();

        // Tổng số lịch đã nhận
        $totalAppointments = Booking::where('doctor_id', $doctorId)->count();

        // Tổng số lịch đã hoàn thành
        $completedAppointments = Booking::where('doctor_id', $doctorId)
            ->whereIn('status', ['completed', 'confirmed'])
            ->count();

        // Tổng số ngày nghỉ trong tháng này (lịch làm việc có status = 'off')
        $daysOff = Schedule::where('doctor_id', $doctorId)
            ->where('status', 'off')
            ->whereMonth('working_date', $currentMonth)
            ->whereYear('working_date', $currentYear)
            ->count();

        // Số lượng lịch còn trống theo lịch làm việc của bác sĩ
        $availableSlots = Schedule::where('doctor_id', $doctorId)
            ->where('status', 'available')
            ->where('working_date', '>=', $today)
            ->count();

        // Thống kê số lượng lịch theo trạng thái
        $appointmentsByStatus = Booking::where('doctor_id', $doctorId)
            ->selectRaw("status, COUNT(*) as count")
            ->groupBy('status')
            ->pluck('count', 'status');

        // Thống kê số lượng khách theo từng tháng trong năm
        $patientsByMonth = Booking::where('doctor_id', $doctorId)
            ->where('status', 'completed')
            ->whereYear('booking_date', $currentYear)
            ->selectRaw("MONTH(booking_date) as month, COUNT(*) as count")
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        // Thống kê lịch hẹn theo từng ngày trong tháng hiện tại
        $appointmentsByDay = Booking::where('doctor_id', $doctorId)
        ->whereMonth('booking_date', $currentMonth)
        ->whereYear('booking_date', $currentYear)
        ->with(['guest:id,guest_name', 'service:id,services_name'])
        ->orderBy('booking_date')
        ->get()
        ->groupBy(function ($booking) {
            return Carbon::parse($booking->booking_date)->format('d'); // Nhóm theo ngày
        });

        // Lấy danh sách khách đã khám hôm nay
        $patientsToday = Booking::where('doctor_id', $doctorId)
            ->where('status', 'completed')
            ->whereDate('booking_date', $today)
            ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
            ->get();

        // Lấy danh sách lịch hẹn sắp tới (chưa hoàn thành)
        $upcomingAppointments = Booking::where('doctor_id', $doctorId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->whereDate('booking_date', '>=', $today)
            ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
            ->orderBy('booking_date')
            ->get();

        // Lấy danh sách lịch đã hoàn thành
        $completedAppointmentsList = Booking::where('doctor_id', $doctorId)
            ->where('status', 'completed')
            ->with(['guest:id,guest_name,guest_phone,guest_email', 'service:id,services_name'])
            ->orderBy('booking_date', 'desc')
            ->get();

        return response()->json([
            'total_patients' => $totalPatients,
            'monthly_patients' => $monthlyPatients,
            'total_appointments' => $totalAppointments,
            'completed_appointments' => $completedAppointments,
            'days_off' => $daysOff,
            'available_slots' => $availableSlots,
            'appointments_by_status' => $appointmentsByStatus,
            'patients_by_month' => $patientsByMonth,
            'appointments_by_day' => $appointmentsByDay,
            'patients_today' => $patientsToday,
            'upcoming_appointments' => $upcomingAppointments,
            'completed_appointments_list' => $completedAppointmentsList,
        ]);
    }
}
