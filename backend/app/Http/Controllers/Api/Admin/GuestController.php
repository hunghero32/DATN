<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use Illuminate\Http\Request;
use App\Http\Requests\StoreGuestRequest;
use App\Http\Requests\UpdateGuestRequest;
use Illuminate\Support\Facades\Storage;

class GuestController extends Controller
{
    /**
     * Hiển thị danh sách khách.
     */
    public function index()
    {
        $guests = Guest::with('user')->paginate(10);
        return response()->json($guests, 200);
    }

    /**
     * Lưu thông tin khách mới.
     */
    public function store(StoreGuestRequest $request)
    {
        $data = $request->validated();

        // Xử lý file upload
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('guests', 'public');
        }

        $guest = Guest::create($data);
        return response()->json(['message' => 'Tạo khách thành công.', 'data' => $guest], 201);
    }

    /**
     * Hiển thị thông tin khách cụ thể.
     */
    public function show(Guest $guest)
    {
        return response()->json($guest->load('user'), 200);
    }

    /**
     * Cập nhật thông tin khách.
     */
    public function update(UpdateGuestRequest $request, Guest $guest)
    {
        $data = $request->validated();

        // Xử lý file mới
        if ($request->hasFile('file')) {
            // Xóa file cũ nếu có
            if ($guest->file) {
                Storage::disk('public')->delete($guest->file);
            }
            $data['file'] = $request->file('file')->store('guests', 'public');
        }

        $guest->update($data);
        return response()->json(['message' => 'Cập nhật khách thành công.', 'data' => $guest], 200);
    }

    /**
     * Xóa khách khỏi hệ thống.
     */
    public function destroy(Guest $guest)
    {
        // Xóa file nếu có
        if ($guest->file) {
            Storage::disk('public')->delete($guest->file);
        }

        $guest->delete();
        return response()->json(['message' => 'Xóa khách thành công.'], 200);
    }
}
