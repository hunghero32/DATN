<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // Thêm dòng này
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
        // Lấy ngày hiện tại
        $currentDate = now()->format('Y-m-d');

        // Lấy thông tin dịch vụ cùng chuyên khoa và danh mục
        $service = Services::where('status', 1)
            ->where('services.isDeleted', 0)
            ->where('id', $request->id)
            ->with([
                'specialty:id,name,image',
                'doctors' => function ($query) use ($currentDate) {
                    $query->where('doctors.isDeleted', 0)
                        ->where('doctors.approve', 1)
                        ->with(['schedules' => function ($q) use ($currentDate) {
                            $q->where('schedules.isDeleted', 0)
                              ->where('working_date', $currentDate); // Chỉ lấy lịch trình của ngày hiện tại
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

    public function searchBySpecialtyName(Request $request)
    {
        try {
            $encodedKeyword = trim($request->input('keyword', ''));

            // Proper base64 and decode handling
            try {
                $keyword = base64_decode($encodedKeyword);
                if ($keyword === false) {
                    throw new Exception('Invalid base64 encoding');
                }
                $keyword = mb_convert_encoding($keyword, 'UTF-8');
            } catch (Exception $e) {
                Log::error('Base64 decode error: ' . $e->getMessage());
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid input format'
                ], 400);
            }

            // Remove the problematic log() call
            Log::info('Searching for specialty: ' . $keyword);

            if (empty($keyword)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Vui lòng cung cấp triệu chứng của bạn'
                ], 400);
            }

            // Search for specialties matching the keyword
            $specialties = Specialty::where(function($query) use ($keyword) {
                $query->where('name', 'LIKE', "%{$keyword}%")
                      ->orWhere('description', 'LIKE', "%{$keyword}%");
            })
            ->where('isDeleted', 0)
            ->select('id', 'name', 'description', 'image')
            ->get();

            // Process images for specialties
            $specialties->transform(function ($specialty) {
                if ($specialty->image && !str_starts_with($specialty->image, 'http')) {
                    $specialty->image = $this->getImageUrl($specialty->image);
                }
                return $specialty;
            });

            return response()->json([
                'status' => 'success',
                'message' => $specialties->isEmpty() ? 'Không tìm thấy chuyên khoa phù hợp' : 'Tìm thấy chuyên khoa phù hợp',
                'specialties' => $specialties
            ]);

        } catch (\Exception $e) {
            Log::error('Error in searchBySpecialtyName: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Có lỗi xảy ra khi tìm kiếm: ' . $e->getMessage()
            ], 500);
        }
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
