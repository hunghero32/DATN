<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;
use App\Models\Guest;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->input('search');

        $query = MedicalRecord::with('guest');

        if (!empty($search)) {
            $query->whereHas('guest', function ($q) use ($search) {
                $q->where('guests.guest_name', 'like', "%$search%")  // Thêm bảng 'guests' vào tên cột
                  ->orWhere('guests.guest_phone', 'like', "%$search%");
            });
        }

        $data = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return view('admin.pages.medical_records.index', compact('data'));
    }

    public function show($id)
    {
        $record = MedicalRecord::with('guest')->findOrFail($id);
        return view('admin.pages.medical_records.show', compact('record'));
    }
    
    public function create()
    {
        $guests = Guest::all(); // Lấy toàn bộ danh sách khách hàng
    return view('admin.pages.medical_records.create', compact('guests'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'guest_id' => 'required|exists:guests,id',
            'BHYT' => 'nullable|string|max:50',
            'medical_condition' => 'required|string',
            'medications' => 'nullable|string',
            'allergies' => 'nullable|string',
            'family_history' => 'nullable|string',
            'treatment' => 'required|string',
            'note' => 'nullable|string',
        ]);

        MedicalRecord::create($request->all());

        return redirect()->route('admin.medical_records.index')->with('success', 'Hồ sơ bệnh án đã được tạo!');
    }

    public function edit($id)
    {
        $record = MedicalRecord::findOrFail($id);
        $guests = Guest::all(); // Lấy toàn bộ danh sách khách hàng
        return view('admin.pages.medical_records.edit', compact('record', 'guests'));
    }

    public function update(Request $request, $id)
    {
        $record = MedicalRecord::findOrFail($id);

        $request->validate([
            'guest_id' => 'required|exists:guests,id',
            'BHYT' => 'nullable|string|max:50',
            'medical_condition' => 'required|string',
            'medications' => 'nullable|string',
            'allergies' => 'nullable|string',
            'family_history' => 'nullable|string',
            'treatment' => 'required|string',
            'note' => 'nullable|string',
        ]);

        $record->update($request->all());

        return redirect()->route('admin.medical_records.index')->with('success', 'Cập nhật hồ sơ bệnh án thành công!');
    }

    public function destroy($id)
    {
        $record = MedicalRecord::findOrFail($id);
        $record->delete();

        return redirect()->route('admin.medical_records.index')->with('success', 'Hồ sơ bệnh án đã bị xóa!');
    }
}
