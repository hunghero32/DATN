<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class BookingsMultiSheetExport implements WithMultipleSheets
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

    public function sheets(): array
    {
        return [
            new BookingExport($this->year, $this->month, $this->day, $this->start_date, $this->end_date, $this->guest_phone),
            new BookingSummarySheet($this->year, $this->month, $this->day, $this->start_date, $this->end_date, $this->guest_phone),
        ];
    }
}
