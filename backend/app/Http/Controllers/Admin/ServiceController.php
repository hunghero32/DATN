<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Services;
use Illuminate\Http\Request;
use App\Models\Specialty;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index()

    {
        $data = Services::join('specialties', 'specialties.id', 'services.specialty_id')
            ->join('categories', 'categories.id', 'services.category_id')
            ->select('services.*', 'categories.name as category_name', 'specialties.name as specialty_name')
            ->where('services.isDeleted', 0)
            ->get();
        return view('admin.pages.services.index', compact('data'));
    }
    public function create()
    {

        return view(
            'admin.pages.services.create',
            [
                'specialties' => Specialty::pluck('name', 'id')->toArray(),
                'categories' => Category::pluck('name', 'id')->toArray()
            ]
        );
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'services_name'   => 'required|string|max:255',
            'description'     => 'nullable|string',
            'price'           => 'required|numeric|min:0',
            'duration'        => 'required|integer|min:1',
            'category_id'     => 'required|exists:categories,id',
            'specialty_id'    => 'required|exists:specialties,id',
        ], [
            'services_name.required'  => 'Tên dịch vụ không được để trống.',
            'services_name.max'       => 'Tên dịch vụ tối đa 255 ký tự.',
            'description.string'      => 'Mô tả phải là một chuỗi ký tự.',
            'price.required'          => 'Giá không được để trống.',
            'price.numeric'           => 'Giá phải là một số.',
            'price.min'               => 'Giá không thể nhỏ hơn 0.',
            'duration.required'       => 'Thời gian thực hiện không được để trống.',
            'duration.integer'        => 'Thời gian thực hiện phải là số nguyên.',
            'duration.min'            => 'Thời gian thực hiện phải lớn hơn 0.',
            'category_id.required'    => 'Danh mục không được để trống.',
            'category_id.exists'      => 'Danh mục không hợp lệ.',
            'specialty_id.required'   => 'Chuyên khoa không được để trống.',
            'specialty_id.exists'     => 'Chuyên khoa không hợp lệ.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Lấy dữ liệu hợp lệ và thêm giá trị mặc định cho status
        $validatedData = $validator->validated();
        $validatedData['status'] = 0; // Gán giá trị mặc định

        // Lưu vào database
        Services::create($validatedData);

        return redirect()->route('admin.services.index')->with('success', 'Dịch vụ đã được thêm thành công!');
    }

    public function edit($id)
    {
        $data = Services::findOrFail($id);
        return view(
            'admin.pages.services.edit',
            [
                'data' => $data,
                'specialties' => Specialty::pluck('name', 'id')->toArray(),
                'categories' => Category::pluck('name', 'id')->toArray()
            ]
        );
    }
    public function update(Request $request, $id)
    {
        // Tìm dịch vụ theo ID
        $service = Services::findOrFail($id);

        // Quy tắc kiểm tra dữ liệu (validate)
        $validator = Validator::make($request->all(), [
            'services_name'   => 'required|string|max:255',
            'description'     => 'nullable|string',
            'price'           => 'required|numeric|min:0',
            'duration'        => 'required|integer|min:1',
            'category_id'     => 'required|exists:categories,id',
            'specialty_id'    => 'required|exists:specialties,id',
        ], [
            'services_name.required'  => 'Tên dịch vụ không được để trống.',
            'services_name.max'       => 'Tên dịch vụ tối đa 255 ký tự.',
            'description.string'      => 'Mô tả phải là một chuỗi ký tự.',
            'price.required'          => 'Giá không được để trống.',
            'price.numeric'           => 'Giá phải là một số.',
            'price.min'               => 'Giá không thể nhỏ hơn 0.',
            'duration.required'       => 'Thời gian thực hiện không được để trống.',
            'duration.integer'        => 'Thời gian thực hiện phải là số nguyên.',
            'duration.min'            => 'Thời gian thực hiện phải lớn hơn 0.',
            'category_id.required'    => 'Danh mục không được để trống.',
            'category_id.exists'      => 'Danh mục không hợp lệ.',
            'specialty_id.required'   => 'Chuyên khoa không được để trống.',
            'specialty_id.exists'     => 'Chuyên khoa không hợp lệ.',
        ]);

        // Nếu có lỗi validate
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Lấy dữ liệu hợp lệ và giữ nguyên status hiện có
        $validatedData = $validator->validated();
        $validatedData['status'] = $service->status; // Giữ nguyên giá trị status cũ

        // Cập nhật dữ liệu
        $service->update($validatedData);

        return redirect()->route('admin.services.index')->with('success', 'Dịch vụ đã được cập nhật thành công!');
    }

    public function delete($id)
    {
        $data = Services::findOrFail($id);
        if ($data->status == 0) {
            $data->isDeleted = 1;
            return redirect()->route('admin.services.index')->with('success', 'Xóa dịch vụ thành công!');
        } else {
            return redirect()->route('admin.services.index')->with('error', 'Không thể xóa dịch vụ đang hoạt động!');
        }
    }
}
