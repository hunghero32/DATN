<?php
namespace App\Http\Controllers\Admin;

use App\Exports\BookingExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
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

    $query = Booking::with(['guest', 'service', 'doctor', 'result'])
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

    $bookings = $query->get();

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

    if ($request->year) {
        $start_date = "{$request->year}-01-01";
        $end_date = "{$request->year}-12-31";
    } elseif ($request->month) {
        $start_date = date('Y-m-01', strtotime($request->month));
        $end_date = date('Y-m-t', strtotime($request->month));
    } elseif ($request->day) {
        $start_date = $request->day;
        $end_date = $request->day;
    } elseif ($request->start_date && $request->end_date) {
        $start_date = $request->start_date;
        $end_date = $request->end_date;
    } else {
        return redirect()->route('admin.report.index')->withErrors(['error' => 'Bạn cần chọn ít nhất một tiêu chí để lọc']);
    }

    return Excel::download(new BookingExport($start_date, $end_date, $request->guest_phone), 'danh-sach-kham-benh.xlsx');
}



}
