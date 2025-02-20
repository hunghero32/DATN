<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSystemRequest extends FormRequest
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
            'site_name' => 'required|string|max:50',
            'site_description' => 'nullable|string',
            'site_keywords' => 'nullable|string',
            'site_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'site_favicon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'site_url' => 'required|url',
            'default_language' => 'required|string|max:5',
            'timezone' => 'required|string|max:255',
            'meta_tags' => 'nullable|string',
            'tracking_code' => 'nullable|string',
            'company_address' => 'nullable|string|max:255',
            'company_phone' => 'nullable|string|max:15',
            'company_email' => 'nullable|email|max:255',
        ];
    }
}
