<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MedicalRecord;
use App\Models\Result;
use App\Http\Requests\StoreMedicalRecordRequest;
use App\Http\Requests\UpdateMedicalRecordRequest;

class MedicalRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $medicalRecords = MedicalRecord::with('guest')
            ->where('isDeleted', 0)
            ->searchGuest($request->search)
            ->paginate(10);

        if ($medicalRecords->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy hồ sơ y tế phù hợp.'
            ], 200);
        }
        return response()->json($medicalRecords, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicalRecordRequest $request)
    {
        $data = $request->validated();
        if (MedicalRecord::where('guest_id', $data['guest_id'])->exists()) {
            return response()->json([
                'message' => 'Khách hàng này đã có hồ sơ y tế.',
            ], 422);
        }
        if (!isset($data['guest_id'])) {
            return response()->json([
                'message' => 'Thiếu thông tin bệnh nhân trong hồ sơ y tế.'
            ], 422);
        }
        $medicalRecord = MedicalRecord::create($data);
        return response()->json([
            'message' => 'Tạo hồ sơ y tế thành công.',
            'data' => $medicalRecord->load('guest'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicalRecord $medicalRecord)
    {
        $results = Result::with(['booking.service:id,services_name', 'doctor:id,doctor_name'])
        ->where('guest_id', $medicalRecord->guest_id)->get();
        return response()->json([
            'medical_record' => $medicalRecord->load('guest'),
            'results' => $results
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        $data = $request->validated();
        unset($data['doctor_id']);
        unset($data['guest_id']);
        $medicalRecord->update($data);

        return response()->json([
            'message' => 'Cập nhật hồ sơ y tế thành công.',
            'data' => $medicalRecord
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();

        return response()->json([
            'message' => 'Xóa hồ sơ y tế thành công.'
        ], 200);
    }
}
