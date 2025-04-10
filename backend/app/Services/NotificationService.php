<?php 
namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;
use Kreait\Firebase\Database;

class NotificationService
{
    protected $messaging;
    protected $database;

    public function __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount(storage_path(env('FIREBASE_CREDENTIALS')))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->messaging = $factory->createMessaging();
        $this->database = $factory->createDatabase();
    }

    public function sendNotification($user_id, $title, $content, $type, $booking_id = null, $extraData = [])
    {
        $user = User::find($user_id);
        if (!$user) return;

        // Lưu vào bảng notifications
        $dbNotification = Notification::create([
            'user_id' => $user_id,
            'booking_id' => $booking_id,
            'title' => $title,
            'content' => $content,
            'type' => $type,
        ]);

        // Gửi lên Firebase Realtime Database
        $doctor = $user->doctor;
        if ($doctor && $doctor->id) {
            $doctorId = $doctor->id;
            try {
                $reference = $this->database->getReference('notifications/' . $doctorId);
                $reference->push([
                    'title'     => $title,
                    'message'   => $content,
                    'type'      => $type,
                    'timestamp' => round(microtime(true) * 1000),
                    'read'      => false,
                    'bookingId' => $booking_id,
                    'data'      => $extraData
                ]);
            } catch (\Exception $e) {
                
            }
        }

        // Gửi Firebase Notification nếu có token
        if ($user->firebase_token) {
            try {
                $message = CloudMessage::withTarget('token', $user->firebase_token)
                    ->withNotification(FirebaseNotification::create($title, $content))
                    ->withData(['booking_id' => (string)$booking_id, 'type' => $type]);

                $this->messaging->send($message);
            } catch (\Exception $e) {
                
            }
        }
    }
    /**
     * Gửi thông báo đến nhiều người dùng cùng lúc
     */
    public function sendNotificationToMultiple($user_ids, $title, $content, $type, $booking_id = null, $extraData = [])
    {
        foreach ($user_ids as $user_id) {
            $this->sendNotification($user_id, $title, $content, $type, $booking_id, $extraData);
        }
    }
}
