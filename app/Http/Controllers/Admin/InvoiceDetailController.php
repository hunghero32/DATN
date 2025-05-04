<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InvoiceDetail;
use App\Models\Invoice;
use App\Models\Booking;
use App\Models\Result;
use App\Models\System;
use Illuminate\Http\Request;
use App\Http\Requests\StoreInvoiceDetailRequest;
use App\Http\Requests\UpdateInvoiceDetailRequest;

class InvoiceDetailController extends Controller
{
    public function index(Request $request)
{
    $query = InvoiceDetail::where('isDeleted', 0)
        ->with(['invoice', 'booking.guest', 'booking.service', 'booking.result','booking.doctor']); // Gọi đúng quan hệ

    if ($request->has('invoice_id')) {
        $query->where('invoice_id', $request->invoice_id);
    }
    $system = System::first();
    $invoiceDetails = $query->get();

    return view('admin.pages.invoice_details.index', compact('system','invoiceDetails'));
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



public function store(StoreInvoiceDetailRequest $request)
{
    // $request->validate([
    //     'booking_id' => 'required|exists:bookings,id',
    //     'discount'   => 'nullable|numeric|min:0',
    //     'tax'        => 'nullable|numeric|min:0',
    // ]);

    $booking = Booking::with('service')->findOrFail($request->booking_id);

    $price = $booking->service_price ?? 0;
    $discount = $request->discount ?? 0;
    $tax = $request->tax ?? 0;

    $subtotal = $price - $discount;
    $taxAmount = ($subtotal * $tax) / 100;
    $totalAmount = $subtotal + $taxAmount;

    $invoice = Invoice::create([
        'total_amount' => $totalAmount,
        'discount'     => $discount,
        'tax'          => $tax,
        'isDeleted'    => 0,
    ]);


    InvoiceDetail::create([
        'invoice_id' => $invoice->id,
        'booking_id' => $request->booking_id,
        'isDeleted'  => 0,
    ]);
    return redirect()->route('admin.invoices.index')->with('success', 'Chi tiết hóa đơn đã được tạo thành công!');
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

    

    public function update(UpdateInvoiceDetailRequest $request, $id)
{
    // $request->validate([
    //     'invoice_id'   => 'required|exists:invoices,id',
    //     'booking_id'   => 'required|exists:bookings,id',
    //     'discount'     => 'nullable|numeric|min:0',
    //     'tax'          => 'nullable|numeric|min:0',
    // ]);

    $invoiceDetail = InvoiceDetail::where('id', $id)->where('isDeleted', 0)->firstOrFail();
    $invoiceDetail->update([
        'invoice_id' => $request->invoice_id,
        'booking_id' => $request->booking_id,
    ]);

    $booking = Booking::with('service')->findOrFail($request->booking_id);
    $price = $booking->service_price ?? 0;
    $discount = $request->discount ?? 0;
    $tax = $request->tax ?? 0;

    $subtotal = $price - $discount;
    $taxAmount = ($subtotal * $tax) / 100;
    $totalAmount = $subtotal + $taxAmount;

    $invoice = Invoice::where('id', $invoiceDetail->invoice_id)->where('isDeleted', 0)->firstOrFail();
    $invoice->update([
        'total_amount' => $totalAmount,
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