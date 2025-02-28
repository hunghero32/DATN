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
            'total_amount' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'total_amount.required' => 'Vui lòng nhập tổng số tiền.',
            'total_amount.numeric' => 'Tổng số tiền phải là số.',
            'total_amount.min' => 'Tổng số tiền không được âm.',
            'discount.numeric' => 'Giảm giá phải là số.',
            'discount.min' => 'Giảm giá không được âm.',
        ];
    }
}
