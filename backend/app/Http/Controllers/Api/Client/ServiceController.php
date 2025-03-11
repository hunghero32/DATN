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
        ->where('isDeleted', 0)
        ->where('id', $request->id)
        ->with([
            'category:id,name',
            'specialty:id,name,image',
            'doctors' => function ($query) {
                $query->where('isDeleted', 0)
                    ->where('approve', 1)
                    ->with(['schedules' => function ($q) {
                        $q->where('isDeleted', 0);
                    }]);
            }
        ])
        ->first();

    if (!$service) {
        return response()->json(['message' => 'Service not found'], 404);
    }

    return response()->json($service);
}

}
