<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\MedicalRecord;
use App\Models\Guest;
use App\Services\NotificationService;
use Carbon\Carbon;

class AutoUpdateBookings extends Command
{
    protected $signature = 'bookings:autoupdate';
    protected $description = 'Tự động cập nhật trạng thái booking theo thời gian';

    private $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    public function handle()
    {
        $bookings = $this->getPendingBookings(); //Lấy danh sách booking đang chờ xác nhận

        $updatedCount = 0;
        $canceledCount = 0;

        $groupedBookings = $this->groupBookings($bookings); // Nhóm booking theo dịch vụ, ngày và giờ

        foreach ($groupedBookings as $group) {
            if ($group->isEmpty()) continue; // Nếu nhóm booking rỗng thì bỏ qua

            [$confirmed, $canceled] = $this->processBookingGroup($group); // Xử lý nhóm booking
            $updatedCount += $confirmed;
            $canceledCount += $canceled;
        }

        $this->info("Đã cập nhật: $updatedCount booking -> confirmed");
        $this->info("Đã hủy: $canceledCount booking -> canceled");
    }

    private function getPendingBookings()
    {
        return Booking::where('status', 'pending')
            ->where('created_at', '<=', Carbon::now()->subMinutes(1))
            ->orderBy('created_at', 'asc')
            ->get();
    }

    private function groupBookings($bookings)
    {
        return $bookings->groupBy(function ($booking) {
            return $booking->service_id . '_' . $booking->booking_date . '_' . $booking->booking_time;
        });
    }

    private function processBookingGroup($group)
    {
        $confirmedCount = 0;
        $canceledCount = 0;

        $firstBooking = $group->first();
        $this->confirmBooking($firstBooking); // Xác nhận booking đầu tiên
        $confirmedCount++;

        foreach ($group->skip(1) as $booking) {
            $this->cancelBooking($booking); // Hủy booking tiếp theo
            $canceledCount++;
        }

        return [$confirmedCount, $canceledCount];
    }

    private function confirmBooking($booking)
    {
        $booking->update(['status' => 'confirmed']);

        // Tạo hồ sơ bệnh án
        $this->createMedicalRecordForBooking($booking);

        // Tạo hóa đơn
        $this->createInvoiceForBooking($booking);

        // Gửi thông báo
        $this->sendConfirmationNotifications($booking);
    }

    private function cancelBooking($booking)
    {
        $booking->update(['status' => 'canceled']);

        $guest = optional(Guest::find($booking->guest_id));
        if ($guest->exists) {
            $date = Carbon::parse($booking->booking_date)->format('d/m/Y');
            $time = Carbon::parse($booking->booking_time)->format('H:i');

            $this->notificationService->sendNotification(
                $guest->user_id,
                "Lịch hẹn {$booking->service->services_name} bị hủy",
                "Lịch hẹn của bạn vào lúc {$time} ngày {$date} đã bị hủy do hết chỗ.",
                "booking",
                $booking->id
            );
        }
    }

    private function createInvoiceForBooking($booking)
    {
        $price = $booking->service->price ?? 0;
        $discount = 0;
        $taxPercent = 0;

        $taxable = max($price - $discount, 0);
        $tax = $taxable * ($taxPercent / 100);
        $total = $taxable + $tax;

        $invoice = Invoice::create([
            'total_amount' => $total,
            'discount' => $discount,
            'tax' => $tax,
        ]);

        InvoiceDetail::create([
            'invoice_id' => $invoice->id,
            'booking_id' => $booking->id,
        ]);

        return $invoice;
    }
    private function createMedicalRecordForBooking($booking)
    {
        // Kiểm tra đã có hồ sơ bệnh án chưa (1 booking chỉ tạo 1 lần)
        $exists = MedicalRecord::where('guest_id', $booking->guest_id)->exists();
        if ($exists) return;

        MedicalRecord::create([
            'guest_id' => $booking->guest_id,
            'BHYT' => null, // Có thể cập nhật sau nếu muốn
            'medical_condition' => null,
            'medications' => null,
            'allergies' => null,
            'family_history' => null,
            'treatment' => null,
            'note' => 'Lần khám đầu #' . $booking->id
        ]);
    }


    private function sendConfirmationNotifications($booking)
    {
        $doctor = optional(Doctor::find($booking->doctor_id));
        $guest = optional(Guest::find($booking->guest_id));
        $date = Carbon::parse($booking->booking_date)->format('d/m/Y');
        $time = Carbon::parse($booking->booking_time)->format('H:i');

        if ($doctor) {
            $this->notificationService->sendNotification(
                $doctor->user_id,
                "Lịch hẹn {$booking->service->services_name} đã xác nhận",
                "Lịch hẹn với {$guest->guest_name} vào lúc {$time} ngày {$date} đã được xác nhận.",
                "booking",
                $booking->id
            );
        }

        if ($guest) {
            $this->notificationService->sendNotification(
                $guest->user_id,
                "Lịch hẹn {$booking->service->services_name} đã xác nhận",
                "Lịch hẹn của bạn với bác sĩ {$doctor->doctor_name} vào lúc {$time} ngày {$date} đã được xác nhận.",
                "booking",
                $booking->id
            );
        }
    }
}
