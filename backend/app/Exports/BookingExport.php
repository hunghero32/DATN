<?php

namespace App\Exports;

use App\Models\Booking;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\Exportable;

class BookingExport implements FromCollection, WithHeadings, WithMapping
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
    $query = Booking::with(['guest', 'service', 'doctor', 'result'])
                    ->where('isDeleted', 0)
                    ->whereBetween('booking_date', [$this->start_date, $this->end_date]);

    if ($this->guest_phone) {
        $query->whereHas('guest', function ($q) {
            $q->where('guest_phone', 'like', '%' . $this->guest_phone . '%');
        });
    }

    return $query->get();
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
            'Chẩn Đoán',
            'Đơn Thuốc',
            'Ghi Chú',
        ];
    }

    public function map($booking): array
    {
        return [
            $booking->id,
            $booking->guest->guest_name ?? 'N/A',
            $booking->guest->gender ?? 'N/A',
            $booking->guest->birthday ?? 'N/A',
            $booking->guest->guest_phone ?? 'N/A',
            $booking->guest->guest_email ?? 'N/A',
            json_encode($booking->guest->address, JSON_UNESCAPED_UNICODE),  // Đảm bảo dữ liệu address hợp lệ
            $booking->doctor->doctor_name ?? 'N/A',
            $booking->service->service_name ?? 'N/A',
            $booking->booking_date,
            $booking->booking_time,
            $booking->result->diagnosis ?? 'Chưa cập nhật',
            $booking->result->prescription ?? 'Chưa cập nhật',
            $booking->notes ?? 'N/A',
        ];
    }
}
