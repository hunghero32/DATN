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
            ->whereIn('status', ['completed'])
            ->count();
        // Tổng số lịch đã đang chờ
        $confirmedAppointments = Booking::where('doctor_id', $doctorId)
            ->whereIn('status', ['confirmed'])
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

        // Thống kê số lượng lịch theo ngày
        $appointmentsByDate = Booking::where('doctor_id', $doctorId)
            ->whereDate('booking_date', $today)
            ->whereIn('status', ['pending', 'confirmed'])
            ->with(['guest:id,guest_name', 'service:id,services_name'])
            ->get();

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
            'total_patients' => $totalPatients, // Tổng số khách đã khám
            'monthly_patients' => $monthlyPatients, // Số khách đã khám trong tháng này
            'total_appointments' => $totalAppointments, // Tổng số lịch đã nhận
            'today_appointments' => $appointmentsByDate, // Thống kê lịch hẹn theo ngày
            'completed_appointments' => $completedAppointments, // Tổng số lịch đã hoàn thành
            'confirmed_appointments' => $confirmedAppointments, // Tổng số lịch đã đang chờ
            'days_off' => $daysOff, // Tổng số ngày nghỉ trong tháng này
            'available_slots' => $availableSlots, // Số lượng lịch còn trống theo lịch làm việc của bác sĩ
            'appointments_by_status' => $appointmentsByStatus, // Thống kê số lượng lịch theo trạng thái
            'patients_by_month' => $patientsByMonth, // Thống kê số lượng khách theo từng tháng trong năm
            'appointments_by_day' => $appointmentsByDay, // Thống kê lịch hẹn theo từng ngày trong tháng hiện tại
            'patients_today' => $patientsToday, // Lấy danh sách khách đã khám hôm nay
            'upcoming_appointments' => $upcomingAppointments, // Lấy danh sách lịch hẹn sắp tới (chưa hoàn thành)
            'completed_appointments_list' => $completedAppointmentsList, // Lấy danh sách lịch đã hoàn thành
        ]);
    }
}
