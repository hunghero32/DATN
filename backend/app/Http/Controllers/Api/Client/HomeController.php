<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Services;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        // Lấy chuyên khoa có liên kết với dịch vụ và bác sĩ, giới hạn 5 chuyên khoa
        $specialties = Specialty::with('services', 'doctors')->limit(5)->get();

        // Lấy 5 dịch vụ có số lượng đặt lịch nhiều nhất
        $popularServices = Booking::select('service_id', DB::raw('COUNT(*) as total_bookings'))
            ->groupBy('service_id')
            ->orderByDesc('total_bookings')
            ->limit(5)
            ->with('service') // Lấy thêm thông tin chi tiết về dịch vụ
            ->get();

        // Lấy danh sách tất cả bác sĩ
        $doctors = Doctor::all();

        return response()->json([
            'specialties' => $specialties,
            'popular_services' => $popularServices,
            'doctors' => $doctors,
        ]);
    }
}
