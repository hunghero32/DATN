<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Post;
use App\Models\Services;
use App\Models\Specialty;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Lấy chuyên khoa có liên kết với dịch vụ và bác sĩ
        $specialties = Specialty::get();

        // Lấy dịch vụ có số lượng đặt lịch nhiều nhất
        $popularServices = Services::withCount('bookings')
            ->where('status', 'completed')
            ->where('isDeleted', 0)
            ->has('bookings')
            ->with('specialty')
            ->orderByDesc('bookings_count')
            ->get();

        // If no popular services found, get random services
        if ($popularServices->isEmpty()) {
            $popularServices = Services::where('status', 'completed')
                ->where('isDeleted', 0)
                ->with('specialty')
                ->inRandomOrder()
                ->get();
        }

        // Lấy danh sách tất cả bác sĩ
        $doctors = Doctor::with('specialty')
            ->where('approve', 1)
            ->where('isDeleted', 0)
            ->get();

        // lấy thông tin bài viết
        $posts = Post::with(['category', 'user'])
            ->where('status', 'published')
            ->where('isDeleted', 0)
            ->orderBy('published_at', 'desc')
            ->get();

        return response()->json([
            'specialties' => $specialties,
            'popular_services' => $popularServices,
            'doctors' => $doctors,
            'posts' => $posts
        ]);
    }
}
