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
            'discount' => 'nullable|numeric|min:0',
            'tax_percent' => 'nullable|numeric|min:0|max:100',
        ];
    }

    public function messages()
    {
        return [
            'discount.numeric' => 'Giảm giá phải là số.',
            'discount.min' => 'Giảm giá không thể âm.',
            'tax_percent.numeric' => 'Thuế phải là số.',
            'tax_percent.min' => 'Thuế không thể âm.',
            'tax_percent.max' => 'Thuế không thể lớn hơn 100%.',
        ];
    }
}
