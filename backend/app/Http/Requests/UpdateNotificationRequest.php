<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotificationRequest extends FormRequest
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
            'user_id' => 'sometimes|required|exists:users,id',
            'booking_id' => 'sometimes|required|exists:bookings,id',
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|nullable|string',
            'type' => 'sometimes|required|string|max:50',
            'is_read' => 'sometimes|boolean',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'Người dùng là bắt buộc.',
            'user_id.exists' => 'Người dùng không tồn tại.',
            'booking_id.required' => 'Đặt chỗ là bắt buộc.',
            'booking_id.exists' => 'Đặt chỗ không tồn tại.',
            'title.required' => 'Tiêu đề không được để trống.',
            'title.max' => 'Tiêu đề không được vượt quá 255 ký tự.',
            'type.required' => 'Loại thông báo là bắt buộc.',
            'type.max' => 'Loại thông báo không được vượt quá 50 ký tự.',
            'is_read.boolean' => 'Trạng thái đã đọc phải là true hoặc false.',
        ];
    }
}
