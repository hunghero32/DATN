<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Schedule;
use App\Models\Specialty;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->input('search');
        $specialtyId = $request->input('specialty_id');
        $workingDate = $request->input('working_date');

        $query = Schedule::with('doctor.specialty');

        if (!empty($search)) {
            $query->whereHas('doctor', function ($q) use ($search) {
                $q->where('doctors.doctor_name', 'like', "%$search%");
            });
        }

        if (!empty($specialtyId)) {
            $query->whereHas('doctor.specialty', function ($q) use ($specialtyId) {
                $q->where('id', $specialtyId);
            });
        }

        if (!empty($workingDate)) {
            $query->whereDate('working_date', $workingDate);
        }

        $schedules = $query->orderBy('working_date', 'desc')->paginate($perPage);
        $specialties = Specialty::all();

        return view('admin.pages.schedules.index', compact('schedules', 'specialties'));
    }

    public function create()
    {
        $doctors = Doctor::all();
        return view('admin.pages.schedules.create', compact('doctors'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required|date_format:H:i',
            'time_end' => 'required|date_format:H:i|after:time_start',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
            'status' => 'required|boolean',
        ]);

        Schedule::create($request->all());

        return redirect()->route('admin.schedules.index')->with('success', 'Lịch làm việc đã được tạo!');
    }

    public function edit($id)
    {
        $schedule = Schedule::findOrFail($id);
        $doctors = Doctor::all();
        return view('admin.pages.schedules.edit', compact('schedule', 'doctors'));
    }

    public function update(Request $request, $id)
    {
        $schedule = Schedule::findOrFail($id);

        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required|date_format:H:i:s',
            'time_end' => 'required|date_format:H:i:s|after:time_start',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
            'status' => 'required|boolean',
        ]);

        $schedule->update($request->all());

        return redirect()->route('admin.schedules.index')->with('success', 'Cập nhật lịch làm việc thành công!');
    }

    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();

        return redirect()->route('admin.schedules.index')->with('success', 'Lịch làm việc đã bị xóa!');
    }
}