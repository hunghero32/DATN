<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDoctorServiceRequest;
use App\Http\Requests\UpdateDoctorServiceRequest;
use App\Models\DoctorService;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $doctorServices = DoctorService::with(['service'])
            ->whereHas('doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->filterBySpecialty($request->specialty_id)   // Lọc theo chuyên khoa
            ->searchByServiceName($request->service_name) // Tìm kiếm theo tên dịch vụ
            ->latest('updated_at')
            ->paginate(10);

        return response()->json([
            'message' => 'Danh sách dịch vụ của bác sĩ.',
            'data' => $doctorServices
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorServiceRequest $request)
    {
        $doctor = Doctor::where('user_id', auth()->id())->first();
        if (!$doctor) {
            return response()->json(['message' => 'Bạn không có quyền thêm dịch vụ.'], 403);
        }
        // Kiểm tra xem dịch vụ đã tồn tại chưa
        $exists = DoctorService::where('doctor_id', $doctor->id)
            ->where('service_id', $request->service_id)
            ->exists();
        if ($exists) {
            return response()->json(['message' => 'Dịch vụ này đã tồn tại trong danh sách.'], 422);
        }
        // Thêm dịch vụ mới
        $doctorService = DoctorService::create([
            'doctor_id'  => $doctor->id,
            'service_id' => $request->service_id,
        ]);
        return response()->json([
            'message' => 'Thêm dịch vụ cho bác sĩ thành công.',
            'data'    => $doctorService
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(DoctorService $doctorService)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền xem dịch vụ này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu dịch vụ
        if (!$doctorId || $doctorService->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể xem dịch vụ của bác sĩ khác.'], 403);
        }
        return response()->json([
            'message' => 'Chi tiết dịch vụ của bác sĩ.',
            'data' => $doctorService->load('service')
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorServiceRequest $request, DoctorService $doctorService)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền xem dịch vụ này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu dịch vụ
        if (!$doctorId || $doctorService->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể xem dịch vụ của bác sĩ khác.'], 403);
        }
        $doctorService->update($request->validated());

        return response()->json([
            'message' => 'Cập nhật dịch vụ thành công.',
            'data' => $doctorService
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DoctorService $doctorService)
    {
        // Kiểm tra xem người dùng có đăng nhập và có vai trò là bác sĩ không
        if (!auth()->check() || auth()->user()->role !== 'doctor') {
            return response()->json(['message' => 'Bạn không có quyền xem dịch vụ này.'], 403);
        }
        // Lấy doctor_id từ bảng doctors dựa vào user_id của bác sĩ hiện tại
        $doctorId = Doctor::where('user_id', auth()->id())->value('id');
        // Kiểm tra quyền sở hữu dịch vụ
        if (!$doctorId || $doctorService->doctor_id !== $doctorId) {
            return response()->json(['message' => 'Bạn không thể xem dịch vụ của bác sĩ khác.'], 403);
        }
        $doctorService->delete();

        return response()->json([
            'message' => 'Xóa dịch vụ khỏi bác sĩ thành công.'
        ], 200);
    }
}
