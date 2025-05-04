<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDoctorServiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'doctor_id' => 'required|exists:doctors,id',
            'service_id' => 'required|exists:services,id',
        ];
    }

    public function messages()
    {
        return [
            'doctor_id.required' => 'Bác sĩ là bắt buộc.',
            'doctor_id.exists' => 'Bác sĩ không tồn tại.',
            'service_id.required' => 'Dịch vụ là bắt buộc.',
            'service_id.exists' => 'Dịch vụ không tồn tại.',
        ];
    }
}
