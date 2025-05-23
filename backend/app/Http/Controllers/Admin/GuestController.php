<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Storage;

use App\Http\Requests\StoreGuestRequest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Guest;
use App\Models\User;
use App\Models\MedicalRecord;

class GuestController extends Controller
{
    public function index(Request $request)
    {
        $query = Guest::query();

        // Tìm kiếm theo tên, số điện thoại, địa chỉ
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('guest_name', 'like', '%' . $request->search . '%')
                    ->orWhere('guest_phone', 'like', '%' . $request->search . '%')
                    ->orWhere('address', 'like', '%' . $request->search . '%');
            });
        }

        // Lọc theo giới tính
        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        // Lọc theo tuổi
        if ($request->filled('age')) {
            $today = now();
            $age = [
                '18-25' => [$today->copy()->subYears(25), $today->copy()->subYears(18)],
                '26-35' => [$today->copy()->subYears(35), $today->copy()->subYears(26)],
                '36-50' => [$today->copy()->subYears(50), $today->copy()->subYears(36)],
                '50+'   => [$today->copy()->subYears(100), $today->copy()->subYears(50)],
            ];

            if (isset($age[$request->age])) {
                $query->whereBetween('birthday', $age[$request->age]);
            }
        }

        $guests = $query->paginate(10);

        return view('admin.pages.guests.index', compact('guests'));
    }





    public function create()
    {
        $users = User::all();
        return view('admin.pages.guests.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuestRequest $request)
    {
        //dd($request->all()); // Kiểm tra dữ liệu nhận được
        // Xử lý tệp tin (nếu có)
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('uploads', 'public');
        }
        $address = $request->address ? json_encode($request->address) : null;


        // Tạo mới khách mời
        $guest = Guest::create([
            'user_id' => $request->user_id,
            'guest_name' => $request->guest_name,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
            'guest_phone' => $request->guest_phone,
            'guest_email' => $request->guest_email,
            'address' => $request->address,
            'file' => $filePath,
        ]);

        return redirect()->route('admin.guests.index', compact('guest'))->with('success', 'Khách mời được thêm thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
            $guest = Guest::find($id); 
        // Lấy các hồ sơ y tế của khách mời, sắp xếp theo ngày khám giảm dần
    $records = MedicalRecord::where('guest_id', $id)
                            ->orderByDesc('created_at')
                            ->get();
        return view('admin.pages.guests.show', compact('guest','records'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $guest = Guest::findOrFail($id);
        $users = User::all();
        return view('admin.pages.guests.edit', compact('guest', 'users'));
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        $guests = Guest::find($id);
        $guests->delete();
        return redirect()->route('admin.guests.index')->with([
            'succers' => 'Ban da xoa thanh cong'
        ]);
    }

}
