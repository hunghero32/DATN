<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceDetailRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'invoice_id' => 'required|exists:invoices,id',
            'booking_id' => 'required|exists:bookings,id',
        ];
    }

    public function messages()
    {
        return [
            'invoice_id.required' => 'Vui lòng chọn hóa đơn.',
            'invoice_id.exists' => 'Hóa đơn không tồn tại.',
            'booking_id.required' => 'Vui lòng chọn đặt chỗ.',
            'booking_id.exists' => 'Đặt chỗ không tồn tại.',
        ];
    }
}