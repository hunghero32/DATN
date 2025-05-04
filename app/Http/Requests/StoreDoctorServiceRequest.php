<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDoctorServiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'service_id' => 'required|exists:services,id',
        ];
    }

    public function messages()
    {
        return [
            'service_id.required' => 'Dịch vụ là bắt buộc.',
            'service_id.exists' => 'Dịch vụ không tồn tại.',
        ];
    }
}
