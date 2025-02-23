<?php

namespace App\Http\Controllers;

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
        $doctorSpecialties = DoctorSpecialty::with(['doctor', 'clinic', 'specialty'])->paginate(5);
        return view('doctor_specialties.index', compact('doctorSpecialties'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('doctor_specialties.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorSpecialtyRequest $request)
    {
        $data = $request->validated();
        DoctorSpecialty::create($data);
        return redirect()->route('doctor_specialties.index')->with('success', 'Liên kết bác sĩ và chuyên khoa được tạo thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DoctorSpecialty $doctorSpecialty)
    {
        return view('doctor_specialties.show', compact('doctorSpecialty'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DoctorSpecialty $doctorSpecialty)
    {
        return view('doctor_specialties.edit', compact('doctorSpecialty'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorSpecialtyRequest $request, DoctorSpecialty $doctorSpecialty)
    {
        $data = $request->validated();
        $doctorSpecialty->update($data);
        return redirect()->route('doctor_specialties.index')->with('success', 'Liên kết bác sĩ và chuyên khoa được cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DoctorSpecialty $doctorSpecialty)
    {
        $doctorSpecialty->delete();
        return redirect()->route('doctor_specialties.index')->with('success', 'Liên kết bác sĩ và chuyên khoa được xóa thành công.');
    }
}
