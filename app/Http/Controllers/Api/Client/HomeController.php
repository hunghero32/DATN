<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Post;
use App\Models\Services;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Exception;

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
                            $s->where('status', 1)
                              ->where('isDeleted', 0);
                        });
                  });
        })
        ->where('isDeleted', 0)
        ->get()
        ->map(function ($specialty) {
            // Thêm URL đầy đủ cho hình ảnh
            if ($specialty->image && !str_starts_with($specialty->image, 'http')) {
                $specialty->image = $this->getImageUrl($specialty->image);
            }
            return $specialty;
        });

        // Lấy dịch vụ có số lượng đặt lịch nhiều nhất
        $popularServices = Services::where('status', 1)
        ->where('isDeleted', 0)
        ->whereHas('doctorServices', function ($query) {
            $query->where('doctor_service.isDeleted', 0)
                  ->whereHas('doctor', function ($q) {
                      $q->where('approve', 1)
                        ->where('isDeleted', 0);
                  });
        })
        ->get()
        ->map(function ($service) {
            // Thêm URL đầy đủ cho hình ảnh
            if ($service->image && !str_starts_with($service->image, 'http')) {
                $service->image = $this->getImageUrl($service->image);
            }
            return $service;
        });

        // Lấy danh sách tất cả bác sĩ
        $doctors = Doctor::with('specialty')
            ->where('approve', 1)
            ->where('isDeleted', 0)
            ->get()
            ->map(function ($doctor) {
                // Thêm URL đầy đủ cho hình ảnh
                if ($doctor->doctor_avatar && !str_starts_with($doctor->doctor_avatar, 'http')) {
                    $doctor->doctor_avatar = $this->getImageUrl($doctor->doctor_avatar);
                }
                return $doctor;
            });

        // lấy thông tin bài viết
        $posts = Post::with(['category', 'user'])
            ->where('status', 'published')
            ->where('isDeleted', 0)
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($post) {
                // Thêm URL đầy đủ cho hình ảnh
                if ($post->image && !str_starts_with($post->image, 'http')) {
                    $post->image = $this->getImageUrl($post->image);
                }
                return $post;
            });

        return response()->json([
            'specialties' => $specialties,
            'popular_services' => $popularServices,
            'doctors' => $doctors,
            'posts' => $posts
        ]);
    }

    /**
     * Get image URL with fallback to local storage if S3 fails
     *
     * @param string $imagePath
     * @return string
     */
    private function getImageUrl($imagePath)
    {
        try {
            // Try to get image from S3
            return Storage::disk('s3')->url($imagePath);
        } catch (Exception $e) {
            // Fallback to local storage if S3 fails
            return url('storage/' . $imagePath);
        }
    }
}
