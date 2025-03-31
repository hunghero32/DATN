<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Services\NotificationService;
use App\Models\Doctor;
use App\Models\Guest;
use Carbon\Carbon;

class AutoUpdateBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:autoupdate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tự động cập nhật trạng thái booking theo thời gian';

    private $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }
    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Lấy danh sách booking cần cập nhật
        $bookings = Booking::where('status', 'pending')
            ->where('created_at', '<=', Carbon::now()->subMinutes(30))
            ->get();

        $updatedCount = 0;

        foreach ($bookings as $booking) {
            $booking->update(['status' => 'confirmed']);
            $updatedCount++;

            // Lấy thông tin bác sĩ và khách hàng
            $doctor = Doctor::find($booking->doctor_id);
            $guest = Guest::find($booking->guest_id);

            if (!$doctor || !$guest) continue;
            $bookingDate = Carbon::parse($booking->booking_date)->format('d/m/Y');
            $bookingTime = Carbon::parse($booking->booking_time)->format('H:i');
            // Gửi thông báo cho bác sĩ
            $this->notificationService->sendNotification(
                $doctor->user_id,
                "Lịch hẹn {$booking->service->services_name} đã xác nhận",
                "Lịch hẹn với {$guest->guest_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được tự động xác nhận.",
                "booking",
                $booking->id
            );

            // Gửi thông báo cho khách hàng
            $this->notificationService->sendNotification(
                $guest->user_id,
                "Lịch hẹn {$booking->service->services_name} đã xác nhận",
                "Lịch hẹn của bạn với bác sĩ {$doctor->doctor_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được tự động xác nhận.",
                "booking",
                $booking->id
            );
        }

        $this->info("Đã cập nhật: $updatedCount booking từ pending -> confirmed");
    }
}
