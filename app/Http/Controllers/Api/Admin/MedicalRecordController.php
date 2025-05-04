<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;

class MedicalRecordController extends Controller
{
    /**
     * Hiển thị danh sách hồ sơ bệnh án.
     */
    public function index()
    {
        $records = MedicalRecord::with('guest')->paginate(10);
        return response()->json($records, 200);
    }
    public function show(MedicalRecord $medicalRecord)
    {
        return response()->json($medicalRecord, 200);
    }
}
