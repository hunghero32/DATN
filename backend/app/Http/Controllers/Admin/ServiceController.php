<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Services;
use Illuminate\Http\Request;
use App\Models\Specialty;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $data = Services::join('specialties', 'specialties.id', 'services.specialty_id')
            ->select('services.*', 'specialties.name as specialty_name')
            ->where('services.isDeleted', 0)
            ->orderBy('services.created_at', 'desc')
            ->paginate($perPage);

        $specialties = Specialty::where('isDeleted', 0)->pluck('name', 'id')->toArray();
        $statuses = config('app.statuses');

        return view('admin.pages.services.index', compact('data', 'specialties', 'statuses'));
    }

    public function search(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->input('search');
        $status = $request->input('status');
        $specialty_id = $request->input('specialty_id');
        $price_from = $request->input('price_from');
        $price_to = $request->input('price_to');

        $query = Services::join('specialties', 'specialties.id', 'services.specialty_id')
            ->select('services.*', 'specialties.name as specialty_name')
            ->where('services.isDeleted', 0)
            ->where('specialties.isDeleted', 0);

        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('services.services_name', 'like', '%' . $search . '%')
                  ->orWhere('services.description', 'like', '%' . $search . '%')
                  ->orWhere('specialties.name', 'like', '%' . $search . '%');
            });
        }

        if ($status !== null && $status !== '') {
            $query->where('services.status', $status);
        }

        if (!empty($specialty_id)) {
            $query->where('services.specialty_id', $specialty_id);
        }

        if (!empty($price_from)) {
            $query->where('services.price', '>=', $price_from);
        }

        if (!empty($price_to)) {
            $query->where('services.price', '<=', $price_to);
        }

        $data = $query->orderBy('services.created_at', 'desc')
                     ->paginate($perPage);
        $data->appends($request->all());

        $specialties = Specialty::where('isDeleted', 0)->pluck('name', 'id')->toArray();
        $statuses = config('app.statuses');

        return view('admin.pages.services.index', compact('data', 'specialties', 'statuses'));
    }

    public function create()
    {
        return view(
            'admin.pages.services.create',
            [
                'specialties' => Specialty::pluck('name', 'id')->toArray(),
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
            'specialty_id'    => 'required|exists:specialties,id',
            'image'           => 'required|image|mimes:jpg,jpeg,png,gif|max:2048'
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
            'specialty_id.required'   => 'Chuyên khoa không được để trống.',
            'specialty_id.exists'     => 'Chuyên khoa không hợp lệ.',
            'image.image'             => 'File tải lên phải là hình ảnh.',
            'image.mimes'             => 'Ảnh phải có định dạng jpg, jpeg, png hoặc gif.',
            'image.max'               => 'Ảnh không được lớn hơn 2MB.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Lấy dữ liệu hợp lệ và thêm giá trị mặc định cho status
        $validatedData = $validator->validated();
        $validatedData['status'] = $request->has('status'); // Gán giá trị mặc định

        if($request->has('image')){
            $image=$request->file('image')->store('services', 'public');
            $validatedData['image'] =  $image;
        }

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
            ]
        );
    }

    public function update(Request $request, $id)
    {
        $service = Services::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'services_name'   => 'required|string|max:255',
            'description'     => 'nullable|string',
            'price'           => 'required|numeric|min:0',
            'duration'        => 'required|integer|min:1',
            'specialty_id'    => 'required|exists:specialties,id',
            'image'           => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048'
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
            'specialty_id.required'   => 'Chuyên khoa không được để trống.',
            'specialty_id.exists'     => 'Chuyên khoa không hợp lệ.',
            'image.image'             => 'File tải lên phải là hình ảnh.',
            'image.mimes'             => 'Ảnh phải có định dạng jpg, jpeg, png hoặc gif.',
            'image.max'               => 'Ảnh không được lớn hơn 2MB.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Lấy dữ liệu hợp lệ
        $validatedData = $validator->validated();

        // Keep existing status if not changed, otherwise update to new status
        $validatedData['status'] = $request->has('status') ? $request->status : $service->status;

        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu tồn tại
            if ($service->image && Storage::disk('public')->exists($service->image)) {
                Storage::disk('public')->delete($service->image);
            }

            $image = $request->file('image')->store('services', 'public');
            $validatedData['image'] = $image;
        }

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
    public function updateStatus(Request $request, $id)
{
    try {
        $service = Services::findOrFail($id);
        $service->status = $request->status;
        $service->save();

        return redirect()->back()->with('success', 'Cập nhật trạng thái thành công');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Có lỗi xảy ra khi cập nhật trạng thái');
    }
}
}
