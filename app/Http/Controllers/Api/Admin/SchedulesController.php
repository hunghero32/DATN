<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{
    public function index(Request $request)
{
    $query = Schedule::join('doctors', 'schedules.doctor_id', '=', 'doctors.id')
        ->select('schedules.*', 'doctors.doctor_name')
        ->where('schedules.isDeleted', 0);

    if ($request->has('doctor_id')) {
        $query->where('schedules.doctor_id', $request->doctor_id);
    }

    $data = $query->get();
    return response()->json(['success' => true, 'data' => $data]);
}
    public function show($id)
    {
        $schedule = Schedule::with('doctor')->find($id);
        if (!$schedule) {
            return response()->json(['success' => false, 'message' => 'Lịch làm việc không tồn tại!'], 404);
        }

        return response()->json(['success' => true, 'data' => $schedule]);
    }
}