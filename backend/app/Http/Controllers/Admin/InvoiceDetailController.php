<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InvoiceDetail;
use App\Models\Invoice;
use App\Models\Booking;
use App\Models\Result;
use Illuminate\Http\Request;

class InvoiceDetailController extends Controller
{
    public function index(Request $request)
{
    $query = InvoiceDetail::where('isDeleted', 0)
        ->with(['invoice', 'booking.guest', 'booking.service', 'booking.result']); // Gọi đúng quan hệ

    if ($request->has('invoice_id')) {
        $query->where('invoice_id', $request->invoice_id);
    }

    $invoiceDetails = $query->paginate(10);

    return view('admin.pages.invoice_details.index', compact('invoiceDetails'));
}

    public function create()
    {
        $invoices = Invoice::where('isDeleted', 0)->get();
        $bookings = Booking::where('isDeleted', 0)->get();
        return view('admin.pages.invoice_details.create', compact('invoices', 'bookings'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'booking_id' => 'required|exists:bookings,id',
        ]);

        InvoiceDetail::create([
            'invoice_id' => $request->invoice_id,
            'booking_id' => $request->booking_id,
            'isDeleted' => 0,
        ]);

        return redirect()->route('invoice_details.index')->with('success', 'Chi tiết hóa đơn đã được tạo!');
    }

    public function edit($id)
    {
        $invoiceDetail = InvoiceDetail::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $invoices = Invoice::where('isDeleted', 0)->get();
        $bookings = Booking::where('isDeleted', 0)->get();
        return view('admin.pages.invoice_details.edit', compact('invoiceDetail', 'invoices', 'bookings'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'booking_id' => 'required|exists:bookings,id',
        ]);

        $invoiceDetail = InvoiceDetail::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $invoiceDetail->update([
            'invoice_id' => $request->invoice_id,
            'booking_id' => $request->booking_id,
        ]);

        return redirect()->route('invoice_details.index')->with('success', 'Chi tiết hóa đơn đã được cập nhật!');
    }

    public function delete($id)
    {
        $invoiceDetail = InvoiceDetail::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $invoiceDetail->update(['isDeleted' => 1]);

        return redirect()->route('invoice_details.index')->with('success', 'Chi tiết hóa đơn đã bị xóa!');
    }
}