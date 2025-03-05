<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFeedbackRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'guest_id' => 'sometimes|exists:guests,id',
            'service_id' => 'sometimes|exists:services,id',
            'rating' => 'sometimes|integer|min:1|max:5',
            'comments' => 'nullable|string',
            'status' => 'sometimes|in:pending,approved,rejected'
        ];
    }

    public function messages()
    {
        return [
            'guest_id.exists' => 'Khách hàng không tồn tại.',
            'service_id.exists' => 'Dịch vụ không tồn tại.',
            'rating.integer' => 'Đánh giá phải là số nguyên.',
            'rating.min' => 'Đánh giá tối thiểu là 1.',
            'rating.max' => 'Đánh giá tối đa là 5.',
            'comments.string' => 'Bình luận phải là chuỗi.',
            'status.in' => 'Trạng thái không hợp lệ.',
        ];
    }
}