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

        $data = $query->paginate($perPage);
        $data->appends($request->all());

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
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required',
            'time_end' => 'required',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
            'status' => 'nullable|integer|in:0,1',
        ], [
            'doctor_id.required' => 'Vui lòng chọn bác sĩ.',
            'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống.',
            'time_start.required' => 'Vui lòng nhập giờ bắt đầu.',
            'time_end.required' => 'Vui lòng nhập giờ kết thúc.',
            'working_date.required' => 'Vui lòng chọn ngày làm việc.',
            'working_date.date' => 'Ngày làm việc không hợp lệ.',
            'max_patients.required' => 'Vui lòng nhập số lượng bệnh nhân tối đa.',
            'max_patients.integer' => 'Số lượng bệnh nhân phải là số nguyên.',
            'max_patients.min' => 'Số lượng bệnh nhân tối thiểu là 1.',
            'status.integer' => 'Trạng thái phải là số 0 hoặc 1.',
            'status.in' => 'Trạng thái không hợp lệ.',
        ]);

        // Nếu validation thất bại, trả về với lỗi
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Nếu validation thành công, tiếp tục xử lý
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
        // Tạo bộ kiểm tra dữ liệu
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'time_start' => 'required',
            'time_end' => 'required',
            'working_date' => 'required|date',
            'max_patients' => 'required|integer|min:1',
            'status' => 'nullable|integer|in:0,1',
        ], [
            'doctor_id.required' => 'Vui lòng chọn bác sĩ.',
            'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống.',
            'time_start.required' => 'Vui lòng nhập giờ bắt đầu.',
            'time_end.required' => 'Vui lòng nhập giờ kết thúc.',
            'working_date.required' => 'Vui lòng chọn ngày làm việc.',
            'working_date.date' => 'Ngày làm việc không hợp lệ.',
            'max_patients.required' => 'Vui lòng nhập số lượng bệnh nhân tối đa.',
            'max_patients.integer' => 'Số lượng bệnh nhân phải là số nguyên.',
            'max_patients.min' => 'Số lượng bệnh nhân tối thiểu là 1.',
            'status.integer' => 'Trạng thái phải là số 0 hoặc 1.',
            'status.in' => 'Trạng thái không hợp lệ.',
        ]);

        // Nếu validation thất bại, quay lại form với lỗi
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Tìm lịch làm việc cần cập nhật
        $schedule = Schedule::findOrFail($id);

        // Cập nhật thông tin lịch làm việc
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
