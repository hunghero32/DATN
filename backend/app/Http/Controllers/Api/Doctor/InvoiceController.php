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
    public function index(Request $request)
    {
        $invoices = Invoice::with([
            'details:id,invoice_id,booking_id',
            'details.booking:id,doctor_id,service_id,guest_id,booking_date,booking_time',
            'details.booking.service:id,services_name,price',
            'details.booking.doctor:id,doctor_name',
            'details.booking.guest:id,guest_name'
        ])
        ->whereHas('details.booking.doctor', function ($query) {
            $query->where('user_id', auth()->id());
        })
            ->select(['id', 'total_amount', 'discount', 'tax'])
            ->whereHas('details.booking.doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->search($request->search)
            ->filterDate($request->date)
            ->latest()
            ->paginate(10);

        return response()->json([
            'message' => 'Lấy danh sách hóa đơn thành công.',
            'data' => $invoices
        ], 200);
    }

    public function store(StoreInvoiceRequest $request)
    {
        $validatedData = $request->validated();

        // Kiểm tra xem booking_id đã được sử dụng trong một hóa đơn khác hay chưa
        $existingInvoice = InvoiceDetail::where('booking_id', $validatedData['booking_id'])->first();
        if ($existingInvoice) {
            return response()->json([
                'message' => 'Booking này đã được sử dụng trong một hóa đơn khác (ID: ' . $existingInvoice->invoice_id . ').'
            ], 422);
        }

        $booking = Booking::where('id', $validatedData['booking_id'])
            ->whereHas('doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Bạn chỉ có thể tạo hóa đơn cho booking của bác sĩ đăng nhập.',
            ], 403);
        }

        $servicePrice = $booking->service->price ?? 0;
        $discount = $validatedData['discount'] ?? 0;
        $taxPercent = $validatedData['tax_percent'] ?? 0;

        $taxableAmount = max($servicePrice - $discount, 0);
        $tax = $taxableAmount * ($taxPercent / 100);
        $totalAmount = $taxableAmount + $tax;

        $invoice = Invoice::create([
            'total_amount' => $totalAmount,
            'discount' => $discount,
            'tax' => $tax,
        ]);

        InvoiceDetail::create([
            'invoice_id' => $invoice->id,
            'booking_id' => $booking->id,
        ]);

        return response()->json([
            'message' => 'Tạo hóa đơn thành công.',
            'data' => $invoice->load('details.booking.service')
        ], 201);
    }

    public function show(Invoice $invoice)
    {
        $invoice->load([
            'details.booking.service:id,services_name,price',
            'details.booking.doctor:id,doctor_name',
            'details.booking.guest:id,guest_name'
        ]);

        $isAuthorized = $invoice->details()->whereHas('booking.doctor', function ($query) {
            $query->where('user_id', auth()->id());
        })->exists();

        if (!$isAuthorized) {
            return response()->json([
                'message' => 'Bạn không có quyền xem hóa đơn này.',
            ], 403);
        }

        return response()->json([
            'message' => 'Lấy thông tin hóa đơn thành công.',
            'data' => $invoice
        ], 200);
    }

    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $validatedData = $request->validated();

        $invoiceDetail = $invoice->details()->first();
        if (!$invoiceDetail) {
            return response()->json(['message' => 'Không tìm thấy chi tiết hóa đơn.'], 404);
        }

        $booking = Booking::where('id', $invoiceDetail->booking_id)
            ->whereHas('doctor', function ($query) {
                $query->where('user_id', auth()->id());
            })->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Bạn chỉ có thể cập nhật hóa đơn cho booking của bác sĩ đăng nhập.',
            ], 403);
        }

        $servicePrice = $booking->service->price ?? 0;
        $discount = $validatedData['discount'] ?? $invoice->discount;
        $taxPercent = $validatedData['tax_percent'] ?? 0;

        $taxableAmount = max($servicePrice - $discount, 0);
        $tax = $taxableAmount * ($taxPercent / 100);
        $totalAmount = $taxableAmount + $tax;

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

    public function destroy(Invoice $invoice)
    {
        $isAuthorized = $invoice->details()->whereHas('booking.doctor', function ($query) {
            $query->where('user_id', auth()->id());
        })->exists();

        if (!$isAuthorized) {
            return response()->json([
                'message' => 'Bạn không có quyền xóa hóa đơn này.',
            ], 403);
        }

        $invoice->delete();

        return response()->json([
            'message' => 'Xóa hóa đơn thành công.'
        ], 200);
    }
}