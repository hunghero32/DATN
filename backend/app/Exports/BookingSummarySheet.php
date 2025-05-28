<?php

namespace App\Exports;

use App\Models\Booking;
// use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithTitle;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class BookingSummarySheet implements FromArray, WithEvents, WithStyles,WithTitle
{
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
        return 'Danh sách bác sĩ';
    }
    public function array(): array
    {
        $query = Booking::with('guest')
            ->where('isDeleted', 0)
            ->whereHas('invoiceDetails.invoice', function ($q) {
                $q->where('status', 'paid');
            });


        if ($this->year) $query->whereYear('booking_date', $this->year);
        if ($this->month) {
            $query->whereYear('booking_date', date('Y', strtotime($this->month)))
                ->whereMonth('booking_date', date('m', strtotime($this->month)));
        }
        if ($this->day) $query->whereDate('booking_date', $this->day);
        if ($this->start_date && $this->end_date) $query->whereBetween('booking_date', [$this->start_date, $this->end_date]);
        if ($this->guest_phone) {
            $query->whereHas('guest', function ($q) {
                $q->where('guest_phone', 'like', '%' . $this->guest_phone . '%');
            });
        }

        $bookings = $query->get()->groupBy('doctor_name');

        $result = [];

        $grandTotalService = 0;  
        $grandTotalFee = 0;      

        foreach ($bookings as $doctor => $items) {
            $result[] = ["Bác sĩ: " . ($doctor ?? 'Chưa rõ')];
            $result[] = $this->headings();

            $totalService = 0;
            $totalFee = 0;

            foreach ($items as $booking) {
                $result[] = [
                    $booking->doctor_name ?? 'N/A',
                    $booking->service_name ?? 'N/A',
                    $booking->booking_time ?? 'N/A',
                    $booking->guest->guest_name ?? 'N/A',
                    $booking->service_price ?? 0,
                    $booking->doctor_fee ?? 0,
                    $booking->booking_date ?? 'N/A',
                ];

                $totalService += $booking->service_price ?? 0;
                $totalFee += $booking->doctor_fee ?? 0;
            }

            $result[] = ['', '', '', 'Tổng', $totalService, $totalFee, ''];
            $result[] = ['']; 
            // $grandTotalService += $totalService;
            // $grandTotalFee += $totalFee;
        }
            // $result[] = ['TỔNG TẤT CẢ'];
            // $result[] = ['', '', '', '', 'Tổng giá dịch vụ', $grandTotalService];
            // $result[] = ['', '', '', '', 'Tổng phí bác sĩ', $grandTotalFee];
        return $result;
    }

    public function headings(): array
    {
        return [
            'Tên Bác Sĩ',
            'Tên Dịch Vụ',
            'Giờ Đặt',
            'Tên Bệnh Nhân',
            'Giá dịch vụ',
            'Phí bác sĩ',
            'Ngày Đặt',
        ];
    }

    public function styles(Worksheet $sheet)
{
    $highestRow = $sheet->getHighestRow();

    for ($row = 1; $row <= $highestRow; $row++) {
        $firstColValue = $sheet->getCell('A' . $row)->getValue();
        $fourthColValue = $sheet->getCell('D' . $row)->getValue();
        $fifthColValue = $sheet->getCell('E' . $row)->getValue();
        $sixthColValue = $sheet->getCell('F' . $row)->getValue();

        if (
            strpos($firstColValue, 'Bác sĩ:') === 0 ||
            $firstColValue === 'Tên Bác Sĩ' ||
            $fourthColValue === 'Tổng'
        ) {
            $sheet->getStyle('A' . $row . ':G' . $row)->getFont()->setBold(true);
        }

        if (
            $firstColValue === 'TỔNG TẤT CẢ' ||
            $fifthColValue === 'Tổng giá dịch vụ' ||
            $fifthColValue === 'Tổng phí bác sĩ'
        ) {
            $sheet->getStyle('A' . $row . ':G' . $row)->getFont()->setBold(true)->setSize(11) ->getColor()
          ->setRGB('FF0000');;
        }
    }

    return [];
}




    public function registerEvents(): array
    {
        return [];
    }
}