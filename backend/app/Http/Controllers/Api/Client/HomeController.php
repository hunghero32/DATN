<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Services;
use App\Models\Specialty;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $specialties = Specialty::with('services', 'doctors')->get();
        // Lấy chuyên khoa được đặt nhiều nhất (dựa trên số lượng bookings)
        $popularSpecialties = Specialty::withCount('bookings')
            ->orderBy('bookings_count', 'desc')
            ->limit(5)
            ->get();
        // Lấy danh sách bác sĩ
        $doctors = Doctor::all();
        return response()->json([
            'specialties' => $specialties,
            'popular_specialties' => $popularSpecialties,
            'doctors' => $doctors,
        ]);
    }
}
