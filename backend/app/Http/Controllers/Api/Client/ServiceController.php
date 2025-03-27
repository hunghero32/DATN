<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Exception;

class ServiceController extends Controller
{
    public function listService(){
        $services = Services::where("status",1)
            ->where('isDeleted',0)
            ->take(10)
            ->get()
            ->map(function ($service) {
                // Thêm URL đầy đủ cho hình ảnh
                if ($service->image && !str_starts_with($service->image, 'http')) {
                    $service->image = $this->getImageUrl($service->image);
                }
                return $service;
            });
        return response()->json(["Danh sách dịch vụ",$services]);
    }

    public function detailService(Request $request)
    {
        // Lấy thông tin dịch vụ cùng chuyên khoa và danh mục
        $service = Services::where('status', 1)
            ->where('services.isDeleted', 0) // 👉 Chỉ rõ bảng services
            ->where('id', $request->id)
            ->with([
                'category:id,name',
                'specialty:id,name,image',
                'doctors' => function ($query) {
                    $query->where('doctors.isDeleted', 0) // 👉 Chỉ rõ bảng doctors
                        ->where('doctors.approve', 1)
                        ->with(['schedules' => function ($q) {
                            $q->where('schedules.isDeleted', 0); // 👉 Chỉ rõ bảng schedules
                        }]);
                }
            ])
            ->first();

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        // Xử lý URL hình ảnh cho service
        if ($service->image && !str_starts_with($service->image, 'http')) {
            $service->image = $this->getImageUrl($service->image);
        }

        // Xử lý URL hình ảnh cho specialty
        if ($service->specialty && $service->specialty->image && !str_starts_with($service->specialty->image, 'http')) {
            $service->specialty->image = $this->getImageUrl($service->specialty->image);
        }

        // Xử lý URL hình ảnh cho doctors
        if ($service->doctors) {
            $service->doctors->each(function ($doctor) {
                if ($doctor->doctor_avatar && !str_starts_with($doctor->doctor_avatar, 'http')) {
                    $doctor->doctor_avatar = $this->getImageUrl($doctor->doctor_avatar);
                }
            });
        }

        return response()->json($service);
    }

    public function searchByKeyword(Request $request)
    {
        $keyword = trim(urldecode($request->input('keyword'))); // Giải mã URL và loại bỏ khoảng trắng thừa

        if (!$keyword) {
            return response()->json(['message' => 'Vui lòng nhập từ khóa'], 400);
        }

        // Đảm bảo encoding UTF-8 khi tìm kiếm
        $keyword = mb_strtolower($keyword, 'UTF-8');

        // Chia nhỏ từ khóa theo khoảng trắng
        $words = preg_split('/\s+/', $keyword);

        $services = Services::where(function($query) use ($words) {
            foreach ($words as $word) {
                $query->orWhereRaw("LOWER(services_name) LIKE LOWER(?)", ["%{$word}%"]);
            }
        })
        ->where('status', 1)
        ->where('isDeleted', 0)
        ->get()
        ->map(function ($service) {
            // Thêm URL đầy đủ cho hình ảnh
            if ($service->image && !str_starts_with($service->image, 'http')) {
                $service->image = $this->getImageUrl($service->image);
            }
            return $service;
        });

        return response()->json(['services' => $services]);
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
