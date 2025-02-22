<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DoctorSpecialty;
use App\Http\Requests\StoreDoctorSpecialtyRequest;
use App\Http\Requests\UpdateDoctorSpecialtyRequest;

class DoctorSpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctorSpecialties = DoctorSpecialty::with(['doctor', 'specialty'])->paginate(5);
        return response()->json($doctorSpecialties, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorSpecialtyRequest $request)
    {
        $data = $request->validated();
        $doctorSpecialty = DoctorSpecialty::create($data);
        return response()->json($doctorSpecialty, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(DoctorSpecialty $doctorSpecialty)
    {
        return response()->json($doctorSpecialty, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorSpecialtyRequest $request, DoctorSpecialty $doctorSpecialty)
    {
        $data = $request->validated();
        $doctorSpecialty->update($data);
        return response()->json(['message' => 'Cập nhật thành công.', 'data' => $doctorSpecialty], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DoctorSpecialty $doctorSpecialty)
    {
        $doctorSpecialty->delete();
        return response()->json(['message' => 'Xóa thành công.'], 200);
    }
}
