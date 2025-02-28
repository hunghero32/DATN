<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceDetailRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'invoice_id' => 'sometimes|exists:invoices,id',
            'booking_id' => 'sometimes|exists:bookings,id',
        ];
    }

    public function messages()
    {
        return [
            'invoice_id.exists' => 'Hóa đơn không tồn tại.',
            'booking_id.exists' => 'Đặt chỗ không tồn tại.',
        ];
    }
}
