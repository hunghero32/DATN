<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;

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
     * Hiển thị một hóa đơn cụ thể.
     */
    public function show(Invoice $invoice)
    {
        return response()->json($invoice, 200);
    }
}