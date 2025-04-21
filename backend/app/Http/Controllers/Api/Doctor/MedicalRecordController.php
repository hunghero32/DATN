<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MedicalRecord;
use App\Models\Result;
use App\Models\Guest;
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
            ->latest('updated_at')
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

        // Check if a medical record already exists for this guest
        if (MedicalRecord::where('guest_id', $data['guest_id'])->exists()) {
            return response()->json([
                'message' => 'Khách hàng này đã có hồ sơ y tế.'
            ], 422);
        }

        // Ensure guest_id is present (this is already validated in StoreMedicalRecordRequest, but adding for clarity)
        if (!isset($data['guest_id'])) {
            return response()->json([
                'message' => 'Thiếu thông tin bệnh nhân trong hồ sơ y tế.'
            ], 422);
        }

        // Create the medical record
        $medicalRecord = MedicalRecord::create($data);

        return response()->json([
            'message' => 'Tạo hồ sơ y tế thành công.',
            'data' => $medicalRecord->load('guest'),
        ], 201);
    }

    /**
     * Display the medical record for a specific guest.
     */
    public function show($guestId)
    {
        // Find the guest
        $guest = Guest::find($guestId);

        if (!$guest) {
            return response()->json([
                'message' => 'Không tìm thấy khách hàng.'
            ], 404);
        }

        // Load the medical record for the guest (if it exists)
        $medicalRecord = MedicalRecord::where('guest_id', $guestId)->first();

        // Fetch results associated with the guest
        $results = Result::with(['booking.service:id,services_name', 'doctor:id,doctor_name'])
            ->where('guest_id', $guestId)
            ->get();

        return response()->json([
            'medical_record' => $medicalRecord ? $medicalRecord->load('guest') : null,
            'results' => $results
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        $data = $request->validated();

        // Prevent updating guest_id or doctor_id
        unset($data['doctor_id']);
        unset($data['guest_id']);

        $medicalRecord->update($data);

        return response()->json([
            'message' => 'Cập nhật hồ sơ y tế thành công.',
            'data' => $medicalRecord->load('guest')
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->update(['isDeleted' => 1]); // Soft delete by updating isDeleted

        return response()->json([
            'message' => 'Xóa hồ sơ y tế thành công.'
        ], 200);
    }
}