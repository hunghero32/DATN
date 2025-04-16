<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    // Hiển thị danh sách hóa đơn (chỉ hiển thị hóa đơn chưa bị xóa mềm)
    public function index(Request $request)
{
    $query = Invoice::where('invoices.isDeleted', 0) // Chỉ rõ bảng invoices
        ->select('invoices.*')
        ->leftJoin('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
        ->leftJoin('bookings', 'invoice_details.booking_id', '=', 'bookings.id')
        ->leftJoin('guests', 'bookings.guest_id', '=', 'guests.id')
        ->leftJoin('services', 'bookings.service_id', '=', 'services.id')
        ->addSelect([
            'guests.guest_name',
            'guests.guest_phone',
            'guests.guest_email',
            'services.services_name'
        ]);

    // Kiểm tra nếu request có từ khóa tìm kiếm
    if ($request->has('keyword')) {
        $keyword = $request->keyword;
        $query->where(function ($q) use ($keyword) {
            $q->where('invoices.total_amount', 'like', "%$keyword%")
              ->orWhere('invoices.discount', 'like', "%$keyword%")
              ->orWhere('invoices.tax', 'like', "%$keyword%")
              ->orWhere('guests.guest_name', 'like', "%$keyword%")
              ->orWhere('guests.guest_phone', 'like', "%$keyword%")
              ->orWhere('guests.guest_email', 'like', "%$keyword%")
              ->orWhere('services.services_name', 'like', "%$keyword%");
        });
    }

    // Sắp xếp theo thời gian tạo hóa đơn
    $invoices = $query->orderBy('invoices.created_at', 'desc')->paginate(10);

    return view('admin.pages.invoices.index', compact('invoices'));
}

    // Hiển thị form tạo mới hóa đơn
    public function create()
    {
        return view('admin.pages.invoices.create');
    }

    // Lưu hóa đơn mới vào database
    public function store(Request $request)
    {
        $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
        ]);

        Invoice::create([
            'total_amount' => $request->total_amount,
            'discount' => $request->discount ?? 0,
            'tax' => $request->tax ?? 0,
            'isDeleted' => 0,
        ]);

        return redirect()->route('admin.invoices.index')->with('success', 'Hóa đơn đã được tạo!');
    }

    // Hiển thị form chỉnh sửa hóa đơn
    public function edit($id)
    {
        $invoice = Invoice::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        return view('admin.pages.invoices.edit', compact('invoice'));
    }

    // Cập nhật thông tin hóa đơn
    public function update(Request $request, $id)
    {
        $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
        ]);

        $invoice = Invoice::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $invoice->update([
            'total_amount' => $request->total_amount,
            'discount' => $request->discount ?? 0,
            'tax' => $request->tax ?? 0,
        ]);

        return redirect()->route('admin.invoices.index')->with('success', 'Hóa đơn đã được cập nhật!');
    }

    // Xóa mềm hóa đơn (đặt isDeleted = 1)
    public function delete($id)
    {
        $invoice = Invoice::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $invoice->update(['isDeleted' => 1]);

        return redirect()->route('admin.invoices.index')->with('success', 'Hóa đơn đã bị xóa!');
    }
    // Cập nhật trạng thái thanh toán (chỉ update field status)
public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:unpaid,paid,pending,cancelled',
    ]);

    $invoice = Invoice::where('id', $id)->where('isDeleted', 0)->firstOrFail();
    $invoice->update([
        'status' => $request->status,
    ]);

    return redirect()->back()->with('success', 'Cập nhật trạng thái thanh toán thành công!');
}
}
