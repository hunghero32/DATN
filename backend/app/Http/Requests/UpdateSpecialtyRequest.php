<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSpecialtyRequest extends FormRequest
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
            'name' => 'required|string|max:255', // Tên chuyên khoa
            'description' => 'nullable|string', // Mô tả chuyên khoa (nếu có)
            'icon' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Hình ảnh icon (nếu có)
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Hình ảnh chi tiết (nếu có)
        ];
    }
    public function messages(): array
{
    return [
        'name.required' => 'Vui lòng nhập tên chuyên khoa.',
        'name.string' => 'Tên chuyên khoa phải là chuỗi ký tự.',
        'name.max' => 'Tên chuyên khoa không được vượt quá 255 ký tự.',

        'description.string' => 'Mô tả phải là chuỗi văn bản.',

        'icon.image' => 'Biểu tượng phải là một tệp hình ảnh.',
        'icon.mimes' => 'Biểu tượng phải có định dạng: jpeg, png, jpg, gif.',
        'icon.max' => 'Biểu tượng không được vượt quá 2MB.',

        'image.image' => 'Hình ảnh phải là một tệp hình ảnh.',
        'image.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif.',
        'image.max' => 'Hình ảnh không được vượt quá 2MB.',
    ];
}

}
