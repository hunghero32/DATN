<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Services;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function listService(){
     $services = Services::where("status",1)->
     where('isDeleted',0)
     ->take(10)->get();
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
        })->get();

        return response()->json(['services' => $services]);
    }
}
