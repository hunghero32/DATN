<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Http\Requests\UpdateNotificationRequest;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with(['user', 'booking'])->paginate(10);
        return response()->json($notifications, 200);
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
}
