<?php 
namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;
use Kreait\Firebase\Database;
use Illuminate\Support\Facades\Log;

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

            // !!!!! ĐẢM BẢO DÙNG FACTORY ĐƠN GIẢN !!!!!
            $factory = (new Factory)
                ->withServiceAccount($serviceAccountPath)
                ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));
            Log::info("Firebase Factory created with default HTTP client (simple init).");

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
        // Kiểm tra database trước khi sử dụng
        if (!$this->database) {
            Log::error('Firebase Database not initialized in NotificationService. Cannot send real-time notification.');
            // Không cần return ở đây nếu bạn vẫn muốn thử gửi FCM
            // return;
        }

        // Kiểm tra messaging trước khi sử dụng
        if (!$this->messaging) {
             Log::error('Firebase Messaging not initialized in NotificationService. Cannot send FCM notification.');
             // Không cần return ở đây nếu bạn vẫn muốn thử gửi RTDB
            // return;
        }


        $user = User::find($user_id);
        if (!$user) {
             Log::warning('User not found for notification ID: ' . $user_id); // Thêm log
            return; // Thoát nếu không tìm thấy user
        }

        // Lưu vào bảng notifications (Nên đặt trong try...catch riêng nếu cần)
        try {
            $dbNotification = Notification::create([
                'user_id' => $user_id,
                'booking_id' => $booking_id,
                'title' => $title,
                'content' => $content,
                'type' => $type,
            ]);
            Log::info('Notification saved to DB for user ID: ' . $user_id);
        } catch (\Exception $e) {
             Log::error("Error saving notification to DB for user ID {$user_id}: " . $e->getMessage());
             // Có thể quyết định có tiếp tục gửi Firebase không nếu lưu DB lỗi
        }


        // Gửi lên Firebase Realtime Database
        if ($this->database) {
            $firebasePath = null;
            $isDoctor = false; // Biến cờ để kiểm tra

            // Kiểm tra xem user có phải là doctor không và lấy doctor_id
            if ($user->role === 'doctor') {
                // Cố gắng lấy bản ghi doctor liên kết với user
                $doctorRecord = $user->doctor()->first(); // Lấy bản ghi Doctor model
                if ($doctorRecord) {
                    $doctorId = $doctorRecord->id; // ID từ bảng doctors
                    $firebasePath = 'notifications/' . $doctorId;
                    $isDoctor = true;
                    Log::info("Targeting DOCTOR Firebase path: " . $firebasePath . " (User ID: " . $user_id . ", Doctor ID: " . $doctorId . ")");
                } else {
                    Log::warning("User ID " . $user_id . " has role 'doctor' but no associated doctor record found.");
                     // Quyết định xử lý tiếp theo: có thể gửi vào client_notifications hoặc bỏ qua
                    // Tạm thời gửi vào client_notifications để không mất thông báo
                    $firebasePath = 'client_notifications/' . $user_id;
                    Log::info("Fallback: Targeting CLIENT Firebase path for doctor role without doctor record: " . $firebasePath);
                }
            }

            // Nếu không phải là doctor (hoặc fallback ở trên), gửi vào client_notifications
            if (!$isDoctor) {
                 $firebasePath = 'client_notifications/' . $user_id; // Gửi vào client_notifications/{userId}
                 Log::info("Targeting CLIENT Firebase path: " . $firebasePath . " (User ID: " . $user_id . ")");
            }


            if ($firebasePath) { // Chỉ gửi nếu có đường dẫn hợp lệ
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
                     Log::debug("Pushing to Firebase path '{$firebasePath}': " . json_encode($notificationData));
                    $reference->push($notificationData);
                     Log::info("Successfully pushed notification to Firebase path: " . $firebasePath);
                } catch (\Exception $e) {
                    // Ghi log lỗi cụ thể hơn
                     Log::error("Error pushing notification to Firebase path {$firebasePath}: " . $e->getMessage(), ['exception' => $e]);
                }
            } else {
                 Log::warning("Could not determine Firebase RTDB path for user ID: " . $user_id);
            }
        } else {
            // Đã log lỗi ở đầu hàm
        }


        // Gửi Firebase Notification (FCM) nếu có token
        // Thêm kiểm tra $this->messaging ở đây
        if ($this->messaging && $user->firebase_token) {
            try {
                 Log::info("Attempting to send FCM to user ID: " . $user_id . " with token: " . substr($user->firebase_token, 0, 10) . "..."); // Log thêm
                $message = CloudMessage::withTarget('token', $user->firebase_token)
                    ->withNotification(FirebaseNotification::create($title, $content))
                    ->withData(['booking_id' => (string)$booking_id, 'type' => $type]);

                $this->messaging->send($message);
                 Log::info("Successfully sent FCM to user ID: " . $user_id);
            } catch (\Kreait\Firebase\Exception\Messaging\NotFound $e) {
                 Log::error("FCM Token not found or invalid for user ID {$user_id}: " . $e->getMessage());
                 // Có thể xóa token này khỏi DB: $user->update(['firebase_token' => null]);
            } catch (\Exception $e) {
                 // Ghi log lỗi cụ thể hơn
                 Log::error("Error sending FCM to user ID {$user_id}: " . $e->getMessage(), ['exception' => $e]);
                 // Bỏ khối catch trống cũ
            }
        } else if (!$this->messaging) {
             // Đã log lỗi ở đầu hàm
        } else if (!$user->firebase_token) {
             Log::info("User ID {$user_id} does not have an FCM token. Skipping FCM.");
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