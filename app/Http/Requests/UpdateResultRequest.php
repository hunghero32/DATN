<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResultRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'booking_id' => 'sometimes|exists:bookings,id',
            'doctor_id' => 'sometimes|exists:doctors,id',
            'guest_id' => 'sometimes|exists:guests,id',
            'diagnosis' => 'nullable|string',
            'prescription' => 'nullable|string',
            'note' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'booking_id.exists' => 'Mã đặt lịch không tồn tại.',
            'doctor_id.exists' => 'Mã bác sĩ không tồn tại.',
            'guest_id.exists' => 'Mã khách hàng không tồn tại.',
            'file.mimes' => 'File phải có định dạng: pdf, jpg, jpeg, png.',
            'file.max' => 'File không được vượt quá 2MB.',
        ];
    }
}
