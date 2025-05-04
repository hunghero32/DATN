<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDoctorRequest extends FormRequest
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
            'doctor_avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            'doctor_bio' => 'nullable|string|max:1000',
            'file' => 'nullable|mimes:pdf,doc,docx|max:51200',
        ];
    }

    public function messages()
    {
        return [
            'doctor_avatar.image' => 'Ảnh đại diện phải là định dạng ảnh hợp lệ.',
            'doctor_avatar.mimes' => 'Ảnh chỉ được chọn các định dạng: jpeg, png, jpg, gif, svg.',
            'doctor_avatar.max' => 'Kích thước ảnh tối đa là 10MB.',
            'doctor_bio.max' => 'Tiểu sử không được vượt quá 1000 ký tự.',
            'file.mimes' => 'File CV/chứng chỉ chỉ chấp nhận các định dạng: PDF, DOC, DOCX.',
            'file.max' => 'Kích thước file tối đa là 50MB.'
        ];
    }
}