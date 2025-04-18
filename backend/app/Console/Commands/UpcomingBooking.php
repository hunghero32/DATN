<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Models\Guest;
use App\Services\NotificationService;
use Carbon\Carbon;

class UpcomingBooking extends Command
{
    protected $signature = 'bookings:upcoming';
    protected $description = 'Gửi thông báo trước 30 phút khi sắp đến giờ khám';

    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    public function handle()
    {
        $now = Carbon::now();
        $target = $now->copy()->addMinutes(30);
    
        $bookings = Booking::where('status', 'confirmed')
            ->whereDate('booking_date', $target->toDateString())
            ->whereTime('booking_time', '>=', $target->format('H:i:00'))
            ->whereTime('booking_time', '<', $target->copy()->addMinute()->format('H:i:00'))
            ->get();
    
        $count = 0;
    
        foreach ($bookings as $booking) {
            $guest = $booking->guest;
    
            if (!$guest || !$guest->user_id) continue;
    
            $dateTime = Carbon::parse("{$booking->booking_date} {$booking->booking_time}");
            $formattedDate = $dateTime->format('d/m/Y');
            $formattedTime = $dateTime->format('H:i');
    
            $this->notificationService->sendNotification(
                $guest->user_id,
                'Sắp đến giờ khám!',
                "Bạn có lịch hẹn lúc $formattedTime ngày $formattedDate. Vui lòng chuẩn bị đến khám đúng giờ.",
                'reminder',
                $booking->id
            );
    
            $count++;
        }
    
        $this->info("Đã gửi thông báo cho $count khách.");
    }
    
}
