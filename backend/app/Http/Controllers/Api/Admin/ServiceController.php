<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Services;
use Illuminate\Http\Request;
use App\Models\Specialty;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index()
    {
        $data = Services::join('specialties', 'specialties.id', 'services.specialty_id')
            ->join('categories', 'categories.id', 'services.category_id')
            ->select('services.*', 'categories.name as category_name', 'specialties.name as specialty_name')
            ->where('services.isDeleted', 0)
            ->get();

        return response()->json(['message' =>"Danh sách dịch vụ",'data'=>$data]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'services_name'   => 'required|string|max:255',
            'description'     => 'nullable|string',
            'price'           => 'required|numeric|min:0',
            'duration'        => 'required|integer|min:1',
            'category_id'     => 'required|exists:categories,id',
            'specialty_id'    => 'required|exists:specialties,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validatedData = $validator->validated();
        $validatedData['status'] = 0;

        $service = Services::create($validatedData);

        return response()->json(['message' => 'Dịch vụ đã được thêm thành công!', 'data' => $service], 201);
    }

    public function show($id)
    {
        $service = Services::find($id);
        if (!$service) {
            return response()->json(['message' => 'Dịch vụ không tồn tại'], 404);
        }
        return response()->json($service);
    }

    public function update(Request $request, $id)
    {
        $service = Services::find($id);
        if (!$service) {
            return response()->json(['message' => 'Dịch vụ không tồn tại'], 404);
        }

        $validator = Validator::make($request->all(), [
            'services_name'   => 'required|string|max:255',
            'description'     => 'nullable|string',
            'price'           => 'required|numeric|min:0',
            'duration'        => 'required|integer|min:1',
            'category_id'     => 'required|exists:categories,id',
            'specialty_id'    => 'required|exists:specialties,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validatedData = $validator->validated();
        $validatedData['status'] = $service->status;

        $service->update($validatedData);

        return response()->json(['message' => 'Dịch vụ đã được cập nhật thành công!', 'data' => $service]);
    }

    public function delete($id)
    {
        $service = Services::find($id);
        if (!$service) {
            return response()->json(['message' => 'Dịch vụ không tồn tại'], 404);
        }

        if ($service->status == 0) {
            $service->isDeleted = 1;
            $service->save();
            return response()->json(['message' => 'Xóa dịch vụ thành công!']);
        } else {
            return response()->json(['message' => 'Không thể xóa dịch vụ đang hoạt động!'], 400);
        }
    }
}
