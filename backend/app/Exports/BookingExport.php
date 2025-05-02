<?php

namespace App\Exports;

use App\Models\Booking;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class BookingExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    use Exportable;

    protected $start_date;
    protected $end_date;
    protected $guest_phone;

    public function __construct($start_date, $end_date, $guest_phone = null)
{
    $this->start_date = $start_date;
    $this->end_date = $end_date;
    $this->guest_phone = $guest_phone;
}

public function collection()
{
    $query = Booking::with(['guest', 'invoiceDetails.invoice'])
                    ->where('isDeleted', 0);
                    // ->whereBetween('booking_date', [$this->start_date, $this->end_date]);
    if ($this->start_date && $this->end_date) {
        $query->whereBetween('booking_date', [$this->start_date, $this->end_date]);
        }                
    if ($this->guest_phone) {
        $query->whereHas('guest', function ($q) {
            $q->where('guest_phone', 'like', '%' . $this->guest_phone . '%');
        });
    }

    return $query->get();
}

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]], 
        ];
    }

    public function headings(): array
    {
        return [
            'Mã Đặt Lịch',
            'Tên Bệnh Nhân',
            'Giới Tính',
            'Ngày Sinh',
            'Số Điện Thoại',
            'Email',
            'Địa Chỉ',
            'Tên Bác Sĩ',
            'Dịch Vụ',
            'Ngày Đặt',
            'Giờ Đặt',
            'Giá gốc dịch vụ',
            'Giảm Giá',
            'Thuế',
            'Tổng Tiền',
            'Trạng Thái',
        ];
    }

    public function map($booking): array
    {
        $invoice = optional($booking->invoiceDetails->first())->invoice;
        $statusMap = [
            'unpaid' => 'Chưa thanh toán',
            'paid' => 'Đã thanh toán',
            'pending' => 'Chờ xử lý',
            'cancelled' => 'Đã hủy',
        ];
        if (!$invoice) {
            $status = 'Chưa lên hóa đơn';
        } else {
        $status = $statusMap[$invoice->status] ?? 'N/A';
        }
        return [
            $booking->id,
            $booking->guest->guest_name ?? 'N/A',
            $booking->guest->gender ?? 'N/A',
            $booking->guest->birthday ?? 'N/A',
            $booking->guest->guest_phone ?? 'N/A',
            $booking->guest->guest_email ?? 'N/A',
            json_encode($booking->guest->address, JSON_UNESCAPED_UNICODE),  // addresss để array
            // $booking->guest->address ?? 'N/A',
            $booking->doctor_name ?? 'N/A',
            $booking->service_name ?? 'N/A',
            $booking->booking_date,
            $booking->booking_time,
            $booking->service_price,
            $invoice->discount ?? 'N/A',
            $invoice->tax ?? 'N/A',
            $invoice->total_amount ?? 'N/A',
            $status ?? 'N/A',
        ];
    }
}
