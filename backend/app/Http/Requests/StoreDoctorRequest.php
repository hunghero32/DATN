<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDoctorRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cho phép request này được thực thi
    }

    public function rules()
    {
        return [
            'doctor_avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'doctor_name' => 'required|string|max:255',
            'doctor_bio' => 'nullable|string|max:1000',
            'specialty_id' => 'required|exists:specialties,id',
            'exp' => 'required|integer|min:0|max:50',
            'file' => 'required|mimes:pdf,doc,docx,jpg,png|max:5120',
        ];
    }

    public function messages()
    {
        return [
            'doctor_avatar.required' => 'Ảnh đại diện là bắt buộc.',
            'doctor_avatar.image' => 'Ảnh đại diện phải là định dạng ảnh hợp lệ.',
            'doctor_avatar.mimes' => 'Ảnh chỉ được chọn các định dạng: jpeg, png, jpg, gif, svg.',
            'doctor_avatar.max' => 'Kích thước ảnh tối đa là 2MB.',
            'doctor_name.required' => 'Tên bác sĩ là bắt buộc.',
            'specialty_id.required' => 'Chuyên khoa là bắt buộc.',
            'specialty_id.exists' => 'Chuyên khoa không hợp lệ.',
            'exp.required' => 'Kinh nghiệm là bắt buộc.',
            'exp.integer' => 'Kinh nghiệm phải là số nguyên.',
            'exp.min' => 'Kinh nghiệm không thể nhỏ hơn 0 năm.',
            'exp.max' => 'Kinh nghiệm không thể lớn hơn 50 năm.',
            'file.required' => 'Tệp tải lên là bắt buộc.',
            'file.mimes' => 'Chỉ chấp nhận các định dạng: PDF, DOC, DOCX, JPG, PNG.',
            'file.max' => 'Kích thước tệp tối đa là 5MB.'
        ];
    }
}
