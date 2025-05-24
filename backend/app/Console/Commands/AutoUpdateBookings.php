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
        $bookings = $this->getPendingBookings(); // Lấy danh sách các booking đang chờ xác nhận

        $updatedCount = 0;
        $canceledCount = 0;
        $invoiceCount = 0;
        $notificationCount = 0;

        $groupedByDoctor = $bookings->groupBy('doctor_id'); // Nhóm các booking theo doctor_id

        foreach ($groupedByDoctor as $doctorId => $bookingsForDoctor) {
            // Xử lý kiểm tra chồng lấn thời gian và cập nhật trạng thái
            [$confirmed, $canceled, $invoices, $notifications] = $this->processBookingsWithOverlap($bookingsForDoctor);
            $updatedCount += $confirmed;
            $canceledCount += $canceled;
            $invoiceCount += $invoices;
            $notificationCount += $notifications;
        }

        $this->info("Đã cập nhật: $updatedCount booking -> confirmed");
        $this->info("Đã hủy: $canceledCount booking -> canceled");
        $this->info("Đã tạo: $invoiceCount hóa đơn");
        $this->info("Đã gửi: $notificationCount thông báo");
    }

    private function getPendingBookings() // Lấy danh sách các booking
    {
        return Booking::where('status', 'pending')
            ->where('created_at', '<=', Carbon::now()->subMinutes(1))
            ->with('service') // eager load
            ->orderBy('created_at', 'asc')
            ->get();
    }

    private function processBookingsWithOverlap($bookings)
    {
        $confirmed = 0;
        $canceled = 0;
        $invoices = 0; 
        $notifications = 0;
        $schedule = []; // Danh sách thời gian đã được xác nhận

        $sorted = $bookings->sortBy('created_at'); // Ưu tiên xử lý booking được tạo sớm hơn
        
        // Duyệt qua từng booking
        foreach ($sorted as $booking) {
            $start = Carbon::parse("{$booking->booking_date} {$booking->booking_time}");
            $duration = $booking->service->duration ?? 0;
            $end = $start->copy()->addMinutes($duration);

            $isOverlap = false; // Kiểm tra xem booking có chồng lịch không

            // Kiểm tra thời gian có chồng lấn
            foreach ($schedule as [$s, $e]) {
                if ($start->lt($e) && $end->gt($s)) {
                    $isOverlap = true;
                    break;
                }
            }

            if (!$isOverlap) {
                $result = $this->confirmBooking($booking);
                $schedule[] = [$start, $end];
                $confirmed++;
                $invoices += $result['invoices'];
                $notifications += $result['notifications'];
            } else {
                $result = $this->cancelBooking($booking);
                $canceled++;
                $notifications += $result['notifications'];
            }
        }

        return [$confirmed, $canceled, $invoices, $notifications];
    }

    private function confirmBooking($booking)
    {
        $booking->update(['status' => 'confirmed']);

        $this->createMedicalRecordForBooking($booking);
        $invoice = $this->createInvoiceForBooking($booking);
        $notifCount = $this->sendConfirmationNotifications($booking);

        return [
            'invoices' => $invoice ? 1 : 0,
            'notifications' => $notifCount
        ];
    }

    private function cancelBooking($booking) 
    {
        $booking->update(['status' => 'canceled']);
        $notifCount = 0;

        $guest = optional(Guest::find($booking->guest_id));
        if ($guest->exists) {
            $date = Carbon::parse($booking->booking_date)->format('d/m/Y');
            $time = Carbon::parse($booking->booking_time)->format('H:i');

            $this->notificationService->sendNotification(
                $guest->user_id,
                "Lịch hẹn {$booking->service->services_name} đã bị hủy",
                "Lịch hẹn của bạn vào lúc {$time} ngày {$date} đã bị hủy do hết chỗ.",
                "booking",
                $booking->id
            );
            $notifCount++;
        }

        return [
            'notifications' => $notifCount
        ];
    }

    private function createInvoiceForBooking($booking)
    {
        // Check if invoice already exists for this booking
        $existingInvoice = InvoiceDetail::where('booking_id', $booking->id)->first();
        if ($existingInvoice) {
            return Invoice::find($existingInvoice->invoice_id);
        }

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
            'status' => 'unpaid',
        ]);

        InvoiceDetail::create([
            'invoice_id' => $invoice->id,
            'booking_id' => $booking->id,
        ]);

        return $invoice;
    }

    private function createMedicalRecordForBooking($booking)
    {
        $exists = MedicalRecord::where('guest_id', $booking->guest_id)->exists();
        if ($exists) return;

        MedicalRecord::create([
            'guest_id' => $booking->guest_id,
            'BHYT' => null,
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
        $notifCount = 0;
        $doctor = optional(Doctor::find($booking->doctor_id));
        $guest = optional(Guest::find($booking->guest_id));
        $date = Carbon::parse($booking->booking_date)->format('d/m/Y');
        $time = Carbon::parse($booking->booking_time)->format('H:i');

        if ($doctor) {
            $this->notificationService->sendNotification(
                $doctor->user_id,
                "Lịch hẹn {$booking->service->services_name} đã xác nhận tự động",
                "Lịch hẹn với {$guest->guest_name} vào lúc {$time} ngày {$date} đã được xác nhận tự động.",
                "booking",
                $booking->id
            );
            $notifCount++;
        }

        if ($guest) {
            $this->notificationService->sendNotification(
                $guest->user_id,
                "Lịch hẹn {$booking->service->services_name} đã xác nhận tự động",
                "Lịch hẹn của bạn với bác sĩ {$doctor->doctor_name} vào lúc {$time} ngày {$date} đã được xác nhận tự động.",
                "booking",
                $booking->id
            );
            $notifCount++;
        }

        return $notifCount;
    }
}
