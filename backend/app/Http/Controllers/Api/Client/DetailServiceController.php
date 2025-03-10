<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Specialty;
use App\Models\Doctor;
use App\Models\Schedule;
use Illuminate\Http\Request;

class DetailServiceController extends Controller
{
    public function detailService(Request $request)
    {
        // Lấy Specialty theo ID và kiểm tra isDeleted = 0
        $specialty = Specialty::where('isDeleted', 0)
            ->where('id', $request->id)
            ->first();

        if (!$specialty) {
            return response()->json(['message' => 'Specialty not found'], 404);
        }

        // Lấy danh sách bác sĩ cùng lịch làm việc của họ
        $doctors = Doctor::where('specialty_id', $specialty->id)
            ->where('isDeleted', 0)
            ->where('approve', 1)
            ->with(['schedules' => function ($query) {
                $query->where('isDeleted', 0);
            }])
            ->get();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json([
            'specialty' => $specialty,
            'doctors' => $doctors
        ]);
    }
}
