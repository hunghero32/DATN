<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;

class InvoiceController extends Controller
{
    /**
     * Hiển thị danh sách hóa đơn (có phân trang).
     */
    public function index()
    {
        $invoices = Invoice::paginate(5);
        return response()->json($invoices, 200);
    }

    /**
     * Lưu hóa đơn mới vào cơ sở dữ liệu.
     */
    public function store(StoreInvoiceRequest $request)
    {
        $data = $request->validated();
        $invoice = Invoice::create($data);
        return response()->json([
            'message' => 'Hóa đơn đã được tạo thành công.',
            'data' => $invoice
        ], 201);
    }

    /**
     * Hiển thị một hóa đơn cụ thể.
     */
    public function show(Invoice $invoice)
    {
        return response()->json($invoice, 200);
    }

    /**
     * Cập nhật hóa đơn.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $data = $request->validated();
        $invoice->update($data);
        return response()->json([
            'message' => 'Cập nhật hóa đơn thành công.',
            'data' => $invoice
        ], 200);
    }

    /**
     * Xóa hóa đơn.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->json(['message' => 'Xóa hóa đơn thành công.'], 200);
    }
}