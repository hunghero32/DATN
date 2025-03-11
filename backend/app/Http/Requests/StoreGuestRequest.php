<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuestRequest extends FormRequest
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
    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'guest_name' => 'required|string|max:255',
            'gender' => 'nullable|in:male,female,other',
            'birthday' => 'nullable|date',
            'guest_phone' => 'nullable|string|max:20',
            'guest_email' => 'nullable|email|unique:guests,guest_email',
            'address' => 'nullable',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'Người dùng không được để trống.',
            'user_id.exists' => 'Người dùng không hợp lệ.',
            'guest_name.required' => 'Tên khách không được để trống.',
            'guest_name.max' => 'Tên khách không được vượt quá 255 ký tự.',
            'gender.in' => 'Giới tính chỉ có thể là male, female hoặc other.',
            'birthday.date' => 'Ngày sinh phải là định dạng ngày hợp lệ.',
            'guest_phone.max' => 'Số điện thoại không được vượt quá 20 ký tự.',
            'guest_email.email' => 'Email không hợp lệ.',
            'guest_email.unique' => 'Email đã tồn tại.',
            'file.mimes' => 'File phải có định dạng pdf, jpg, jpeg hoặc png.',
            'file.max' => 'File không được lớn hơn 2MB.',
        ];
    }
}
