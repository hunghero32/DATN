<?php
namespace App\Http\Controllers\Admin;

use App\Exports\BookingExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BookingsMultiSheetExport;
use App\Models\Booking;

class ReportController extends Controller
{
    public function index(Request $request)
{
    $dates = Booking::where('isDeleted', 0)
                    ->selectRaw('DATE(booking_date) as booking_day')
                    ->distinct()
                    ->orderBy('booking_day', 'desc')
                    ->pluck('booking_day');

    $query = Booking::with(['guest'])
                    ->where('isDeleted', 0);

    if ($request->filled('guest_phone')) {
        $query->whereHas('guest', function ($q) use ($request) {
            $q->where('guest_phone', 'like', '%' . $request->guest_phone . '%');
        });
    }

    if ($request->filled('year')) {
        $query->whereYear('booking_date', $request->year);
    }
    if ($request->filled('month')) {
        $query->whereYear('booking_date', date('Y', strtotime($request->month)))
              ->whereMonth('booking_date', date('m', strtotime($request->month)));
    }
    if ($request->filled('day')) {
        $query->whereDate('booking_date', $request->day);
    }
    if ($request->filled('start_date') && $request->filled('end_date')) {
        $query->whereBetween('booking_date', [$request->start_date, $request->end_date]);
    }

    $bookings = $query->paginate(10);

    return view('admin.pages.excel.export', compact('bookings', 'dates'));
}


public function export(Request $request)
{
    $request->validate([
        'year' => 'nullable|integer|min:2000|max:' . date('Y'),
        'month' => 'nullable|date_format:Y-m',
        'day' => 'nullable|date',
        'start_date' => 'nullable|date',
        'end_date' => 'nullable|date|after_or_equal:start_date',
        'guest_phone' => 'nullable|string|max:255',
    ]);

    // Gán biến lọc
    $year = $request->year;
    $month = $request->month;
    $day = $request->day;
    $start_date = $request->start_date;
    $end_date = $request->end_date;
    $guest_phone = $request->guest_phone;

    // Tạo tên file tùy biến
    $filename = 'danh-sach-kham-benh';

    if ($year) $filename .= "-nam-$year";
    if ($month) $filename .= "-thang-" . date('m-Y', strtotime($month));
    if ($day) $filename .= "-ngay-" . date('d-m-Y', strtotime($day));
    if ($start_date && $end_date) $filename .= "-tu-" . date('d-m-Y', strtotime($start_date)) . "-den-" . date('d-m-Y', strtotime($end_date));
    if ($guest_phone) $filename .= "-sdt-" . preg_replace('/\D/', '', $guest_phone); // bỏ ký tự đặc biệt

    $filename .= '.xlsx';

    return Excel::download(
        new BookingsMultiSheetExport($year, $month, $day, $start_date, $end_date, $guest_phone),
        $filename
    );
}
}
