<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Services;

class ServiceController extends Controller
{
    public function index()
    {
        $data = Services::join('specialties', 'specialties.id', 'services.specialty_id')
            ->select('services.*', 'specialties.name as specialty_name')
            ->where('services.isDeleted', 0)
            ->get();

        return response()->json(['message' =>"Danh sách dịch vụ",'data'=>$data]);
    }
    public function show($id)
    {
        $service = Services::find($id);
        if (!$service) {
            return response()->json(['message' => 'Dịch vụ không tồn tại'], 404);
        }
        return response()->json($service);
    }
}
