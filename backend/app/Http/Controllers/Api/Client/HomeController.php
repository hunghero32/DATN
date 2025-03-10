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
            ->where('status', 'completed')
            ->where('isDeleted', 0)
            ->has('bookings')
            ->with('specialty')
            ->orderByDesc('bookings_count')
            ->take(4)
            ->get();

        // If no popular services found, get random services
        if ($popularServices->isEmpty()) {
            $popularServices = Services::where('status', 'completed')
                ->where('isDeleted', 0)
                ->with('specialty')
                ->inRandomOrder()
                ->take(4)
                ->get();
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
