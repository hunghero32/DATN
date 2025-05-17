<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MedicalRecord;
use App\Models\Guest;
use App\Models\Result;

class MedicalRecordController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $records = MedicalRecord::with('guest')
            ->searchGuest($search)
            ->where('isDeleted', false)
            ->latest()
            ->paginate(10);

        return view('admin.pages.medical_records.index', compact('records', 'search'));
    }

    public function create()
    {
        $guests = Guest::pluck('guest_name', 'id');
        return view('admin.pages.medical_records.create', compact('guests'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'guest_id' => 'required|exists:guests,id',
            'BHYT' => 'nullable|string|max:50',
            'medical_condition' => 'nullable|string',
            'medications' => 'nullable|string',
            'allergies' => 'nullable|string',
            'family_history' => 'nullable|string',
            'treatment' => 'nullable|string',
            'note' => 'nullable|string',
        ]);

        MedicalRecord::create($request->all());

        return redirect()->route('admin.pages.medical_records.index')
            ->with('success', 'Tạo hồ sơ bệnh án thành công.');
    }

    public function show($id)
    {
        $record = MedicalRecord::with(['guest'])->findOrFail($id);

        // Lấy tất cả kết quả khám của guest
        $guestResults = Result::with('booking')
            ->where('guest_id', $record->guest_id)
            ->orderByDesc('created_at')
            ->get();

        // Truyền kèm $guestResults vào view
        return view('admin.pages.medical_records.show', compact('record', 'guestResults'));
    }

    public function edit($id)
    {
        $record = MedicalRecord::findOrFail($id);
        $guests = Guest::all();
        return view('admin.pages.medical_records.edit', compact('record', 'guests'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'guest_id' => 'required|exists:guests,id',
            'BHYT' => 'nullable|string|max:50',
            'medical_condition' => 'nullable|string',
            'medications' => 'nullable|string',
            'allergies' => 'nullable|string',
            'family_history' => 'nullable|string',
            'treatment' => 'nullable|string',
            'note' => 'nullable|string',
        ]);

        $record = MedicalRecord::findOrFail($id);
        $record->update($request->all());

        return redirect()->route('admin.pages.medical_records.index')
            ->with('success', 'Cập nhật hồ sơ bệnh án thành công.');
    }
}
