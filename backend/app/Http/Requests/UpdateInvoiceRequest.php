<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'total_amount' => 'sometimes|numeric|min:0',
            'discount' => 'sometimes|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'total_amount.numeric' => 'Tổng số tiền phải là số.',
            'total_amount.min' => 'Tổng số tiền không được âm.',
            'discount.numeric' => 'Giảm giá phải là số.',
            'discount.min' => 'Giảm giá không được âm.',
        ];
    }
}
