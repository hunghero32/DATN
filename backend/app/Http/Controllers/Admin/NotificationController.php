<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->input('search');
        $type = $request->input('type');
        $isRead = $request->input('is_read');

        $query = Notification::query();

        if (!empty($search)) {
            $query->where('title', 'like', "%$search%")
                  ->orWhere('content', 'like', "%$search%");
        }
        
        if (!empty($type)) {
            $query->where('type', $type);
        }
        
        if (!is_null($isRead)) {
            $query->where('is_read', $isRead);
        }

        $data = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return view('admin.pages.notifications.index', compact('data'));
    }

    public function show($id)
    {
        $data = Notification::with(['user', 'booking'])->findOrFail($id);
        return view('admin.pages.notifications.show', compact('data'));
    }

    public function create()
    {
        $users = User::all(); // Lấy tất cả người dùng
        $bookings = Booking::all();
        return view('admin.pages.notifications.create', compact('users','bookings'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'booking_id' => 'nullable|exists:bookings,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|string|max:50',
            'is_read' => 'required|boolean',
        ]);

        Notification::create($request->all());

        return redirect()->route('admin.notifications.index')->with('success', 'Thông báo đã được tạo!');
    }

    public function edit($id)
    {
        $notification = Notification::findOrFail($id);
        $users = User::all(); // Lấy danh sách người dùng
        $bookings = Booking::all();
        return view('admin.pages.notifications.edit', compact('notification','users','bookings'));
    }

    public function update(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'booking_id' => 'nullable|exists:bookings,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|string|max:50',
            'is_read' => 'required|boolean',
        ]);

        $notification->update($request->all());

        return redirect()->route('admin.notifications.index')->with('success', 'Cập nhật thông báo thành công!');
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return redirect()->route('admin.notifications.index')->with('success', 'Thông báo đã bị xóa!');
    }
}
