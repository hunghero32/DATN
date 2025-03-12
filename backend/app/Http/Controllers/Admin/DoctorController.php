<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\FilterTrait;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller

{
    use FilterTrait;
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $data = Doctor::join('specialties', 'doctors.specialty_id', '=', 'specialties.id')
            ->select('doctors.*', 'specialties.name as specialty_name')
            ->where('doctors.isDeleted', 0)
            ->orderBy('doctors.created_at', 'desc')
            ->paginate($perPage);

        $statuses = [
            '' => 'Tất cả trạng thái',
            '0' => 'Chưa phê duyệt',
            '1' => 'Đã phê duyệt'
        ];

        return view('admin.pages.doctor.index', compact('data', 'statuses'));
    }

    public function search(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $exp = $request->input('exp');
        $search = $request->input('search');
        $approve = $request->input('approve'); // Changed from 'status' to 'approve'

        $query = Doctor::join('specialties', 'doctors.specialty_id', '=', 'specialties.id')
            ->select('doctors.*', 'specialties.name as specialty_name')
            ->where('doctors.isDeleted', 0);

        if (!empty($exp) && $exp !== 'all') {
            if ($exp === '0-5') {
                $query->whereBetween('exp', [0, 5]);
            } elseif ($exp === '6-10') {
                $query->whereBetween('exp', [6, 10]);
            } elseif ($exp === '10+') {
                $query->where('exp', '>', 10);
            }
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('doctor_name', 'like', '%' . $search . '%')
                    ->orWhere('doctor_bio', 'like', '%' . $search . '%');
            });
        }

        if ($approve !== null && $approve !== '') {
            $query->where('doctors.approve', (int)$approve);
        }

        $data = $query->orderBy('doctors.created_at', 'desc')
            ->paginate($perPage);
        $data->appends($request->all());

        $statuses = [
            '' => 'Tất cả trạng thái',
            '0' => 'Chưa phê duyệt',
            '1' => 'Đã phê duyệt'
        ];

        return view('admin.pages.doctor.index', compact('data', 'statuses'));
    }



    public function create()
    {
        return view('admin.pages.doctor.create', [

            'specialties' => Specialty::pluck('name', 'id')->toArray()
        ]);
    }


    public function store(Request $request)
    {
        // Create the validator instance
        $validator = Validator::make($request->all(), [
            'doctor_avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'doctor_name' => 'required|string|max:255',
            'doctor_bio' => 'nullable|string|max:1000',
            'exp' => 'required|integer|min:0|max:50', // Giới hạn kinh nghiệm từ 0-50 năm
            'file' => 'required|mimes:pdf,doc,docx,jpg,png|max:5120', // Hỗ trợ PDF, Word, hình ảnh, tối đa 5MB
            'specialty_id' => 'required|exists:specialties,id'
        ], [
            'doctor_avatar.required' => 'Ảnh đại diện là bắt buộc.',
            'doctor_avatar.image' => 'Ảnh đại diện phải là định dạng ảnh hợp lệ.',
            'doctor_avatar.mimes' => 'Ảnh chỉ được chọn các định dạng: jpeg, png, jpg, gif, svg.',
            'doctor_avatar.max' => 'Kích thước ảnh tối đa là 2MB.',
            'doctor_name.required' => 'Tên bác sĩ là bắt buộc.',
            'specialty_id.required' => 'Chuyên khoa là bắt buộc.',
            'specialty_id.exists' => 'Chuyên khoa không hợp lệ.',
            'exp.required' => 'Kinh nghiệm là bắt buộc.',
            'exp.integer' => 'Kinh nghiệm phải là số nguyên.',
            'exp.min' => 'Kinh nghiệm không thể nhỏ hơn 0 năm.',
            'exp.max' => 'Kinh nghiệm không thể lớn hơn 50 năm.',
            'file.required' => 'Tệp tải lên là bắt buộc.',
            'file.mimes' => 'Chỉ chấp nhận các định dạng: PDF, DOC, DOCX, JPG, PNG.',
            'file.max' => 'Kích thước tệp tối đa là 5MB.',

        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Proceed with storing the data
        $avatarPath = $request->file('doctor_avatar') ? $request->file('doctor_avatar')->store('avatars', 'public') : null;
        $filePath = $request->file('file') ? $request->file('file')->store('files', 'public') : null;

        Doctor::create([
            'user_id' => 1, // Lấy ID user đăng nhập thay vì gán cố định
            'doctor_avatar' => $avatarPath,
            'doctor_name' => $request->doctor_name,
            'doctor_bio' => $request->doctor_bio,
            'specialty_id' => $request->specialty_id,
            'exp' => $request->exp ?? 0,
            'file' => $filePath,
            'approve' => 0
        ]);

        return redirect()->route('admin.doctors.index')->with('success', 'Bác sĩ đã được tạo thành công!');
    }

    public function edit($id)
    {
        $data = Doctor::findOrFail($id);

        return view('admin.pages.doctor.edit', [
            'data' => $data,
            'specialties' => Specialty::pluck('name', 'id')  // Lấy danh sách chuyên khoa
        ]);
    }

    public function update(Request $request, $id)
    {
        // Tạo bộ kiểm tra dữ liệu
        $validator = Validator::make($request->all(), [
            'doctor_avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'doctor_name' => 'required|string|max:255',
            'doctor_bio' => 'nullable|string|max:1000',
            'exp' => 'required|integer|min:0|max:50', // Giới hạn kinh nghiệm từ 0-50 năm
            'file' => 'nullable|mimes:pdf,doc,docx,jpg,png|max:5120', // Hỗ trợ PDF, Word, hình ảnh, tối đa 5MB
            'specialty_id' => 'required|exists:specialties,id'
        ], [
            'doctor_avatar.required' => 'Ảnh đại diện là bắt buộc.',
            'doctor_avatar.image' => 'Ảnh đại diện phải là định dạng ảnh hợp lệ.',
            'doctor_avatar.mimes' => 'Ảnh chỉ được chọn các định dạng: jpeg, png, jpg, gif, svg.',
            'doctor_avatar.max' => 'Kích thước ảnh tối đa là 2MB.',
            'doctor_name.required' => 'Tên bác sĩ là bắt buộc.',
            'specialty_id.required' => 'Chuyên khoa là bắt buộc.',
            'specialty_id.exists' => 'Chuyên khoa không hợp lệ.',
            'exp.required' => 'Kinh nghiệm là bắt buộc.',
            'exp.integer' => 'Kinh nghiệm phải là số nguyên.',
            'exp.min' => 'Kinh nghiệm không thể nhỏ hơn 0 năm.',
            'exp.max' => 'Kinh nghiệm không thể lớn hơn 50 năm.',
            'file.required' => 'Tệp tải lên là bắt buộc.',
            'file.mimes' => 'Chỉ chấp nhận các định dạng: PDF, DOC, DOCX, JPG, PNG.',
            'file.max' => 'Kích thước tệp tối đa là 5MB.'
        ]);

        // Nếu validate thất bại, quay lại với lỗi
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Tìm bác sĩ theo ID
        $doctor = Doctor::findOrFail($id);

        // Xử lý ảnh đại diện nếu có upload mới
        if ($request->hasFile('doctor_avatar')) {
            // Xóa ảnh cũ (nếu có)
            if ($doctor->doctor_avatar) {
                Storage::disk('public')->delete($doctor->doctor_avatar);
            }
            $avatarPath = $request->file('doctor_avatar')->store('avatars', 'public');
            $doctor->doctor_avatar = $avatarPath;
        }

        // Xử lý file upload (CV, chứng chỉ)
        if ($request->hasFile('file')) {
            // Xóa file cũ (nếu có)
            if ($doctor->file) {
                Storage::disk('public')->delete($doctor->file);
            }
            $filePath = $request->file('file')->store('files', 'public');
            $doctor->file = $filePath;
        }

        // Cập nhật thông tin bác sĩ
        $doctor->update([
            'doctor_name' => $request->doctor_name,
            'doctor_bio' => $request->doctor_bio,
            'specialty_id' => $request->specialty_id,
            'exp' => $request->exp ?? 0,
            'approve' => $request->has('approve'),
        ]);

        return redirect()->route('admin.doctors.index')->with('success', 'Chỉnh sửa bác sĩ thành công !');
    }

    public function destroy($id)
    {
        $doctor = Doctor::findOrFail($id); // Tìm bác sĩ theo ID

        if ($doctor->approve == 0) {
            // Nếu approve = 0, cho phép xóa mềm
            $doctor->update(['isDeleted' => 1]);
            return redirect()->route('admin.doctors.index')->with('success', 'Bạn đã xóa thành công');
        } else {
            // Nếu approve khác 0, không cho phép xóa
            return redirect()->route('admin.doctors.index')->with('error', 'Bạn không thể xóa bác sĩ này vì đã được phê duyệt.');
        }
    }


    public function updateStatus(Request $request, $id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $doctor->approve = $request->status;
            $doctor->save();

            return redirect()->back()->with('success', 'Cập nhật trạng thái thành công');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Có lỗi xảy ra khi cập nhật trạng thái');
        }
    }

}
