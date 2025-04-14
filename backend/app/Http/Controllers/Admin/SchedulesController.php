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

                // For each time slot
                foreach ($request->time_slots as $timeSlot) {
                    list($timeStart, $timeEnd) = explode(',', $timeSlot);

                    // Check for existing schedule
                    $existingSchedule = Schedule::where('doctor_id', $request->doctor_id)
                        ->where('working_date', $currentDate->format('Y-m-d'))
                        ->where('time_start', $timeStart . ':00')
                        ->where('time_end', $timeEnd . ':00')
                        ->where('isDeleted', 0)
                        ->first();

                    if ($existingSchedule) {
                        $duplicateTimeSlots[] = $currentDate->format('d/m/Y') . ' ' . $timeStart . '-' . $timeEnd;
                        continue;
                    }

                    // Create new schedule
                    Schedule::create([
                        'doctor_id' => $request->doctor_id,
                        'time_start' => $timeStart . ':00',
                        'time_end' => $timeEnd . ':00',
                        'working_date' => $currentDate->format('Y-m-d'),
                        'isDeleted' => 0,
                        'status' => 1
                    ]);

                    $schedulesCreated++;
                }
            }

            if (!empty($duplicateTimeSlots)) {
                $message = 'Một số lịch đã tồn tại và được bỏ qua: ' . implode(', ', $duplicateTimeSlots);
                return redirect()->back()->with('warning', $message)->withInput();
            }

            if ($schedulesCreated > 0) {
                return redirect()->route('admin.schedule.index')
                    ->with('success', 'Đã tạo ' . $schedulesCreated . ' lịch làm việc thành công!');
            } else {
                return redirect()->back()
                    ->with('error', 'Không thể tạo lịch làm việc do trùng lặp!')->withInput();
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

            // Check for conflicting schedules
            $existingSchedule = Schedule::where('doctor_id', $request->doctor_id)
                ->where('working_date', $workingDate)
                ->where('time_start', $timeStart . ':00')
                ->where('time_end', $timeEnd . ':00')
                ->where('id', '!=', $id)
                ->where('isDeleted', 0)
                ->first();

            if ($existingSchedule) {
                return redirect()->back()
                    ->with('error', 'Đã tồn tại lịch làm việc cho bác sĩ này vào ngày ' . date('d/m/Y', strtotime($workingDate)) . ' từ ' . $timeStart . ' đến ' . $timeEnd)
                    ->withInput();
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
