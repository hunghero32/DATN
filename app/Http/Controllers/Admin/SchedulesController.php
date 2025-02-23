<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Schedule;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{
    public function index()
    {
        $data = Schedule::join('doctors', 'schedules.doctor_id', '=', 'doctors.id')
            ->select('schedules.*', 'doctors.doctor_name')
            ->get();

        return view('admin.pages.schedule.index', [
            'data' => $data
        ]);
    }
    public function create()
    {
        return view('admin.pages.schedule.create', [
            'doctors' => Doctor::pluck('doctor_name', 'id')->toArray()
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'nullable|exists:doctors,id',
            'time_start' => 'nullable',
            'time_end' => 'nullable',
            'working_date' => 'nullable|date',
            'max_patients' => 'nullable|integer|min:1',
            'status' => 'nullable|integer|in:0,1',
        ]);

        Schedule::create($request->all());

        return redirect()->route('admin.schedule.index')->with('success', 'Lịch làm việc đã được tạo!');
    }
    public function edit($id)
    {
        $data = Schedule::findOrFail($id);

        return view('admin.pages.schedule.edit', [
            'data' => $data,
            'doctors' => Doctor::pluck('doctor_name', 'id')->toArray()
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'doctor_id' => 'nullable|exists:doctors,id',
            'time_start' => 'nullable',
            'time_end' => 'nullable',
            'working_date' => 'nullable|date',
            'max_patients' => 'nullable|integer|min:1',
            'status' => 'nullable|integer|in:0,1',
        ]);

        $schedule = Schedule::findOrFail($id);
        $schedule->update($request->all());

        return redirect()->route('admin.schedule.index')->with('success', 'Lịch làm việc đã được cập nhật!');
    }
}
