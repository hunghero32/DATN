<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicalRecordRequest extends FormRequest
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
            'BHYT' => 'sometimes|nullable|string|max:50|unique:medical_records,BHYT,' . $this->medical_record->id,
            'medical_condition' => 'sometimes|required|string|max:500',
            'medications' => 'sometimes|nullable|string|max:500',
            'allergies' => 'sometimes|nullable|string|max:500',
            'family_history' => 'sometimes|nullable|string|max:500',
            'treatment' => 'sometimes|nullable|string|max:1000',
            'note' => 'sometimes|nullable|string|max:1000',
        ];
    }
    public function messages()
    {
        return [
            'BHYT.max' => 'Mã BHYT không được vượt quá 50 ký tự.',
            'BHYT.unique' => 'Mã BHYT đã tồn tại.',
            'medical_condition.required' => 'Tình trạng bệnh không được để trống.',
            'medical_condition.max' => 'Tình trạng bệnh không được vượt quá 500 ký tự.',
            'medications.max' => 'Thuốc sử dụng không được vượt quá 500 ký tự.',
            'allergies.max' => 'Dị ứng không được vượt quá 500 ký tự.',
            'family_history.max' => 'Tiền sử gia đình không được vượt quá 500 ký tự.',
            'treatment.max' => 'Phác đồ điều trị không được vượt quá 1000 ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 1000 ký tự.',
        ];
    }
}
