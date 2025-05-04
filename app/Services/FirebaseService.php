<?php
namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class FirebaseService
{
    protected $messaging;

    public function __construct()
    {
        $firebase = (new Factory)->withServiceAccount(storage_path(env('FIREBASE_CREDENTIALS')));
        $this->messaging = $firebase->createMessaging();
    }

    public function sendNotification($token, $title, $body)
    {
        $message = CloudMessage::withTarget('token', $token)
            ->withNotification(Notification::create($title, $body));

        $this->messaging->send($message);
    }
}
