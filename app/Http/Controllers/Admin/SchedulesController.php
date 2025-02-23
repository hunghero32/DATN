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
            ->where('schedules.isDeleted', 0)
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
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required',
            'time_end' => 'required',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
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
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required',
            'time_end' => 'required',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
            'status' => 'nullable|integer|in:0,1',
        ]);

        $schedule = Schedule::findOrFail($id);
        $schedule->update($request->all());

        return redirect()->route('admin.schedule.index')->with('success', 'Lịch làm việc đã được cập nhật!');
    }
    public function destroy($id)
    {

        $shedule = Schedule::findOrFail($id);
        if ($shedule->status == 0) {
            $shedule->update(['isDeleted' => 1]);
            return redirect()->route('admin.schedule.index')->with('success', 'Lịch làm việc đã được xóa!');
        } else {
            return redirect()->route('admin.schedule.index')->with('error', 'Không thể xóa lịch làm việc đang hoạt động!');
        }
    }
}
