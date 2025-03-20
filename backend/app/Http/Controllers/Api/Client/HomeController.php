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
        $specialties = Specialty::whereHas('doctors', function ($query) {
            $query->where('approve', 1)
                  ->where('isDeleted', 0)
                  ->whereHas('doctorServices', function ($q) {
                      $q->where('doctor_service.isDeleted', 0)
                        ->whereHas('service', function ($s) {
                            $s->where('status', 1) // Hoặc 'completed' tùy kiểu dữ liệu
                              ->where('isDeleted', 0);
                        });
                  });
        })
        ->where('isDeleted', 0) // Điều kiện cho bảng specialties
        ->get();

        // Lấy dịch vụ có số lượng đặt lịch nhiều nhất
        $popularServices = Services::where('status', 1) // Hoặc 'completed' tùy kiểu dữ liệu
        ->where('isDeleted', 0)
        ->whereHas('doctorServices', function ($query) {
            $query->where('doctor_service.isDeleted', 0)
                  ->whereHas('doctor', function ($q) {
                      $q->where('approve', 1)
                        ->where('isDeleted', 0);
                  });
        })
        ->get();


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
