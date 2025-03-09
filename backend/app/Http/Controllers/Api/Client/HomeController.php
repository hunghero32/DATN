<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Services;
use App\Models\Specialty;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Lấy chuyên khoa có liên kết với dịch vụ và bác sĩ, giới hạn 5 chuyên khoa
        $specialties = Specialty::take(4)->get();

        // Lấy 5 dịch vụ có số lượng đặt lịch nhiều nhất
        $popularServices = Services::withCount('bookings')
        ->where('isDeleted', 0)
        ->with('specialty')
        ->orderByDesc('bookings_count')
        ->take(4)
        ->get();
    
    // Nếu không có dịch vụ nào được đặt nhiều, lấy 4 dịch vụ bất kỳ
    if ($popularServices->isEmpty()) {
        $popularServices = Services::where('isDeleted', 0)->take(4)->get();
    }

        // Lấy danh sách tất cả bác sĩ
        $doctors = Doctor::with('specialty')
            ->where('approve', 1)
            ->where('isDeleted', 0)
            ->get();

        return response()->json([
            'specialties' => $specialties,
            'popular_services' => $popularServices,
            'doctors' => $doctors,
        ]);
    }
}
