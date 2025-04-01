<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Doctor;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Đếm tổng số lịch đặt khám
        $totalAppointments = DB::table('bookings')->count();

        // Đếm số lịch đặt khám sắp tới
        $upcomingAppointments = DB::table('bookings')
            ->where('booking_date', '>=', Carbon::today()->format('Y-m-d'))
            ->where('status', 'confirmed')
            ->count();

        // Đếm số lịch đặt khám đã hoàn thành
        $completedAppointments = DB::table('bookings')
            ->where('status', 'completed')
            ->count();

        // Đếm số lịch đặt khám đã hủy
        $cancelledAppointments = DB::table('bookings')
            ->where('status', 'cancelled')
            ->count();

        // Đếm tổng số bệnh nhân
        $totalPatients = DB::table('guests')->count();

        // Đếm số bệnh nhân mới trong tháng này
        $newPatientsThisMonth = DB::table('guests')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();

        // Đếm tổng số bác sĩ
        $totalDoctors = DB::table('doctors')->count();

        // Đếm tổng số chuyên khoa
        $totalDepartments = DB::table('specialties')->count();

        // Lấy số lịch đặt khám theo tháng trong năm hiện tại
        $appointmentsByMonth = DB::table('bookings')
            ->select(
                DB::raw('MONTH(booking_date) as month'),
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('booking_date', Carbon::now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();

        // Điền số 0 cho các tháng không có lịch đặt khám
        for ($i = 1; $i <= 12; $i++) {
            if (!isset($appointmentsByMonth[$i])) {
                $appointmentsByMonth[$i] = 0;
            }
        }
        ksort($appointmentsByMonth);

        // Lấy số lịch đặt khám theo chuyên khoa
        $appointmentsByDepartment = DB::table('bookings')
            ->select(
                'specialties.name as department',
                DB::raw('MONTH(bookings.booking_date) as month'),
                DB::raw('COUNT(*) as count')
            )
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->join('specialties', 'services.specialty_id', '=', 'specialties.id')
            ->whereYear('bookings.booking_date', Carbon::now()->year) // Chỉ lấy dữ liệu trong năm hiện tại (2025)
            ->where('bookings.status', 'completed') // Chỉ lấy các lịch hẹn đã hoàn thành
            ->groupBy('specialties.name', DB::raw('MONTH(bookings.booking_date)'))
            ->orderBy('month', 'asc') // Sắp xếp theo tháng
            ->orderBy('count', 'desc') // Sắp xếp theo số lượng lịch hẹn giảm dần
            ->get();

        // Transform data for easier use in chart
        $departmentsByMonth = [];
        foreach ($appointmentsByDepartment as $record) {
            if (!isset($departmentsByMonth[$record->department])) {
                $departmentsByMonth[$record->department] = array_fill(1, 12, 0);
            }
            $departmentsByMonth[$record->department][$record->month] = $record->count;
        }

        // Lấy các lịch đặt khám gần đây
        $recentAppointments = DB::table('bookings')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->select(
                'bookings.id',
                'bookings.booking_date as appointment_date',
                'bookings.booking_time as appointment_time',
                'bookings.status',
                'bookings.created_at',
                'guests.guest_name as patient_name',
                'doctors.doctor_name as doctor_name'
            )
            ->orderBy('bookings.created_at', 'desc')
            ->limit(5)
            ->get();

        // Lấy thống kê theo trạng thái
        $statusStats = [
            'pending' => DB::table('bookings')->where('status', 'pending')->count(),
            'confirmed' => DB::table('bookings')->where('status', 'confirmed')->count(),
            'completed' => DB::table('bookings')->where('status', 'completed')->count(),
            'cancelled' => DB::table('bookings')->where('status', 'cancelled')->count(),
        ];

        // Lấy top bác sĩ có nhiều lịch đặt khám nhất
        $topDoctors = DB::table('bookings')
            ->select(
                'doctors.id',
                'doctors.doctor_name',
                DB::raw('COUNT(bookings.id) as appointment_count')
            )
            ->join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->groupBy('doctors.id', 'doctors.doctor_name')
            ->orderBy('appointment_count', 'desc')
            ->limit(5)
            ->get();

        // Lấy bác sĩ có doanh thu cao nhất trong tháng
        $topRevenueDoctorsByMonth = DB::table('bookings')
            ->select(
                'doctors.id',
                'doctors.doctor_name',
                DB::raw('MONTH(bookings.booking_date) as month'),
                DB::raw('SUM(services.price) as total_revenue')
            )
            ->join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->whereYear('bookings.booking_date', Carbon::now()->year)
            ->where('bookings.status', 'completed')
            ->groupBy('doctors.id', 'doctors.doctor_name', DB::raw('MONTH(bookings.booking_date)'))
            ->orderBy('total_revenue', 'desc')
            ->get();

        return view('admin.pages.dashboard', compact(
            'totalAppointments',
            'upcomingAppointments',
            'completedAppointments',
            'cancelledAppointments',
            'totalPatients',
            'newPatientsThisMonth',
            'totalDoctors',
            'totalDepartments',
            'appointmentsByMonth',
            'appointmentsByDepartment',
            'departmentsByMonth', // Add this line
            'recentAppointments',
            'statusStats',
            'topDoctors',
            'topRevenueDoctorsByMonth'
        ));
    }
}
