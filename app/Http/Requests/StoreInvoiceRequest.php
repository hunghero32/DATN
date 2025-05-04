<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'booking_id' => 'required|exists:bookings,id',
            'discount' => 'nullable|numeric|min:0',
            'tax_percent' => 'nullable|numeric|min:0|max:100',
        ];
    }

    public function messages()
    {
        return [
            'booking_id.required' => 'Vui lòng chọn một booking.',
            'booking_id.exists' => 'Booking không tồn tại.',
            'discount.numeric' => 'Giảm giá phải là số.',
            'discount.min' => 'Giảm giá không thể âm.',
            'tax_percent.numeric' => 'Thuế phải là số.',
            'tax_percent.min' => 'Thuế không thể âm.',
            'tax_percent.max' => 'Thuế không thể lớn hơn 100%.',
        ];
    }
}
