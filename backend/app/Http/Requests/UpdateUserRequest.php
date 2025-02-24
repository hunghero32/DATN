<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $this->route('user')->id,
            'phone' => 'sometimes|required|string|regex:/^(\+?\d{1,3}[- ]?)?\d{10}$/|unique:users,phone,' . $this->route('user')->id,
            'password' => ['nullable', 'string', Password::min(8)->letters()->numbers()],
            'social_id' => 'nullable|string|unique:users,social_id,' . $this->route('user')->id,
            'social_provider' => 'nullable|string|in:facebook,google,apple',
            'role' => 'sometimes|required|string|in:admin,doctor,guest',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là chuỗi.',
            'name.max' => 'Tên không được quá 255 ký tự.',

            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'email.max' => 'Email không được quá 255 ký tự.',
            'email.unique' => 'Email đã tồn tại.',

            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.string' => 'Số điện thoại phải là chuỗi.',
            'phone.regex' => 'Số điện thoại không hợp lệ.',
            'phone.unique' => 'Số điện thoại đã tồn tại.',

            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự và chứa cả chữ cái và số.',

            'social_id.unique' => 'ID mạng xã hội đã tồn tại.',

            'social_provider.in' => 'Nhà cung cấp phải là Facebook, Google hoặc Apple.',

            'role.required' => 'Vai trò là bắt buộc.',
            'role.in' => 'Vai trò chỉ có thể là admin,doctor hoặc guest.',
        ];
    }
}
