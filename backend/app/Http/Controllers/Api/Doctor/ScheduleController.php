<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->input('month', now()->month);
        $year = $request->input('year', now()->year);

    // Lấy lịch làm việc của bác sĩ theo tháng/năm
    $schedules = Schedule::where('doctor_id', auth()->id())->get();

    $events = [];

    foreach ($schedules as $schedule) {
        $workingDays = json_decode($schedule->working_date, true) ?? []; // Giải mã JSON

        foreach ($workingDays as $date) {
            // Kiểm tra xem ngày này có nằm trong tháng được yêu cầu không
            if (date('Y-m', strtotime($date)) == "$year-$month") {
                $events[] = [
                    'id' => $schedule->id,
                    'title' => 'Lịch làm việc',
                    'start' => $date,
                    'end' => $date,
                    'time_start' => $schedule->time_start,
                    'time_end' => $schedule->time_end,
                    'max_patients' => $schedule->max_patients,
                    'allDay' => true
                ];}}}
    return response()->json($events, 200);
}




    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        $data = $request->validated();
        $schedule = Schedule::create($data);

        return response()->json([
            'message' => 'Tạo lịch làm việc thành công.',
            'data' => $schedule
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule, $date)
    {
        $schedules = Schedule::where('doctor_id', auth()->id())
            ->whereDate('working_date', $date)
            ->get();

        return response()->json([
            'message' => 'Lịch làm việc chi tiết.',
            'data' => $schedules
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        $data = $request->validated();
        $schedule->update($data);

        return response()->json([
            'message' => 'Cập nhật lịch làm việc thành công.',
            'data' => $schedule
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return response()->json([
            'message' => 'Xóa lịch làm việc thành công.'
        ], 200);
    }
}
