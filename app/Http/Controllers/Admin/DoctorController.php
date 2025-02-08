<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    public function index()
    {
        $data = Doctor::all();
        return view('admin.pages.doctor.index', compact('data'));
    }
    public function create()
    {
        return view('admin.pages.doctor.create');
    }


    public function store(Request $request)
    {
        // Create the validator instance
        $validator = Validator::make($request->all(), [
            'doctor_avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'doctor_name' => 'required|string|max:255',
            'doctor_bio' => 'nullable|string|max:1000',
            'clinic_id' => 'required|integer',
            'specialty_id' => 'required|integer',
            'exp' => 'required|integer|min:0',
            'file' => 'required',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Proceed with storing the data
        $avatarPath = $request->file('doctor_avatar') ? $request->file('doctor_avatar')->store('avatars', 'public') : null;
        $filePath = $request->file('file') ? $request->file('file')->store('files', 'public') : null;

        Doctor::create([
            'user_id' => 1,
            'doctor_avatar' => $avatarPath,
            'doctor_name' => $request->doctor_name,
            'doctor_bio' => $request->doctor_bio,
            'clinic_id' => $request->clinic_id,
            'specialty_id' => $request->specialty_id,
            'exp' => $request->exp ?? 0,
            'file' => $filePath,
            'approve' => 0
        ]);

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor created successfully!');
    }
    public function edit($id){
        $data = Doctor::find($id);
        return view('admin.pages.doctor.edit',['data'=>$data]);
    }
    public function update(Request $request, $id)
    {
        // Create the validator instance
        $validator = Validator::make($request->all(), [
            'doctor_avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'doctor_name' => 'required|string|max:255',
            'doctor_bio' => 'nullable|string|max:1000',
            'clinic_id' => 'required|integer',
            'specialty_id' => 'required|integer',
            'exp' => 'required|integer|min:0',
            'file' => 'nullable',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Find the doctor
        $doctor = Doctor::find($id);

        // Update the avatar if a new one is uploaded
        if ($request->hasFile('doctor_avatar')) {
            $avatarPath = $request->file('doctor_avatar')->store('avatars', 'public');
            $doctor->doctor_avatar = $avatarPath;
        }

        // Update the file if a new one is uploaded
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('files', 'public');
            $doctor->file = $filePath;
        }

        // Update the doctor's details
        $doctor->doctor_name = $request->doctor_name;
        $doctor->doctor_bio = $request->doctor_bio;
        $doctor->clinic_id = $request->clinic_id;
        $doctor->specialty_id = $request->specialty_id;
        $doctor->exp = $request->exp ?? 0;
        $doctor->save();

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor updated successfully!');
    }
    public function destroy($id) {
        $doctor = Doctor::findOrFail($id); // Tìm bác sĩ theo ID
        $doctor->delete(); // Xóa bản ghi

        return redirect()->route('admin.doctors.index')->with('success', 'Bạn đã xóa thành công');
    }
}
