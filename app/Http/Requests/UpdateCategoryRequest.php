<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
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
            'parent_id' => 'nullable|integer|exists:categories,id',
            'name' => 'required|string|max:255|unique:categories,name,' . $this->id,
            'description' => 'nullable|string|max:1000',
        ];
    }
    public function messages()
    {
        return [
            'id.exists' => 'ID không hợp lệ.',
            'parent_id.integer' => 'Parent ID phải là số nguyên.',
            'parent_id.exists' => 'Parent ID không hợp lệ.',
            'name.required' => 'Tên danh mục là bắt buộc.',
            'name.string' => 'Tên danh mục phải là chuỗi.',
            'name.max' => 'Tên danh mục không được quá 255 ký tự.',
            'name.unique' => 'Tên danh mục đã tồn tại.',
            'description.string' => 'Mô tả phải là chuỗi.',
            'description.max' => 'Mô tả không được quá 1000 ký tự.',
        ];
    }
}
