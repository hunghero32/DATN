<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InvoiceDetail;
use App\Http\Requests\StoreInvoiceDetailRequest;
use App\Http\Requests\UpdateInvoiceDetailRequest;

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

    /**
     * Lưu chi tiết hóa đơn mới vào cơ sở dữ liệu.
     */
    public function store(StoreInvoiceDetailRequest $request)
    {
        $data = $request->validated();
        $invoiceDetail = InvoiceDetail::create($data);
        return response()->json([
            'message' => 'Chi tiết hóa đơn đã được tạo thành công.',
            'data' => $invoiceDetail
        ], 201);
    }

    /**
     * Hiển thị một chi tiết hóa đơn cụ thể.
     */
    public function show(InvoiceDetail $invoiceDetail)
    {
        return response()->json($invoiceDetail, 200);
    }

    /**
     * Cập nhật chi tiết hóa đơn.
     */
    public function update(UpdateInvoiceDetailRequest $request, InvoiceDetail $invoiceDetail)
    {
        $data = $request->validated();
        $invoiceDetail->update($data);
        return response()->json([
            'message' => 'Cập nhật chi tiết hóa đơn thành công.',
            'data' => $invoiceDetail
        ], 200);
    }

    /**
     * Xóa chi tiết hóa đơn.
     */
    public function destroy(InvoiceDetail $invoiceDetail)
    {
        $invoiceDetail->delete();
        return response()->json(['message' => 'Xóa chi tiết hóa đơn thành công.'], 200);
    }
}