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
        ->with(['invoice', 'booking.guest', 'booking.service', 'booking.result','booking.doctor']); // Gọi đúng quan hệ

    if ($request->has('invoice_id')) {
        $query->where('invoice_id', $request->invoice_id);
    }

    $invoiceDetails = $query->paginate(10);

    return view('admin.pages.invoice_details.index', compact('invoiceDetails'));
}

public function create()
{
    $invoices = Invoice::where('isDeleted', 0)->get();
    $bookings = Booking::where('isDeleted', 0)
        ->whereNotIn('id', InvoiceDetail::pluck('booking_id')->toArray())
        ->with(['service', 'guest']) // Load quan hệ service và guest
        ->get();

    return view('admin.pages.invoice_details.create', compact('invoices', 'bookings'));
}



    public function store(Request $request)
{
    $request->validate([
        'booking_id' => 'required|exists:bookings,id',
        'total_amount' => 'required|numeric|min:0',
        'discount'     => 'nullable|numeric|min:0',
        'tax'          => 'nullable|numeric|min:0',
    ]);

    // Tạo hóa đơn mới
    $invoice = Invoice::create([
        'total_amount' => $request->total_amount,
        'discount'     => $request->discount ?? 0,
        'tax'          => $request->tax ?? 0,
        'isDeleted'    => 0,
    ]);

    // Tạo chi tiết hóa đơn với invoice_id vừa tạo
    InvoiceDetail::create([
        'invoice_id' => $invoice->id,
        'booking_id' => $request->booking_id,
        'isDeleted'  => 0,
    ]);
    return redirect()->route('invoice_details.index')->with('success', 'Chi tiết hóa đơn đã được tạo thành công!');
}


public function edit($id)
{
    $invoiceDetail = InvoiceDetail::where('id', $id)->where('isDeleted', 0)->firstOrFail();
    $invoice = Invoice::where('id', $invoiceDetail->invoice_id)->where('isDeleted', 0)->firstOrFail();
    $invoices = Invoice::where('isDeleted', 0)->get();

    $bookings = Booking::where('isDeleted', 0)
        ->whereNotIn('id', InvoiceDetail::where('id', '!=', $invoiceDetail->id)->pluck('booking_id')->toArray())
        ->orWhere('id', $invoiceDetail->booking_id)
        ->with(['service', 'guest']) 
        ->get();

    return view('admin.pages.invoice_details.edit', compact('invoiceDetail', 'invoice', 'invoices', 'bookings'));
}

    

    public function update(Request $request, $id)
{
    $request->validate([
        'invoice_id'   => 'required|exists:invoices,id',
        'booking_id'   => 'required|exists:bookings,id',
        'total_amount' => 'required|numeric|min:0',
        'discount'     => 'nullable|numeric|min:0',
        'tax'          => 'nullable|numeric|min:0',
    ]);

    $invoiceDetail = InvoiceDetail::where('id', $id)->where('isDeleted', 0)->firstOrFail();
    $invoiceDetail->update([
        'invoice_id' => $request->invoice_id,
        'booking_id' => $request->booking_id,
    ]);

    $invoice = Invoice::where('id', $invoiceDetail->invoice_id)->where('isDeleted', 0)->firstOrFail();
    $invoice->update([
        'total_amount' => $request->total_amount,
        'discount'     => $request->discount,
        'tax'          => $request->tax,
    ]);

    return redirect()->route('admin.invoices.index')->with('success', 'Chi tiết hóa đơn và hóa đơn đã được cập nhật!');
}

    public function delete($id)
    {
        $invoiceDetail = InvoiceDetail::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $invoiceDetail->update(['isDeleted' => 1]);

        return redirect()->route('invoice_details.index')->with('success', 'Chi tiết hóa đơn đã bị xóa!');
    }
}