<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index(){
        $data=Doctor::all();
        return view('admin.pages.doctor.index',compact('data'));
    }
    public function create(){
        return view('admin.pages.doctor.create');
    }
    public function store(Request $request)
{
    $request->validate([
        'doctor_avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'doctor_name' => 'required|string|max:255',
        'doctor_bio' => 'nullable|string|max:1000',
        'clinic_id' => 'required|integer',
        'specialty_id' => 'required|integer',
        'exp' => 'required|integer|min:0',
        'file' => 'nullable',
    ]);


    // Xử lý upload avatar
    $avatarPath = $request->file('doctor_avatar') ? $request->file('doctor_avatar')->store('avatars', 'public') : null;

    // Xử lý upload file tài liệu (nếu có)
    $filePath = $request->file('file') ? $request->file('file')->store('files', 'public') : null;

    // Lưu vào database
    Doctor::create([
        'user_id' => 1,
        'doctor_avatar' => $avatarPath,
        'doctor_name' => $request->doctor_name,
        'doctor_bio' => $request->doctor_bio,
        'clinic_id' => 1,
        'specialty_id' => 1,
        'exp' => $request->exp ?? 0, // Giá trị mặc định nếu không nhập
        'file' => $filePath,
        'approve' => 0 // Mặc định chưa duyệt
    ]);

    return redirect()->route('admin.doctors.index');
}


}
