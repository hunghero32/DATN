<?php

namespace App\Exports;

use App\Models\Booking;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithTitle;

class BookingExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithEvents,WithTitle
{
    use Exportable;

    protected $year, $month, $day, $start_date, $end_date, $guest_phone;

    public function __construct($year = null, $month = null, $day = null, $start_date = null, $end_date = null, $guest_phone = null)
    {
        $this->year = $year;
        $this->month = $month;
        $this->day = $day;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->guest_phone = $guest_phone;
    }
     public function title(): string
    {
        return 'Danh sách khách hàng';
    }
    public function collection()
    {
        $query = Booking::with('guest')->where('isDeleted', 0);
    
        if ($this->year) {
            $query->whereYear('booking_date', $this->year);
        }
    
        if ($this->month) {
            $query->whereYear('booking_date', date('Y', strtotime($this->month)))
                  ->whereMonth('booking_date', date('m', strtotime($this->month)));
        }
    
        if ($this->day) {
            $query->whereDate('booking_date', $this->day);
        }
    
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
            'Phí bác sĩ',
            'Trạng thái khách hàng',
        ];
    }

    public function registerEvents(): array
{
    return [
        AfterSheet::class => function (AfterSheet $event) {
            $rows = $event->sheet->getDelegate()->getHighestRow(); 
            $totalServicePrice = 0;
            $totalDoctorFee = 0;

            for ($row = 2; $row <= $rows; $row++) {
                $servicePrice = $event->sheet->getDelegate()->getCell('O' . $row)->getValue(); 
                $doctorFee = $event->sheet->getDelegate()->getCell('P' . $row)->getValue();    
                $totalServicePrice += floatval($servicePrice);
                $totalDoctorFee += floatval($doctorFee);
            }

            $summaryRow = $rows + 2;
            $event->sheet->setCellValue('K' . $summaryRow, 'TỔNG CỘNG:');
            $event->sheet->setCellValue('O' . $summaryRow, $totalServicePrice);
            $event->sheet->setCellValue('P' . $summaryRow, $totalDoctorFee);
            
            $profit = $totalServicePrice - $totalDoctorFee;

            $styleRange = 'K' . $summaryRow . ':P' . $summaryRow;

            $event->sheet->getStyle($styleRange)->getFont()->setBold(true);
            $event->sheet->getStyle($styleRange)->getFill()
                ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                ->getStartColor()->setRGB('D9EDF7');
            $event->sheet->getStyle($styleRange)->getFont()
                ->getColor()->setRGB('FF0000');
            $event->sheet->setCellValue('K' . ($summaryRow + 2), 'LỢI NHUẬN:');
            $event->sheet->setCellValue('O' . ($summaryRow + 2), $profit);
            $profitStyleRange = 'K' . ($summaryRow + 2) . ':O' . ($summaryRow + 2);

            $event->sheet->getStyle($profitStyleRange)->getFont()->setBold(true);
            $event->sheet->getStyle($profitStyleRange)->getFill()
                ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                ->getStartColor()->setRGB('FFFF00');
            $event->sheet->getStyle($profitStyleRange)->getFont()
                ->getColor()->setRGB('FF0000');
        },
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
            $booking->doctor_fee,
            $status ?? 'N/A',
        ];
    }
}
