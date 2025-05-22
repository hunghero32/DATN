<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\DoctorService;
use App\Models\Services;

class DoctorServiceController extends Controller
{
    public function index()
    {
        try {
            $data = DoctorService::join('doctors', 'doctor_service.doctor_id', '=', 'doctors.id')
                ->join('services', 'doctor_service.service_id', '=', 'services.id')
                ->select('doctor_service.*', 'doctors.doctor_name', 'services.services_name')
                ->where('doctor_service.isDeleted', 0)
                ->orderBy('created_at', 'desc')
                ->paginate(10);
            return view('admin.pages.doctor_service.index', compact('data'));
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    // Add this new search method
    public function search(Request $request)
    {
        try {
            $query = DoctorService::join('doctors', 'doctor_service.doctor_id', '=', 'doctors.id')
                ->join('services', 'doctor_service.service_id', '=', 'services.id')
                ->select('doctor_service.*', 'doctors.doctor_name', 'services.services_name')
                ->where('doctor_service.isDeleted', 0);

            // Get the search term from the request
            $searchTerm = $request->input('search');

            // Apply search filter if search term exists
            if ($searchTerm) {
                $query->where(function($q) use ($searchTerm) {
                    $q->where('doctors.doctor_name', 'LIKE', '%' . $searchTerm . '%')
                      ->orWhere('services.services_name', 'LIKE', '%' . $searchTerm . '%');
                });
            }

            // Apply doctor filter if selected
            if ($request->filled('doctor_id') && $request->doctor_id != 'all') {
                $query->where('doctor_service.doctor_id', $request->doctor_id);
            }

            // Apply service filter if selected
            if ($request->filled('service_id') && $request->service_id != 'all') {
                $query->where('doctor_service.service_id', $request->service_id);
            }

            $data = $query->paginate(10);

            // Preserve search parameters in pagination
            $data->appends($request->all());

            return view('admin.pages.doctor_service.index', compact('data'));
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function create()
    {
        $doctors = Doctor::all();
        $services = Services::all();
        $servicePrices = Services::pluck('price', 'id')->toArray();
        return view('admin.pages.doctor_service.create', compact('doctors', 'services', 'servicePrices'));
    }

    public function store(Request $request)
    {
        // Đảm bảo các trường tiền tệ chỉ chứa giá trị số nguyên
        $request->merge([
            'service_price' => (int) preg_replace('/[^0-9]/', '', $request->service_price),
            'doctor_fee' => (int) preg_replace('/[^0-9]/', '', $request->doctor_fee),
            'fixed_amount' => $request->fixed_amount ? (int) preg_replace('/[^0-9]/', '', $request->fixed_amount) : null,
        ]);
        // dd(request()->all()); // Bỏ comment dòng này để kiểm tra dữ liệu
        try {
            $messages = [
                'doctor_id.required' => 'Vui lòng chọn bác sĩ',
                'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống',
                'service_id.required' => 'Vui lòng chọn dịch vụ',
                'service_id.exists' => 'Dịch vụ không tồn tại trong hệ thống',
                'fee_type.required' => 'Vui lòng chọn loại phí',
                'doctor_fee.required' => 'Vui lòng nhập phí bác sĩ',
                'percentage.max' => 'Tỷ lệ phần trăm không được vượt quá 70%',
                'fixed_amount.max' => 'Số tiền cố định không được vượt quá 70% giá dịch vụ',
            ];

            $service = Services::findOrFail($request->service_id);
            $servicePrice = $service->price;
            $maxAmount = round($servicePrice * 0.7); // 70% giá dịch vụ

            $request->validate([
                'doctor_id' => 'required|exists:doctors,id',
                'service_id' => 'required|exists:services,id',
                'fee_type' => 'required|in:percentage,fixed',
                'doctor_fee' => 'required|numeric',
                'percentage' => $request->fee_type == 'percentage' ? 'required|numeric|min:0|max:70' : '',
                'fixed_amount' => $request->fee_type == 'fixed' ? 'required|numeric|min:0|max:' . $maxAmount : '',
            ], $messages);

            // Kiểm tra thêm để đảm bảo phí bác sĩ không vượt quá 70% giá dịch vụ
            if ($request->doctor_fee > $maxAmount) {
                return back()->with('error', 'Phí bác sĩ không được vượt quá 70% giá dịch vụ (' . number_format($maxAmount, 0, ',', '.') . ' ₫)')->withInput();
            }

            // Kiểm tra xem bác sĩ đã được thêm dịch vụ này chưa
            $exists = DoctorService::where('doctor_id', $request->doctor_id)
                ->where('service_id', $request->service_id)
                ->exists();

            if ($exists) {
                return back()->with('error', 'Bác sĩ này đã được thêm dịch vụ này trước đó!');
            }

            DoctorService::create([
                'doctor_id' => $request->doctor_id,
                'service_id' => $request->service_id,
                'doctor_fee' => $request->doctor_fee,
                'note' => $request->note,
            ]);

            return redirect()->route('admin.doctor_service.index')
                           ->with('success', 'Thêm dịch vụ cho bác sĩ thành công');
        } catch (\Exception $e) {
            return back()->with('error',  $e->getMessage());
        }
    }

    public function edit($id)
    {
        $doctorService = DoctorService::findOrFail($id);
        $doctors = Doctor::all();
        $services = Services::all();
        $servicePrices = Services::pluck('price', 'id')->toArray();
        return view('admin.pages.doctor_service.edit', compact('doctorService', 'doctors', 'services', 'servicePrices'));
    }

    public function update(Request $request, $id)
    {
        // Đảm bảo các trường tiền tệ chỉ chứa giá trị số nguyên
        $request->merge([
            'service_price' => $request->service_price ? (int) preg_replace('/[^0-9]/', '', $request->service_price) : null,
            'doctor_fee' => $request->doctor_fee ? (int) preg_replace('/[^0-9]/', '', $request->doctor_fee) : null,
            'fixed_amount' => $request->fixed_amount ? (int) preg_replace('/[^0-9]/', '', $request->fixed_amount) : null,
        ]);

        try {
            $service = Services::findOrFail($request->service_id);
            $servicePrice = $service->price;
            $maxAmount = round($servicePrice * 0.7); // 70% giá dịch vụ

            $messages = [
                'doctor_id.required' => 'Vui lòng chọn bác sĩ',
                'doctor_id.exists' => 'Bác sĩ không tồn tại trong hệ thống',
                'service_id.required' => 'Vui lòng chọn dịch vụ',
                'service_id.exists' => 'Dịch vụ không tồn tại trong hệ thống',
                'doctor_fee.required' => 'Vui lòng nhập phí bác sĩ',
                'doctor_fee.numeric' => 'Phí bác sĩ phải là số',
                'doctor_fee.max' => 'Phí bác sĩ không được vượt quá 70% giá dịch vụ',
                'note.required' => 'Vui lòng nhập ghi chú',
                'percentage.required' => 'Vui lòng nhập phần trăm',
                'percentage.max' => 'Tỷ lệ phần trăm không được vượt quá 70%',
                'fixed_amount.max' => 'Số tiền cố định không được vượt quá 70% giá dịch vụ',
            ];

            $request->validate([
                'doctor_id' => 'required|exists:doctors,id',
                'service_id' => 'required|exists:services,id',
                'doctor_fee' => 'required|numeric|max:' . $maxAmount,
                'note' => 'required|string',
                'percentage' => $request->fee_type == 'percentage' ? 'required|numeric|min:0|max:70' : '',
                'fixed_amount' => $request->fee_type == 'fixed' ? 'required|numeric|min:0|max:' . $maxAmount : '',
            ], $messages);

            $doctorService = DoctorService::findOrFail($id);

            // Chỉ kiểm tra trùng lặp nếu có thay đổi doctor_id hoặc service_id
            if ($doctorService->doctor_id != $request->doctor_id ||
                $doctorService->service_id != $request->service_id) {

                $exists = DoctorService::where('doctor_id', $request->doctor_id)
                    ->where('service_id', $request->service_id)
                    ->where('id', '!=', $id)
                    ->exists();

                if ($exists) {
                    return back()->with('error', 'Bác sĩ này đã được thêm dịch vụ này trước đó!')->withInput();
                }
            }

            // Nếu không có thay đổi hoặc không trùng lặp, tiến hành cập nhật
            $doctorService->update([
                'doctor_id' => $request->doctor_id,
                'service_id' => $request->service_id,
                'doctor_fee' => $request->doctor_fee,
                'note' => $request->note,
            ]);

            return redirect()->route('admin.doctor_service.index')
                            ->with('success', 'Cập nhật dịch vụ bác sĩ thành công');
        } catch (\Exception $e) {
            return back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage())->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $doctorService = DoctorService::findOrFail($id);
            $doctorService->update(['isDeleted' => 1]);
            return redirect()->route('admin.doctor_service.index')  // Make sure this matches your route name
                           ->with('success', 'Xóa dịch vụ bác sĩ thành công');
        } catch (\Exception $e) {
            return back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }
}
