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
            'discount'   => 'nullable|numeric|min:0',
            'tax'        => 'nullable|numeric|min:0|max:100',
        ];
    }

    public function messages()
    {
        return [
            'invoice_id.exists' => 'Hóa đơn không tồn tại.',
            'booking_id.exists' => 'Đặt lịch không tồn tại.',
            'discount.numeric' => 'Giảm giá phải là số.',
            'tax.numeric' => 'Thuế phải là số.',
            'tax.min' => 'Thuế không được nhỏ hơn 0%.',
            'tax.max' => 'Thuế không được lớn hơn 100%.',    
        ];
    }
}
