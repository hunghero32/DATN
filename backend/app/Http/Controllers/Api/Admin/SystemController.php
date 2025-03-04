<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\System;
use App\Http\Requests\StoreSystemRequest;
use App\Http\Requests\UpdateSystemRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SystemController extends Controller
{
  /**
     * Lấy thông tin hệ thống.
     */
    public function index()
    {
        $system = System::first();
        return response()->json($system, 200);
    }

    /**
     * Lưu cấu hình hệ thống.
     */
    public function store(StoreSystemRequest $request)
    {
        $system = System::first();
        if ($system) {
            return response()->json(['message' => 'Hệ thống đã được cấu hình. Vui lòng chỉnh sửa.'], 400);
        }

        $data = $request->validated();

        if ($request->hasFile('site_logo')) {
            $data['site_logo'] = $request->file('site_logo')->store('uploads', 'public');
        }
        if ($request->hasFile('site_favicon')) {
            $data['site_favicon'] = $request->file('site_favicon')->store('uploads', 'public');
        }

        $system = System::create($data);
        return response()->json($system, 201);
    }

    /**
     * Lấy chi tiết cấu hình hệ thống.
     */
    public function show()
    {
        $system = System::first();
        if (!$system) {
            return response()->json(['message' => 'Chưa có cấu hình hệ thống.'], 404);
        }
        return response()->json($system, 200);
    }

    /**
     * Cập nhật cấu hình hệ thống.
     */
    public function update(UpdateSystemRequest $request)
    {
        $system = System::first();
        if (!$system) {
            return response()->json(['message' => 'Chưa có cấu hình hệ thống để cập nhật.'], 404);
        }
        
        $data = $request->validated();
        
        if ($request->hasFile('site_logo')) {
            if ($system->site_logo) {
                Storage::delete('public/' . $system->site_logo);
            }
            $data['site_logo'] = $request->file('site_logo')->store('uploads', 'public');
        }
        if ($request->hasFile('site_favicon')) {
            if ($system->site_favicon) {
                Storage::delete('public/' . $system->site_favicon);
            }
            $data['site_favicon'] = $request->file('site_favicon')->store('uploads', 'public');
        }
        
        $system->update($data);
        return response()->json(['message' => 'Cập nhật thành công.', 'data' => $system], 200);
    }
}
