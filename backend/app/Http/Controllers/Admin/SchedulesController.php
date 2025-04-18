<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $data = Schedule::join('doctors', 'schedules.doctor_id', '=', 'doctors.id')
            ->select('schedules.*', 'doctors.doctor_name')
            ->where('schedules.isDeleted', 0)
            ->orderBy('schedules.doctor_id')
            ->paginate($perPage);

        return view('admin.pages.schedule.index', [
            'data' => $data
        ]);
    }

    public function search(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->input('search');
        $status = $request->input('status');

        $query = Schedule::join('doctors', 'schedules.doctor_id', '=', 'doctors.id')
            ->select('schedules.*', 'doctors.doctor_name')
            ->where('schedules.isDeleted', 0);

        if (!empty($search)) {
            $query->where('doctors.doctor_name', 'like', '%' . $search . '%');
        }

        // Modified status filtering
        if ($status !== null && $status !== 'all') {
            $query->where('schedules.status', (int)$status);
        }

        $data = $query->orderBy('schedules.doctor_id')->paginate($perPage);
        $data->appends($request->all());

        return view('admin.pages.schedule.index', [
            'data' => $data
        ]);
    }
    public function create()
    {
        return view('admin.pages.schedule.create', [
            'doctors' => Doctor::where('approve', 1)->get()
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'time_slots' => 'required|array',
            'working_week' => 'required',
            'working_days' => 'required|array',
        ], [
            'doctor_id.required' => 'Vui lòng chọn bác sĩ',
            'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống',
            'time_slots.required' => 'Vui lòng chọn khung giờ làm việc',
            'time_slots.array' => 'Định dạng khung giờ không hợp lệ',
            'working_week.required' => 'Vui lòng chọn tuần làm việc',
            'working_days.required' => 'Vui lòng chọn ngày làm việc',
            'working_days.array' => 'Định dạng ngày làm việc không hợp lệ',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            // Parse the week input to get the start date of the week
            $weekYear = substr($request->working_week, 0, 4);
            $weekNumber = substr($request->working_week, 6);
            $startDate = new \DateTime();
            $startDate->setISODate($weekYear, $weekNumber);

            $schedulesCreated = 0;
            $duplicateTimeSlots = [];

            // For each selected day in the week
            foreach ($request->working_days as $dayOfWeek) {
                // Clone the start date and modify it to the current day of week
                $currentDate = clone $startDate;
                if ($dayOfWeek == 0) { // Sunday
                    $currentDate->modify('+6 days');
                } else {
                    $currentDate->modify('+' . ($dayOfWeek - 1) . ' days');
                }

                $workingDate = $currentDate->format('Y-m-d');

                // For each time slot
                foreach ($request->time_slots as $timeSlot) {
                    list($timeStart, $timeEnd) = explode(',', $timeSlot);

                    // Convert to DateTime for comparison
                    $newStart = \DateTime::createFromFormat('H:i', $timeStart);
                    $newEnd = \DateTime::createFromFormat('H:i', $timeEnd);

                    // Check for invalid time slots (e.g., 7:00-11:00 crossing break time)
                    if ($newStart->format('H:i') < '07:00' || $newEnd->format('H:i') > '17:00') {
                        $duplicateTimeSlots[] = $currentDate->format('d/m/Y') . ' ' . $timeStart . '-' . $timeEnd . ' (Thời gian không hợp lệ: phải nằm trong 7:00-17:00)';
                        continue;
                    }

                    if (($newStart->format('H:i') < '11:00' && $newEnd->format('H:i') > '13:00') ||
                        ($newStart->format('H:i') >= '11:00' && $newStart->format('H:i') < '13:00') ||
                        ($newEnd->format('H:i') > '11:00' && $newEnd->format('H:i') <= '13:00')) {
                        $duplicateTimeSlots[] = $currentDate->format('d/m/Y') . ' ' . $timeStart . '-' . $timeEnd . ' (Không thể đặt lịch trong khoảng nghỉ trưa 11:00-13:00)';
                        continue;
                    }

                    // Check for conflicting schedules
                    $existingSchedules = Schedule::where('doctor_id', $request->doctor_id)
                        ->where('working_date', $workingDate)
                        ->where('isDeleted', 0)
                        ->get();

                    $hasConflict = false;
                    foreach ($existingSchedules as $existing) {
                        $existingStart = \DateTime::createFromFormat('H:i:s', $existing->time_start);
                        $existingEnd = \DateTime::createFromFormat('H:i:s', $existing->time_end);

                        // Check for any overlap
                        if (!($newEnd <= $existingStart || $newStart >= $existingEnd)) {
                            $hasConflict = true;
                            $duplicateTimeSlots[] = $currentDate->format('d/m/Y') . ' ' . $timeStart . '-' . $timeEnd . ' (Trùng với lịch từ ' . $existingStart->format('H:i') . '-' . $existingEnd->format('H:i') . ')';
                            break;
                        }
                    }

                    if ($hasConflict) {
                        continue;
                    }

                    // Create new schedule
                    Schedule::create([
                        'doctor_id' => $request->doctor_id,
                        'time_start' => $timeStart . ':00',
                        'time_end' => $timeEnd . ':00',
                        'working_date' => $workingDate,
                        'isDeleted' => 0,
                        'status' => 1
                    ]);

                    $schedulesCreated++;
                }
            }

            if (!empty($duplicateTimeSlots)) {
                $message = 'Một số lịch đã tồn tại hoặc không hợp lệ và được bỏ qua: ' . implode(', ', $duplicateTimeSlots);
                if ($schedulesCreated > 0) {
                    return redirect()->route('admin.schedule.index')
                        ->with('success', 'Đã tạo ' . $schedulesCreated . ' lịch làm việc thành công!')->with('warning', $message);
                } else {
                    return redirect()->back()->with('warning', $message)->withInput();
                }
            }

            if ($schedulesCreated > 0) {
                return redirect()->route('admin.schedule.index')
                    ->with('success', 'Đã tạo ' . $schedulesCreated . ' lịch làm việc thành công!');
            } else {
                return redirect()->back()
                    ->with('error', 'Không thể tạo lịch làm việc do không có lịch hợp lệ!')->withInput();
            }

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Có lỗi xảy ra khi tạo lịch làm việc: ' . $e->getMessage());
        }
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
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'time_slots' => 'required|array',
            'working_week' => 'required',
            'working_days' => 'required|array',
            'status' => 'required|in:0,1',
        ], [
            'doctor_id.required' => 'Vui lòng chọn bác sĩ',
            'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống',
            'time_slots.required' => 'Vui lòng chọn khung giờ làm việc',
            'time_slots.array' => 'Định dạng khung giờ không hợp lệ',
            'working_week.required' => 'Vui lòng chọn tuần làm việc',
            'working_days.required' => 'Vui lòng chọn ngày làm việc',
            'working_days.array' => 'Định dạng ngày làm việc không hợp lệ',
            'status.required' => 'Vui lòng chọn trạng thái',
            'status.in' => 'Trạng thái không hợp lệ',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            $schedule = Schedule::findOrFail($id);

            // Parse the week input to get the date
            $weekYear = substr($request->working_week, 0, 4);
            $weekNumber = substr($request->working_week, 6);
            $startDate = new \DateTime();
            $startDate->setISODate($weekYear, $weekNumber);

            // Get the selected day and adjust the date
            $dayOfWeek = $request->working_days[0]; // We only allow one day in edit mode
            if ($dayOfWeek == 0) { // Sunday
                $startDate->modify('+6 days');
            } else {
                $startDate->modify('+' . ($dayOfWeek - 1) . ' days');
            }

            $workingDate = $startDate->format('Y-m-d');

            // Get time slot
            $timeSlot = $request->time_slots[0]; // We only allow one time slot in edit mode
            list($timeStart, $timeEnd) = explode(',', $timeSlot);

            // Convert to DateTime for comparison
            $newStart = \DateTime::createFromFormat('H:i', $timeStart);
            $newEnd = \DateTime::createFromFormat('H:i', $timeEnd);

            // Check for invalid time slots (e.g., 7:00-11:00 crossing break time)
            if ($newStart->format('H:i') < '07:00' || $newEnd->format('H:i') > '17:00') {
                return redirect()->back()
                    ->with('error', 'Thời gian làm việc phải nằm trong khoảng 7:00 - 17:00.')
                    ->withInput();
            }

            if (($newStart->format('H:i') < '11:00' && $newEnd->format('H:i') > '13:00') ||
                ($newStart->format('H:i') >= '11:00' && $newStart->format('H:i') < '13:00') ||
                ($newEnd->format('H:i') > '11:00' && $newEnd->format('H:i') <= '13:00')) {
                return redirect()->back()
                    ->with('error', 'Không thể đặt lịch trong khoảng thời gian nghỉ trưa (11:00-13:00).')
                    ->withInput();
            }

            // Check for conflicting schedules
            $existingSchedules = Schedule::where('doctor_id', $request->doctor_id)
                ->where('working_date', $workingDate)
                ->where('id', '!=', $id)
                ->where('isDeleted', 0)
                ->get();

            foreach ($existingSchedules as $existing) {
                $existingStart = \DateTime::createFromFormat('H:i:s', $existing->time_start);
                $existingEnd = \DateTime::createFromFormat('H:i:s', $existing->time_end);

                // Check for any overlap
                if (!($newEnd <= $existingStart || $newStart >= $existingEnd)) {
                    return redirect()->back()
                        ->with('error', 'Lịch làm việc bị trùng với lịch hiện có từ ' . $existingStart->format('H:i') . ' đến ' . $existingEnd->format('H:i') . ' vào ngày ' . date('d/m/Y', strtotime($workingDate)))
                        ->withInput();
                }
            }

            // Update the schedule
            $schedule->update([
                'doctor_id' => $request->doctor_id,
                'time_start' => $timeStart . ':00',
                'time_end' => $timeEnd . ':00',
                'working_date' => $workingDate,
                'status' => $request->status
            ]);

            return redirect()->route('admin.schedule.index')
                ->with('success', 'Lịch làm việc đã được cập nhật thành công!');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Có lỗi xảy ra khi cập nhật lịch làm việc: ' . $e->getMessage())
                ->withInput();
        }
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
    public function updateStatus(Request $request, $id)
    {
        try {
            $schedule = Schedule::findOrFail($id);
            $schedule->status = $request->status;
            $schedule->save();

            return redirect()->back()->with('success', 'Cập nhật trạng thái thành công');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Có lỗi xảy ra khi cập nhật trạng thái');
        }
    }
}
