<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Notification;
use App\Models\User;
use App\Mail\NotificationEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Services\NotificationService;

class NotificationController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

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

        $data = $query->orderBy('id', 'desc')->paginate($perPage);

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

        $this->notificationService->sendNotificationToMultiple(
            $userIds,
            $request->title,
            $request->content,
            $request->type,
            $request->booking_id,
            [] // có thể truyền dữ liệu phụ nếu cần, ví dụ ['link' => '...']
        );
        return redirect()->route('admin.notifications.index')->with('success', 'Thông báo đã được gửi!');
    }
    public function readAndRedirect(Request $request, $id)
    {
        $notification = Notification::find($id);
    
        if ($notification && !$notification->is_read) {
            $notification->is_read = true;
            $notification->save();
        }
        $redirectUrl = $request->query('redirect', '/'); // Không cần phải giải mã thêm

        // Chuyển hướng đến URL đã được xử lý đúng
        return redirect($redirectUrl);
    }
}
