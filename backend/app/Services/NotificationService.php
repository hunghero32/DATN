<?php 
namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;

class NotificationService
{
    protected $messaging;

    public function __construct()
    {
        $firebase = (new Factory)->withServiceAccount(storage_path(env('FIREBASE_CREDENTIALS')));
        $this->messaging = $firebase->createMessaging();
    }

    public function sendNotification($user_id, $title, $content, $type, $booking_id = null)
    {
        $user = User::find($user_id);
        if (!$user) return;

        // Lưu vào bảng notifications
        Notification::create([
            'user_id' => $user_id,
            'booking_id' => $booking_id,
            'title' => $title,
            'content' => $content,
            'type' => $type,
        ]);

        // Gửi Firebase Notification nếu có token
        if ($user->firebase_token) {
            $message = CloudMessage::withTarget('token', $user->firebase_token)
                ->withNotification(FirebaseNotification::create($title, $content));

            $this->messaging->send($message);
        }
    }
    /**
     * Gửi thông báo đến nhiều người dùng cùng lúc
     */
    public function sendNotificationToMultiple($user_ids, $title, $content, $type, $booking_id = null)
    {
        foreach ($user_ids as $user_id) {
            $this->sendNotification($user_id, $title, $content, $type, $booking_id);
        }
    }
}
