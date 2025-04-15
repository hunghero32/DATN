<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\System;

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
}
