<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'category_id' => 'sometimes|required|integer|exists:categories,id',
            'user_id' => 'sometimes|required|integer|exists:users,id',
            'slug' => 'sometimes|required|string|max:255|unique:posts,slug,' . $this->route('post')->id,
            dd($this->route('post')),

            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'views' => 'nullable|integer|min:0',
            'status' => 'sometimes|required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'deleted_at' => 'nullable|date',
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => 'Danh mục là bắt buộc.',
            'category_id.integer' => 'Danh mục phải là số nguyên.',
            'category_id.exists' => 'Danh mục không hợp lệ.',
            'user_id.required' => 'Người dùng là bắt buộc.',
            'user_id.integer' => 'Người dùng phải là số nguyên.',
            'user_id.exists' => 'Người dùng không hợp lệ.',
            'slug.required' => 'Slug là bắt buộc.',
            'slug.string' => 'Slug phải là chuỗi.',
            'slug.max' => 'Slug không được quá 255 ký tự.',
            'slug.unique' => 'Slug đã tồn tại.',
            'title.required' => 'Tiêu đề là bắt buộc.',
            'title.string' => 'Tiêu đề phải là chuỗi.',
            'title.max' => 'Tiêu đề không được quá 255 ký tự.',
            'content.required' => 'Nội dung là bắt buộc.',
            'content.string' => 'Nội dung phải là chuỗi.',
            'views.integer' => 'Lượt xem phải là số nguyên.',
            'views.min' => 'Lượt xem không thể nhỏ hơn 0.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái không hợp lệ.',
            'published_at.date' => 'Ngày xuất bản phải là ngày hợp lệ.',
            'deleted_at.date' => 'Ngày xóa phải là ngày hợp lệ.',
        ];
    }
}
