<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
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
        $data = Doctor::all();
        return view('admin.pages.doctor.index', compact('data'));
    }
    public function search(Request $request)
    {
        // Lấy dữ liệu từ request
        $exp = $request->input('exp');
        $search = $request->input('search');

        // Truy vấn danh sách bác sĩ
        $query = Doctor::query();

        // Lọc theo kinh nghiệm nếu có chọn
        if (!empty($exp)) {
            if ($exp === '0-5') {
                $query->whereBetween('exp', [0, 5]);
            } elseif ($exp === '6-10') {
                $query->whereBetween('exp', [6, 10]);
            } elseif ($exp === '10+') {
                $query->where('exp', '>', 10);
            }
        }
        // Lọc theo tên bác sĩ nếu có từ khóa tìm kiếm
        if (!empty($search)) {
            $query->where('doctor_name', 'like', '%' . $search . '%');
        }


        // Lấy danh sách bác sĩ sau khi lọc
        $data = $query->get();

        // Trả về view với dữ liệu đã lọc
        return view('admin.pages.doctor.index', compact('data'));
    }



    public function create()
    {
        return view('admin.pages.doctor.create', [
            'clinics' => Clinic::pluck('clinic_name', 'id')->toArray(),  // Đảm bảo là mảng
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
            'clinic_id' => $request->clinic_id,
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
            'clinics' => Clinic::pluck('clinic_name', 'id'), // Lấy danh sách phòng khám
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
            'clinic_id' => 'required|exists:clinics,id', // Kiểm tra ID có tồn tại trong DB không
            'specialty_id' => 'required|exists:specialties,id',
            'exp' => 'required|integer|min:0',
            'file' => 'nullable|mimes:pdf,doc,docx|max:5120', // Giới hạn file upload
            'approve' => 'required|in:0,1', // Chỉ nhận giá trị 0 hoặc 1
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
            'clinic_id' => $request->clinic_id,  // Đảm bảo giá trị ID hợp lệ
            'specialty_id' => $request->specialty_id,
            'exp' => $request->exp ?? 0,
            'approve' => $request->approve,
    ]);

    return redirect()->route('admin.doctors.index')->with('success', 'Doctor updated successfully!');
    }

    public function destroy($id)
    {
        $doctor = Doctor::findOrFail($id); // Tìm bác sĩ theo ID
        $doctor->delete(); // Xóa bản ghi

        return redirect()->route('admin.doctors.index')->with('success', 'Bạn đã xóa thành công');
    }
}
