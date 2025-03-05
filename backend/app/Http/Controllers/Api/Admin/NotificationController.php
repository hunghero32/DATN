<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with(['user', 'booking'])->paginate(10);
        return response()->json($notifications, 200);
    }

    public function store(StoreNotificationRequest $request)
    {
        $data = $request->validated();
        $notification = Notification::create($data);
        return response()->json(['message' => 'Tạo thông báo thành công.', 'data' => $notification], 201);
    }

    public function show(Notification $notification)
    {
        $notification->load(['user', 'booking']); // Lấy dữ liệu liên quan
        return response()->json($notification, 200);
    }
    
    public function update(UpdateNotificationRequest $request, Notification $notification)
    {
        $data = $request->validated();
        $notification->update($data);
        return response()->json(['message' => 'Cập nhật thông báo thành công.', 'data' => $notification], 200);
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();
        return response()->json(['message' => 'Xóa thông báo thành công.'], 200);
    }
}
