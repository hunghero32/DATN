<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SchedulesController extends Controller
{
    public function index()
    {
        $data = Schedule::join('doctors', 'schedules.doctor_id', '=', 'doctors.id')
            ->select('schedules.*', 'doctors.doctor_name')
            ->whereNull('schedules.deleted_at')
            ->orderBy('schedules.working_date', 'asc')
            ->get();

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required',
            'time_end' => 'required',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $schedule = Schedule::create($request->all());

        return response()->json(['success' => true, 'message' => 'Lịch làm việc đã được tạo!', 'data' => $schedule]);
    }

    public function show($id)
    {
        $schedule = Schedule::with('doctor')->find($id);
        if (!$schedule) {
            return response()->json(['success' => false, 'message' => 'Lịch làm việc không tồn tại!'], 404);
        }

        return response()->json(['success' => true, 'data' => $schedule]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required',
            'time_end' => 'required',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['success' => false, 'message' => 'Lịch làm việc không tồn tại!'], 404);
        }

        $schedule->update($request->all());

        return response()->json(['success' => true, 'message' => 'Lịch làm việc đã được cập nhật!', 'data' => $schedule]);
    }

    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['success' => false, 'message' => 'Lịch làm việc không tồn tại!'], 404);
        }

        if ($schedule->status == 0) {
            $schedule->update(['isDeleted' => 1]);
            return response()->json(['success' => true, 'message' => 'Lịch làm việc đã được xóa!']);
        }

        return response()->json(['success' => false, 'message' => 'Không thể xóa lịch làm việc đang hoạt động!'], 400);
    }
}
