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
            ->where('created_at', '<=', Carbon::now()->subMinutes(1))
            ->orderBy('created_at', 'asc')
            ->get();

        $updatedCount = 0;
        $canceledCount = 0;
        // Nhóm các booking theo service_id và thời gian
        $groupedBookings = $bookings->groupBy(function ($booking) {
            return $booking->service_id . '_' . $booking->booking_date . '_' . $booking->booking_time;
        });
        foreach ($groupedBookings as $group) {
            if ($group->isEmpty()) continue;

            // Chọn người đầu tiên (đặt sớm nhất)
            $firstBooking = $group->first();
            $firstBooking->update(['status' => 'confirmed']);
            $updatedCount++;

            // Lấy thông tin bác sĩ và khách hàng
            $doctor = Doctor::find($firstBooking->doctor_id);
            $guest = Guest::find($firstBooking->guest_id);

            if ($doctor && $guest) {
                $bookingDate = Carbon::parse($firstBooking->booking_date)->format('d/m/Y');
                $bookingTime = Carbon::parse($firstBooking->booking_time)->format('H:i');

                // Gửi thông báo cho bác sĩ
                $this->notificationService->sendNotification(
                    $doctor->user_id,
                    "Lịch hẹn {$firstBooking->service->services_name} đã xác nhận",
                    "Lịch hẹn với {$guest->guest_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được xác nhận.",
                    "booking",
                    $firstBooking->id
                );

                // Gửi thông báo cho khách hàng
                $this->notificationService->sendNotification(
                    $guest->user_id,
                    "Lịch hẹn {$firstBooking->service->services_name} đã xác nhận",
                    "Lịch hẹn của bạn với bác sĩ {$doctor->doctor_name} vào lúc {$bookingTime} ngày {$bookingDate} đã được xác nhận.",
                    "booking",
                    $firstBooking->id
                );
            }

            // Hủy tất cả các booking khác trong cùng nhóm
            foreach ($group->skip(1) as $booking) {
                $booking->update(['status' => 'canceled']);
                $canceledCount++;

                $guest = Guest::find($booking->guest_id);
                if ($guest) {
                    // Gửi thông báo cho khách hàng bị từ chối
                    $this->notificationService->sendNotification(
                        $guest->user_id,
                        "Lịch hẹn {$booking->service->services_name} bị hủy",
                        "Lịch hẹn của bạn vào lúc {$bookingTime} ngày {$bookingDate} đã bị hủy do hết chỗ.",
                        "booking",
                        $booking->id
                    );
                }
            }
        }

        $this->info("Đã cập nhật: $updatedCount booking -> confirmed");
        $this->info("Đã hủy: $canceledCount booking -> canceled");
    }
}
