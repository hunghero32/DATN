<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Get filter parameters from request
        $filterType = $request->input('filter_type', 'year'); // Default to year
        $customStartDate = $request->input('start_date');
        $customEndDate = $request->input('end_date');

        // Determine date range based on filter type
        $startDate = Carbon::today();
        $endDate = Carbon::today();

        if ($filterType === 'day') {
            $startDate = Carbon::today()->startOfDay();
            $endDate = Carbon::today()->endOfDay();
        } elseif ($filterType === 'week') {
            $startDate = Carbon::today()->startOfWeek();
            $endDate = Carbon::today()->endOfWeek();
        } elseif ($filterType === 'month') {
            $startDate = Carbon::today()->startOfMonth();
            $endDate = Carbon::today()->endOfMonth();
        } elseif ($filterType === 'year') {
            $startDate = Carbon::today()->startOfYear();
            $endDate = Carbon::today()->endOfYear();
        } elseif ($filterType === 'custom' && $customStartDate && $customEndDate) {
            $startDate = Carbon::parse($customStartDate)->startOfDay();
            $endDate = Carbon::parse($customEndDate)->endOfDay();
        }

        // Đếm tổng số lịch đặt khám
        $totalAppointments = DB::table('bookings')
            ->whereBetween('booking_date', [$startDate, $endDate])
            ->count();

        // Đếm số lịch đặt khám sắp tới
        $upcomingAppointments = DB::table('bookings')
            ->where('booking_date', '>=', Carbon::today()->format('Y-m-d'))
            ->where('status', 'confirmed')
            ->count();

        // Đếm số lịch đặt khám đã hoàn thành
        $completedAppointments = DB::table('bookings')
            ->where('status', 'completed')
            ->whereBetween('booking_date', [$startDate, $endDate])
            ->count();

        // Đếm số lịch đặt khám đã hủy
        $cancelledAppointments = DB::table('bookings')
            ->where('status', 'canceled')
            ->whereBetween('booking_date', [$startDate, $endDate])
            ->count();

        // Đếm tổng số bệnh nhân
        $totalPatients = DB::table('guests')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        // Đếm số bệnh nhân mới
        $newPatients = DB::table('guests')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        // Đếm tổng số bác sĩ
        $totalDoctors = DB::table('doctors')->count();

        // Đếm tổng số chuyên khoa
        $totalDepartments = DB::table('specialties')->count();

        // Lấy số lịch đặt khám theo khoảng thời gian
        $appointmentsByPeriod = [];
        if ($filterType === 'day') {
            // Group by hour
            $appointmentsByPeriod = DB::table('bookings')
                ->select(
                    DB::raw('HOUR(booking_time) as period'),
                    DB::raw('COUNT(*) as count')
                )
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->groupBy('period')
                ->orderBy('period')
                ->get()
                ->pluck('count', 'period')
                ->toArray();

            for ($i = 0; $i <= 23; $i++) {
                if (!isset($appointmentsByPeriod[$i])) {
                    $appointmentsByPeriod[$i] = 0;
                }
            }
            ksort($appointmentsByPeriod);
        } elseif ($filterType === 'week') {
            // Group by day of week
            $appointmentsByPeriod = DB::table('bookings')
                ->select(
                    DB::raw('DAYOFWEEK(booking_date) as period'),
                    DB::raw('COUNT(*) as count')
                )
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->groupBy('period')
                ->orderBy('period')
                ->get()
                ->pluck('count', 'period')
                ->toArray();

            for ($i = 1; $i <= 7; $i++) {
                if (!isset($appointmentsByPeriod[$i])) {
                    $appointmentsByPeriod[$i] = 0;
                }
            }
            ksort($appointmentsByPeriod);
        } elseif ($filterType === 'month') {
            // Group by day of month
            $appointmentsByPeriod = DB::table('bookings')
                ->select(
                    DB::raw('DAY(booking_date) as period'),
                    DB::raw('COUNT(*) as count')
                )
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->groupBy('period')
                ->orderBy('period')
                ->get()
                ->pluck('count', 'period')
                ->toArray();

            $daysInMonth = $startDate->daysInMonth;
            for ($i = 1; $i <= $daysInMonth; $i++) {
                if (!isset($appointmentsByPeriod[$i])) {
                    $appointmentsByPeriod[$i] = 0;
                }
            }
            ksort($appointmentsByPeriod);
        } else {
            // Group by month for year or custom
            $appointmentsByPeriod = DB::table('bookings')
                ->select(
                    DB::raw('MONTH(booking_date) as period'),
                    DB::raw('COUNT(*) as count')
                )
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->groupBy('period')
                ->orderBy('period')
                ->get()
                ->pluck('count', 'period')
                ->toArray();

            for ($i = 1; $i <= 12; $i++) {
                if (!isset($appointmentsByPeriod[$i])) {
                    $appointmentsByPeriod[$i] = 0;
                }
            }
            ksort($appointmentsByPeriod);
        }

        // Lấy số lịch đặt khám theo chuyên khoa
        $appointmentsByDepartment = DB::table('bookings')
            ->select(
                'specialties.name as department',
                DB::raw('COUNT(*) as count')
            )
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->join('specialties', 'services.specialty_id', '=', 'specialties.id')
            ->whereBetween('bookings.booking_date', [$startDate, $endDate])
            ->where('bookings.status', 'completed')
            ->groupBy('specialties.name')
            ->orderBy('count', 'desc')
            ->get();

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
            ->whereBetween('bookings.booking_date', [$startDate, $endDate])
            ->orderBy('bookings.created_at', 'desc')
            ->limit(5)
            ->get();

        // Lấy thống kê theo trạng thái
        $statusStats = [
            'pending' => DB::table('bookings')
                ->where('status', 'pending')
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->count(),
            'confirmed' => DB::table('bookings')
                ->where('status', 'confirmed')
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->count(),
            'completed' => DB::table('bookings')
                ->where('status', 'completed')
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->count(),
            'canceled' => DB::table('bookings')
                ->where('status', 'canceled')
                ->whereBetween('booking_date', [$startDate, $endDate])
                ->count(),
        ];

        // Lấy top bác sĩ có nhiều lịch đặt khám nhất
        $topDoctors = DB::table('bookings')
            ->select(
                'doctors.id',
                'doctors.doctor_name',
                DB::raw('COUNT(bookings.id) as appointment_count')
            )
            ->join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->whereBetween('bookings.booking_date', [$startDate, $endDate])
            ->groupBy('doctors.id', 'doctors.doctor_name')
            ->orderBy('appointment_count', 'desc')
            ->limit(5)
            ->get();

        // Lấy bác sĩ có doanh thu cao nhất
        $topRevenueDoctors = DB::table('bookings')
            ->select(
                'doctors.id',
                'doctors.doctor_name',
                DB::raw('SUM(services.price) as total_revenue')
            )
            ->join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->whereBetween('bookings.booking_date', [$startDate, $endDate])
            ->where('bookings.status', 'completed')
            ->groupBy('doctors.id', 'doctors.doctor_name')
            ->orderBy('total_revenue', 'desc')
            ->limit(5)
            ->get();

        return view('admin.pages.dashboard', compact(
            'totalAppointments',
            'upcomingAppointments',
            'completedAppointments',
            'cancelledAppointments',
            'totalPatients',
            'newPatients',
            'totalDoctors',
            'totalDepartments',
            'appointmentsByPeriod',
            'appointmentsByDepartment',
            'recentAppointments',
            'statusStats',
            'topDoctors',
            'topRevenueDoctors',
            'filterType',
            'customStartDate',
            'customEndDate'
        ));
    }
}
