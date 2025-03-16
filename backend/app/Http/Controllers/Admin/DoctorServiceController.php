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
        return view('admin.doctor-services.create', compact('doctors', 'services'));
    }

    public function store(Request $request)
    {
        try {
            DoctorService::create($request->all());
            return redirect()->route('admin.doctor-services.index')
                           ->with('success', 'Doctor service created successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $doctorService = DoctorService::findOrFail($id);
        $doctors = Doctor::all();
        $services = Services::all();
        return view('admin.doctor-services.edit', compact('doctorService', 'doctors', 'services'));
    }

    public function update(Request $request, $id)
    {
        try {
            $doctorService = DoctorService::findOrFail($id);
            $doctorService->update($request->all());
            return redirect()->route('admin.doctor-services.index')
                           ->with('success', 'Doctor service updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            DoctorService::findOrFail($id)->delete();
            return redirect()->route('admin.doctor-services.index')
                           ->with('success', 'Doctor service deleted successfully');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
