<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;
use Kreait\Firebase\Database;
use Illuminate\Support\Facades\Log;
use App\Mail\NotificationEmail;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    protected $messaging;
    protected $database;

    public function __construct()
    {
        try {
            $serviceAccountPath = storage_path(env('FIREBASE_CREDENTIALS'));
            if (!file_exists($serviceAccountPath)) {
                Log::error('Firebase credentials file not found at: ' . $serviceAccountPath);
                throw new \Exception('Firebase credentials file not found.');
            }

            // Đảm bảo sử dụng Factory để khởi tạo Firebase
            $factory = (new Factory)
                ->withServiceAccount($serviceAccountPath)
                ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));
            Log::info("Firebase Factory created with default HTTP client.");

            $this->messaging = $factory->createMessaging();
            $this->database = $factory->createDatabase();
        } catch (\Exception $e) {
            Log::error('Failed to initialize Firebase: ' . $e->getMessage(), ['exception' => $e]);
            $this->messaging = null;
            $this->database = null;
        }
    }

    public function sendNotification($user_id, $title, $content, $type, $booking_id = null, $extraData = [])
    {
        // Kiểm tra sự tồn tại của Firebase Database và Messaging
        if (!$this->database || !$this->messaging) {
            Log::error('Firebase services not initialized.');
            return;
        }

        // Tìm user
        $user = User::find($user_id);
        if (!$user) {
            Log::warning('User not found for notification ID: ' . $user_id);
            return;
        }

        // Lưu thông báo vào DB
        try {
            $notification = Notification::create([
                'user_id' => $user_id,
                'booking_id' => $booking_id,
                'title' => $title,
                'content' => $content,
                'type' => $type,
            ]);
            Log::info('Notification saved to DB for user ID: ' . $user_id);
        } catch (\Exception $e) {
            Log::error("Error saving notification to DB for user ID {$user_id}: " . $e->getMessage());
        }

        // Gửi Firebase Realtime Database
        if ($this->database) {
            $firebasePath = $this->getFirebasePath($user, $user_id);

            if ($firebasePath) {
                try {
                    $reference = $this->database->getReference($firebasePath);
                    $notificationData = [
                        'title'     => $title,
                        'message'   => $content,
                        'type'      => $type,
                        'timestamp' => round(microtime(true) * 1000),
                        'read'      => false,
                        'bookingId' => $booking_id,
                        'data'      => $extraData
                    ];
                    $reference->push($notificationData);
                    Log::info("Successfully pushed notification to Firebase path: " . $firebasePath);
                } catch (\Exception $e) {
                    Log::error("Error pushing notification to Firebase path {$firebasePath}: " . $e->getMessage());
                }
            }
        }

        // Gửi Firebase Cloud Messaging (FCM)
        if ($this->messaging && $user->firebase_token) {
            try {
                Log::info("Attempting to send FCM to user ID: " . $user_id);
                $message = CloudMessage::withTarget('token', $user->firebase_token)
                    ->withNotification(FirebaseNotification::create($title, $content))
                    ->withData(['booking_id' => (string)$booking_id, 'type' => $type]);

                $this->messaging->send($message);
                Log::info("Successfully sent FCM to user ID: " . $user_id);
            } catch (\Kreait\Firebase\Exception\Messaging\NotFound $e) {
                Log::error("FCM Token not found or invalid for user ID {$user_id}: " . $e->getMessage());
            } catch (\Exception $e) {
                Log::error("Error sending FCM to user ID {$user_id}: " . $e->getMessage());
            }
        }

        // Gửi email nếu có email của user
        if ($user->email) {
            try {
                $url = env('FRONTEND_BOOKING_URL', 'http://localhost:3000/lichhen') ;


                Mail::to($user->email)->send(new NotificationEmail($title, $content, $url));
                Log::info('Email sent to user ID: ' . $user_id);
            } catch (\Exception $e) {
                Log::error("Error sending email to user ID {$user_id}: " . $e->getMessage());
            }
        }
    }

    // Helper function để lấy Firebase path
    private function getFirebasePath($user, $user_id)
    {
        $firebasePath = null;

        if ($user->role === 'doctor') {
            $doctorRecord = $user->doctor()->first();
            if ($doctorRecord) {
                $firebasePath = 'notifications/' . $doctorRecord->id;
            } else {
                $firebasePath = 'client_notifications/' . $user_id;
            }
        }

        if (!$firebasePath) {
            $firebasePath = 'client_notifications/' . $user_id;
        }

        return $firebasePath;
    }

    // Gửi thông báo đến nhiều người dùng cùng lúc
    public function sendNotificationToMultiple($user_ids, $title, $content, $type, $booking_id = null, $extraData = [])
    {
        foreach ($user_ids as $user_id) {
            $this->sendNotification($user_id, $title, $content, $type, $booking_id, $extraData);
        }
    }
}
