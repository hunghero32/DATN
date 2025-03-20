<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Booking;
use App\Models\InvoiceDetail;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $invoices = Invoice::with([
            'details:id,invoice_id,booking_id',
            'details.booking:id,doctor_id,service_id,guest_id,booking_date,booking_time',
            'details.booking.service:id,services_name',
            'details.booking.doctor:id,doctor_name',
            'details.booking.guest:id,guest_name'
        ])
        ->whereHas('details.booking.doctor', function ($query) {
            $query->where('user_id', auth()->id());
        })
            ->select(['id', 'total_amount', 'discount', 'tax'])
            ->search($request->search)
            ->filterDate($request->date)  
            ->latest('updated_at')->paginate(10);

        return response()->json([
            'message' => 'Lấy danh sách hóa đơn thành công.',
            'data' => $invoices
        ], 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        $validatedData = $request->validated();
        // Lấy thông tin booking, chỉ cho phép bác sĩ tạo hóa đơn cho booking của họ
        $booking = Booking::where('id', $validatedData['booking_id'])
        ->whereHas('doctor', function ($query) {
            $query->where('user_id', auth()->id());
        })->first();
        if (!$booking) {
            return response()->json([
                'message' => 'Bạn chỉ có thể tạo hóa đơn cho booking của bác sĩ đăng nhập.',
            ], 403);
        }
        // Tính tổng tiền từ dịch vụ
        $servicePrice = $booking->service->price ?? 0;
        $discount = $validatedData['discount'] ?? 0;
        $taxPercent = $validatedData['tax_percent'] ?? 0;
        $tax = ($servicePrice - $discount) * ($taxPercent / 100);
        $totalAmount = max($servicePrice - $discount + $tax, 0);
        // Tạo hóa đơn
        $invoice = Invoice::create([
            'total_amount' => $totalAmount,
            'discount' => $discount,
            'tax' => $tax,
        ]);
        // Tạo chi tiết hóa đơn
        InvoiceDetail::create([
            'invoice_id' => $invoice->id,
            'booking_id' => $booking->id,
        ]);
    
        return response()->json([
            'message' => 'Tạo hóa đơn thành công.',
            'data' => $invoice->load('details.booking.service')
        ], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load([
            'details.booking.service:id,services_name',
            'details.booking.doctor:id,doctor_name',
            'details.booking.guest:id,guest_name'
        ]);
        return response()->json([
            'message' => 'Lấy thông tin hóa đơn thành công.',
            'data' => $invoice
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $validatedData = $request->validated();
        // Lấy chi tiết hóa đơn
        $invoiceDetail = $invoice->details()->first();
        if (!$invoiceDetail) {
            return response()->json(['message' => 'Không tìm thấy chi tiết hóa đơn.'], 404);
        }
        // Lấy thông tin booking, chỉ cập nhật nếu là booking của bác sĩ đăng nhập
        $booking = Booking::where('id', $invoiceDetail->booking_id)
        ->whereHas('doctor', function ($query) {
            $query->where('user_id', auth()->id());
        })->first();
        if (!$booking) {
            return response()->json([
                'message' => 'Bạn chỉ có thể cập nhật hóa đơn cho booking của bác sĩ đăng nhập.',
            ], 403);
        }
        // Tính lại tổng tiền
        $servicePrice = $booking->service->price ?? 0;
        $discount = $validatedData['discount'] ?? $invoice->discount;
        $taxPercent = $validatedData['tax_percent'] ?? 0;
        $tax = ($servicePrice - $discount) * ($taxPercent / 100);
        $totalAmount = max($servicePrice - $discount + $tax, 0);
    
        // Cập nhật hóa đơn
        $invoice->update([
            'total_amount' => $totalAmount,
            'discount' => $discount,
            'tax' => $tax,
        ]);
    
        return response()->json([
            'message' => 'Cập nhật hóa đơn thành công.',
            'data' => $invoice->load('details.booking.service')
        ], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        
        $invoice->delete();

        return response()->json([
            'message' => 'Xóa hóa đơn thành công.'
        ], 200);
    }
}
