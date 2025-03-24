<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateDoctorRequest;
use App\Models\Doctor;
use Illuminate\Support\Facades\Storage;

class ProfileDoctor extends Controller
{
    /**
     * Lấy thông tin hồ sơ của bác sĩ đang đăng nhập.
     */
    public function show()
    {
        $doctor = Doctor::firstOrCreate(
            ['user_id' => auth()->id()],
            [
                'doctor_avatar' => null,
                'doctor_name' => auth()->user()->name,
                'doctor_bio' => '',
                'specialty_id' => 1,
                'exp' => 0,
                'file' => null,
                'approve' => true,
            ]
        );
        return response()->json([
            'doctor_id' => $doctor->id,
            'doctor_name' => $doctor->doctor_name,
            'doctor_avatar' => $doctor->doctor_avatar ? Storage::url($doctor->doctor_avatar) : null,
            'doctor_bio' => $doctor->doctor_bio,
            'specialty' =>  $doctor->specialty->name ?? 'Chưa cập nhật',
            'exp' => $doctor->exp,
            'file' => $doctor->file ? Storage::url($doctor->file) : null,
            'approve' => $doctor->approve,
            'created_at' => $doctor->created_at,
            'updated_at' => $doctor->updated_at,
        ], 200);
    }

    /**
     * Cập nhật thông tin hồ sơ của bác sĩ.
     */
    public function update(UpdateDoctorRequest $request)
    {
        $doctor = Doctor::where('user_id', auth()->id())->first();

        if (!$doctor) {
            return response()->json(['message' => 'Bác sĩ không tồn tại.'], 404);
        }
        $validatedData = $request->validated();
        // Xử lý avatar
        if ($request->hasFile('doctor_avatar')) {
            Storage::delete($doctor->doctor_avatar);
            $validatedData['doctor_avatar'] = $request->file('doctor_avatar')->store('avatars');
        }
        // Xử lý file đính kèm
        if ($request->hasFile('file')) {
            Storage::delete($doctor->file);
            $validatedData['file'] = $request->file('file')->store('documents');
        }
        $doctor->update($validatedData);
        // Nếu có thay đổi tên bác sĩ thì cập nhật cả tên user
        if (isset($validatedData['doctor_name'])) {
            $doctor->user()->update(['name' => $validatedData['doctor_name']]);
        }
        return response()->json([
            'message' => 'Cập nhật hồ sơ thành công.',
            'doctor' => $doctor,
        ], 200);
    }
}
