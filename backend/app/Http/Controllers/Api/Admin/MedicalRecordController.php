<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use App\Http\Requests\StoreMedicalRecordRequest;
use App\Http\Requests\UpdateMedicalRecordRequest;

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

    /**
     * Lưu hồ sơ bệnh án mới.
     */
    public function store(StoreMedicalRecordRequest $request)
    {
        $data = $request->validated();
        $record = MedicalRecord::create($data);
        return response()->json(['message' => 'Tạo hồ sơ bệnh án thành công.', 'data' => $record], 201);
    }

    /**
     * Hiển thị thông tin hồ sơ bệnh án cụ thể.
     */
    public function show(MedicalRecord $medicalRecord)
    {
        return response()->json($medicalRecord, 200);
    }

    /**
     * Cập nhật thông tin hồ sơ bệnh án.
     */
    public function update(UpdateMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        $data = $request->validated();
        $medicalRecord->update($data);
        return response()->json(['message' => 'Cập nhật hồ sơ bệnh án thành công.', 'data' => $medicalRecord], 200);
    }

    /**
     * Xóa hồ sơ bệnh án khỏi hệ thống.
     */
    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return response()->json(['message' => 'Xóa hồ sơ bệnh án thành công.'], 200);
    }
}
