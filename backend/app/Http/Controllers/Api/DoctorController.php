<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller
{
    public function index()
    {
        $data = Doctor::where('isDeleted', 0)->get();
        return response()->json(['doctors' => $data]);
    }

    public function search(Request $request)
    {
        $exp = $request->input('exp');
        $search = $request->input('search');

        $query = Doctor::where('isDeleted', 0);

        if (!empty($exp)) {
            if ($exp === '0-5') {
                $query->whereBetween('exp', [0, 5]);
            } elseif ($exp === '6-10') {
                $query->whereBetween('exp', [6, 10]);
            } elseif ($exp === '10+') {
                $query->where('exp', '>', 10);
            }
        }

        if (!empty($search)) {
            $query->where('doctor_name', 'like', "%$search%");
        }

        return response()->json(['doctors' => $query->get()]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'doctor_name' => 'required|string|max:255',
            'doctor_bio' => 'nullable|string|max:1000',
            'exp' => 'required|integer|min:0|max:50',
            'file' => 'required|mimes:pdf,doc,docx,jpg,png|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $avatarPath = $request->file('doctor_avatar')->store('avatars', 'public');
        $filePath = $request->file('file')->store('files', 'public');

        $doctor = Doctor::create([
            'user_id' => auth()->id(),
            'doctor_avatar' => $avatarPath,
            'doctor_name' => $request->doctor_name,
            'doctor_bio' => $request->doctor_bio,
            'specialty_id' => $request->specialty_id,
            'exp' => $request->exp,
            'file' => $filePath,
            'approve' => 0,
        ]);

        return response()->json(['message' => 'Doctor created successfully!', 'doctor' => $doctor], 201);
    }

    public function show($id)
    {
        $doctor = Doctor::findOrFail($id);
        return response()->json(['doctor' => $doctor]);
    }

    public function update(Request $request, $id)
    {
        $doctor = Doctor::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'doctor_avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'doctor_name' => 'required|string|max:255',
            'doctor_bio' => 'nullable|string|max:1000',
            'exp' => 'required|integer|min:0|max:50',
            'file' => 'nullable|mimes:pdf,doc,docx,jpg,png|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('doctor_avatar')) {
            if ($doctor->doctor_avatar) {
                Storage::disk('public')->delete($doctor->doctor_avatar);
            }
            $doctor->doctor_avatar = $request->file('doctor_avatar')->store('avatars', 'public');
        }

        if ($request->hasFile('file')) {
            if ($doctor->file) {
                Storage::disk('public')->delete($doctor->file);
            }
            $doctor->file = $request->file('file')->store('files', 'public');
        }

        $doctor->update($request->only(['doctor_name', 'doctor_bio', 'specialty_id', 'exp', 'approve']));

        return response()->json(['message' => 'Doctor updated successfully!', 'doctor' => $doctor]);
    }

    public function destroy($id)
    {
        $doctor = Doctor::findOrFail($id);

        if ($doctor->approve == 0) {
            $doctor->update(['isDeleted' => 1]);
            return response()->json(['message' => 'Doctor deleted successfully!']);
        }
        return response()->json(['error' => 'Cannot delete an approved doctor.'], 403);
    }
}
