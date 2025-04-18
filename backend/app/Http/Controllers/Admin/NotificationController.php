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
        $users = User::all();
        $roles = User::select('role')->distinct()->pluck('role')->toArray();
        $bookings = Booking::all();

        return view('admin.pages.notifications.create', compact('users', 'roles', 'bookings'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'recipient_type' => 'required|in:user,role',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|string|max:50',
            'is_read' => 'nullable|in:0,1',
        ]);

        $userIds = [];

        if ($request->recipient_type === 'user') {
            $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);
            $userIds[] = $request->user_id;
        } elseif ($request->recipient_type === 'role') {
            $request->validate([
                'role' => 'required|string',
            ]);
            $userIds = User::where('role', $request->role)->pluck('id')->toArray();
        }

        $isRead = $request->input('is_read', 0); 

        foreach ($userIds as $uid) {
            Notification::create([
                'user_id' => $uid,
                'booking_id' => $request->booking_id,
                'title' => $request->title,
                'content' => $request->content,
                'type' => $request->type,
                'is_read' => $isRead,
            ]);
        }

        return redirect()->route('admin.notifications.index')->with('success', 'Thông báo đã được gửi!');
    }
}
