<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Doctor;
use App\Models\Booking;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->query('month', now()->month);
        $year = $request->query('year', now()->year);

        $schedules = Schedule::whereHas('doctor', function ($query) {
            $query->where('user_id', auth()->id());
        })
            ->whereYear('working_date', $year)
            ->whereMonth('working_date', $month)
            ->get(['id', 'working_date', 'time_start', 'time_end']);

        return response()->json([
            'message' => 'Danh sách lịch làm việc trong tháng.',
            'data' => $schedules
        ], 200);
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        $doctor = Doctor::where('user_id', auth()->id())->first();
        if (!$doctor) {
            return response()->json(['message' => 'Bạn không có quyền tạo lịch làm việc.'], 403);
        }
        // Lấy dữ liệu từ request
        $data = $request->validated();
        $timeStart = $data['time_start'];
        $timeEnd = $data['time_end'];
        $maxPatients = $data['max_patients'] ?? 10; // Giá trị mặc định
        $month = $data['month']; // Tháng làm việc
        $year = $data['year']; // Năm làm việc
        if ($year == now()->year && $month < now()->month) {
            return response()->json(['message' => 'Không thể tạo lịch cho tháng đã qua.'], 400);
        }
        // Xóa lịch cũ của tháng để tránh trùng lặp
        Schedule::where('doctor_id', $doctor->id)
            ->whereYear('working_date', $year)
            ->whereMonth('working_date', $month)
            ->delete();
        // Tạo lịch làm việc cho cả tháng
        $newSchedules = [];
        $daysInMonth = Carbon::createFromDate($year, $month, 1)->daysInMonth;
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = "$year-$month-" . str_pad($day, 2, '0', STR_PAD_LEFT);
            $newSchedules[] = [
                'doctor_id'    => $doctor->id, // Tự động lấy ID của bác sĩ đăng nhập
                'working_date' => $date,
                'time_start'   => $timeStart,
                'time_end'     => $timeEnd,
                'max_patients' => $maxPatients,
                'created_at'   => now(),
                'updated_at'   => now()
            ];
        }
        Schedule::insert($newSchedules);
        return response()->json([
            'message' => 'Tạo lịch làm việc cho tháng mới thành công.',
            'data' => $newSchedules
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($date)
    {
        // Lấy thông tin bác sĩ
        $doctor = Doctor::where('user_id', auth()->id())->first();
        if (!$doctor) {
            return response()->json(['message' => 'Bạn không có quyền xem lịch làm việc.'], 403);
        }
        // Lấy lịch làm việc của bác sĩ theo ngày
        $schedules = Schedule::where('doctor_id', $doctor->id)
            ->whereDate('working_date', $date)
            ->get();
    
        if ($schedules->isEmpty()) {
            return response()->json(['message' => 'Không có lịch làm việc trong ngày này.'], 404);
        }
        $bookings = Booking::where('doctor_id', $doctor->id)
        ->whereDate('booking_date', $date)
        ->with('guest:id,guest_name') // Lấy thông tin bệnh nhân
        ->get();
        // Đếm số booking trong ngày đó
        $totalBookings = Booking::where('doctor_id', $doctor->id)
            ->whereDate('booking_date', $date)
            ->count();
        // Đếm số booking đã hoàn thành (giả sử status = 'completed' là đã khám xong)
        $completedBookings = Booking::where('doctor_id', $doctor->id)
            ->whereDate('booking_date', $date)
            ->where('status', 'completed')
            ->count();
    
        return response()->json([
            'message' => 'Chi tiết lịch làm việc.',
            'data' => [
                'schedule' => $schedules,
                'bookings' => $bookings,
                'total_bookings' => $totalBookings,
                'completed_bookings' => $completedBookings
            ]
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, $date)
    {
        if (Carbon::parse($date)->isPast()) {
            return response()->json(['message' => 'Không thể cập nhật lịch làm việc trong quá khứ.'], 400);
        }
        // Lấy thông tin bác sĩ
        $doctor = Doctor::where('user_id', auth()->id())->first();
        if (!$doctor) {
            return response()->json(['message' => 'Bạn không có quyền cập nhật lịch làm việc.'], 403);
        }
        // Tìm lịch làm việc theo ngày
        $schedule = Schedule::where('doctor_id', $doctor->id)
            ->whereDate('working_date', $date)
            ->first();
        if (!$schedule) {
            return response()->json(['message' => 'Không tìm thấy lịch làm việc trong ngày này.'], 404);
        }
        // Lấy dữ liệu request đã validate
        $data = $request->validated();
        // Kiểm tra xem ngày đó có booking nào không
        $hasBookings = Booking::where('doctor_id', $doctor->id)
            ->whereDate('booking_date', $date)
            ->exists();
        if ($hasBookings) {
            return response()->json(['message' => 'Không thể sửa vì đã có lịch hẹn trong ngày này.'], 400);
        }
        // Cập nhật lịch làm việc
        $schedule->update($data);
    
        return response()->json([
            'message' => 'Cập nhật lịch làm việc thành công.',
            'data' => $schedule
        ], 200);
    }

    /**
     * Leave the specified resource in storage.
     */
    
    public function leave($date)
    {
        if (Carbon::parse($date)->isPast()) {
            return response()->json(['message' => 'Không thể xin nghỉ trong quá khứ.'], 400);
        }
        // Lấy thông tin bác sĩ
        $doctor = Doctor::where('user_id', auth()->id())->first();
        if (!$doctor) {
            return response()->json(['message' => 'Bạn không có quyền yêu cầu nghỉ.'], 403);
        }
        // Tìm lịch làm việc theo ngày
        $schedule = Schedule::where('doctor_id', $doctor->id)
            ->whereDate('working_date', $date)
            ->first();
        if (!$schedule) {
            return response()->json(['message' => 'Không tìm thấy lịch làm việc trong ngày này.'], 404);
        }
        // Kiểm tra xem ngày đó có booking nào không
        $hasBookings = Booking::where('doctor_id', $doctor->id)
            ->whereDate('booking_date', $date)
            ->exists();
        if ($hasBookings) {
            return response()->json(['message' => 'Không thể nghỉ vì đã có lịch hẹn trong ngày này.'], 400);
        }
        // Cập nhật trạng thái nghỉ làm
        $schedule->update(['status' => 0]);
        return response()->json([
            'message' => 'Yêu cầu nghỉ thành công. Lịch làm việc đã được cập nhật.',
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
