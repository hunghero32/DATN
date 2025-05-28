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
            // 'invoice_id' => 'required|exists:invoices,id',
            'booking_id' => 'required|exists:bookings,id',
            'discount'   => 'nullable|numeric|min:0',
            'tax'        => 'nullable|numeric|min:0|max:100',
        ];
    }

    public function messages()
    {
        return [
            // 'invoice_id.required' => 'Vui lòng chọn hóa đơn.',
            // 'invoice_id.exists' => 'Hóa đơn không tồn tại.',
            'booking_id.required' => 'Vui lòng chọn đặt lịch.',
            'booking_id.exists' => 'Đặt chỗ không tồn tại.',
            'discount.numeric' => 'Giảm giá phải là số.',
            'tax.numeric' => 'Thuế phải là số.',
            'tax.min' => 'Thuế không được nhỏ hơn 0%.',
            'tax.max' => 'Thuế không được lớn hơn 100%.',
        ];
    }
}
