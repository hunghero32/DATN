<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
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
            'time_start'   => 'sometimes|required|date_format:H:i|before:time_end',
            'time_end'     => 'sometimes|required|date_format:H:i|after:time_start',
            'max_patients' => 'sometimes|required|integer|min:1',
            'status'       => 'sometimes|required|in:0,1',
        ];
    }
    public function messages(): array
    {
        return [
            'time_start.required'   => 'Vui lòng nhập giờ bắt đầu.',
            'time_start.date_format' => 'Giờ bắt đầu không hợp lệ, định dạng phải là HH:MM.',
            'time_start.before'     => 'Giờ bắt đầu phải trước giờ kết thúc.',

            'time_end.required'     => 'Vui lòng nhập giờ kết thúc.',
            'time_end.date_format'  => 'Giờ kết thúc không hợp lệ, định dạng phải là HH:MM.',
            'time_end.after'        => 'Giờ kết thúc phải sau giờ bắt đầu.',

            'max_patients.required' => 'Vui lòng nhập số lượng bệnh nhân tối đa.',
            'max_patients.integer'  => 'Số lượng bệnh nhân phải là số nguyên.',
            'max_patients.min'      => 'Số lượng bệnh nhân tối thiểu là 1.',

            'status.required'       => 'Vui lòng chọn trạng thái.',
            'status.in'             => 'Trạng thái phải là 0 (không hoạt động) hoặc 1 (hoạt động).',
        ];
    }
}
