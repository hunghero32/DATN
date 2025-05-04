<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleRequest extends FormRequest
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
            'max_patients' => 'required|integer|min:1',
            'month'        => 'required|integer|min:' . now()->month . '|max:12',
            'year'         => 'required|integer|min:' . now()->year,
            'time_start' => 'required|date_format:H:i|before:time_end',
            'time_end' => 'required|date_format:H:i|after:time_start',
        ];
    }
    public function messages(): array
    {
        return [
            'max_patients.required' => 'Số lượng bệnh nhân',
            'max_patients.integer'  => 'Số lượng bệnh nhân phải là số nguyên.',
            'max_patients.min'      => 'Số lượng bệnh nhân tối thiểu là 1.',
            'month.required'        => 'Vui lòng chọn tháng làm việc.',
            'month.integer'         => 'Tháng phải là một số.',
            'month.min'             => 'Không thể tạo lịch cho tháng đã qua.',
            'month.max'             => 'Tháng không hợp lệ.',
            'year.required'         => 'Vui lòng chọn năm làm việc.',
            'year.integer'          => 'Năm phải là một số.',
            'year.min'              => 'Không thể tạo lịch cho năm đã qua.',
            'time_start.required'   => 'Vui lòng nhập giờ bắt đầu.',
            'time_start.date_format'=> 'Giờ bắt đầu không hợp lệ (HH:MM).',
            'time_end.required'     => 'Vui lòng nhập giờ kết thúc.',
            'time_end.date_format'  => 'Giờ kết thúc không hợp lệ (HH:MM).',
            'time_end.after'        => 'Giờ kết thúc phải sau giờ bắt đầu.',
            'working_date.required' => 'Vui lòng nhập ngày làm việc.',
            'working_date.date'     => 'Ngày làm việc không hợp lệ.',
            'working_date.after_or_equal' => 'Ngày làm việc phải từ hôm nay trở đi.',
        ];
    }
}
