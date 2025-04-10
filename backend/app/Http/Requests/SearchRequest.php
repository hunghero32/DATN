<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'query' => 'required|string|min:2',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
