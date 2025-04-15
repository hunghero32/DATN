<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\InvoiceDetail;

class InvoiceDetailController extends Controller
{
    /**
     * Hiển thị danh sách chi tiết hóa đơn (có phân trang).
     */
    public function index()
    {
        $invoiceDetails = InvoiceDetail::paginate(5);
        return response()->json($invoiceDetails, 200);
    }
    public function show(InvoiceDetail $invoiceDetail)
    {
        return response()->json($invoiceDetail, 200);
    }
}