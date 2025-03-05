<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'guest_id' => 'required|exists:guests,id',
            'service_id' => 'required|exists:services,id',
            'rating' => 'required|integer|min:1|max:5',
            'comments' => 'nullable|string',
            'status' => 'required|in:pending,approved,rejected'
        ];
    }

    public function messages()
    {
        return [
            'guest_id.required' => 'Vui lòng chọn khách hàng.',
            'guest_id.exists' => 'Khách hàng không tồn tại.',
            'service_id.required' => 'Vui lòng chọn dịch vụ.',
            'service_id.exists' => 'Dịch vụ không tồn tại.',
            'rating.required' => 'Vui lòng đánh giá từ 1 đến 5.',
            'rating.integer' => 'Đánh giá phải là số nguyên.',
            'rating.min' => 'Đánh giá tối thiểu là 1.',
            'rating.max' => 'Đánh giá tối đa là 5.',
            'comments.string' => 'Bình luận phải là chuỗi.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái không hợp lệ.',
        ];
    }
    
}
