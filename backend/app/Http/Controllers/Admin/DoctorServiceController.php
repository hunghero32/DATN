<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\DoctorService;
use App\Models\Services;

class DoctorServiceController extends Controller
{
    public function index()
    {
        try {
            $data = DoctorService::join('doctors', 'doctor_service.doctor_id', '=', 'doctors.id')
                ->join('services', 'doctor_service.service_id', '=', 'services.id')
                ->select('doctor_service.*', 'doctors.doctor_name', 'services.services_name')
                ->where('doctor_service.isDeleted', 0)  // Specify the table name
                ->paginate(10);
            return view('admin.pages.doctor_service.index', compact('data'));
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function create()
    {
        $doctors = Doctor::all();
        $services = Services::all();
        return view('admin.pages.doctor_service.create', compact('doctors', 'services'));
    }

    public function store(Request $request)
    {
        try {
            $messages = [
                'doctor_id.required' => 'Vui lòng chọn bác sĩ',
                'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống',
                'service_id.required' => 'Vui lòng chọn dịch vụ',
                'service_id.exists' => 'Dịch vụ không tồn tại trong hệ thống',
            ];

            $request->validate([
                'doctor_id' => 'required|exists:doctors,id',
                'service_id' => 'required|exists:services,id',
            ], $messages);

            // Check if the doctor-service combination already exists
            $exists = DoctorService::where('doctor_id', $request->doctor_id)
                ->where('service_id', $request->service_id)
                ->exists();

            if ($exists) {
                return back()->with('error', 'Bác sĩ này đã được thêm dịch vụ này trước đó!');
            }

            DoctorService::create($request->all());
            return redirect()->route('admin.doctor_service.index')
                           ->with('success', 'Thêm dịch vụ cho bác sĩ thành công');
        } catch (\Exception $e) {
            return back()->with('error',  $e->getMessage());
        }
    }

    public function edit($id)
    {
        $doctorService = DoctorService::findOrFail($id);
        $doctors = Doctor::all();
        $services = Services::all();
        return view('admin.pages.doctor_service.edit', compact('doctorService', 'doctors', 'services'));
    }

    public function update(Request $request, $id)
{
    try {
        $messages = [
            'doctor_id.required' => 'Vui lòng chọn bác sĩ',
            'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống',
            'service_id.required' => 'Vui lòng chọn dịch vụ',
            'service_id.exists' => 'Dịch vụ không tồn tại trong hệ thống',
        ];

        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'service_id' => 'required|exists:services,id',
        ], $messages);

        $doctorService = DoctorService::findOrFail($id);

        // Chỉ kiểm tra trùng lặp nếu có thay đổi doctor_id hoặc service_id
        if ($doctorService->doctor_id != $request->doctor_id ||
            $doctorService->service_id != $request->service_id) {

            $exists = DoctorService::where('doctor_id', $request->doctor_id)
                ->where('service_id', $request->service_id)
                ->where('id', '!=', $id)
                ->exists();

            if ($exists) {
                return back()->with('error', 'Bác sĩ này đã được thêm dịch vụ này trước đó!')->withInput();
            }
        }

        // Nếu không có thay đổi hoặc không trùng lặp, tiến hành cập nhật
        $doctorService->update($request->all());
        return redirect()->route('admin.doctor_service.index')
                        ->with('success', 'Cập nhật dịch vụ bác sĩ thành công');
    } catch (\Exception $e) {
        return back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage())->withInput();
    }
}

    public function destroy($id)
    {
        try {
            $doctorService = DoctorService::findOrFail($id);
            $doctorService->update(['isDeleted' => 1]);
            return redirect()->route('admin.doctor_service.index')  // Make sure this matches your route name
                           ->with('success', 'Xóa dịch vụ bác sĩ thành công');
        } catch (\Exception $e) {
            return back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }
}
