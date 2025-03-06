<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
<<<<<<< HEAD
=======
use Illuminate\Support\Carbon;
>>>>>>> 8ff85ea459e84e5c05aaa434423a1a0ee58bc5a6

class UpdateBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
<<<<<<< HEAD
        return false;
=======
        return true;
>>>>>>> 8ff85ea459e84e5c05aaa434423a1a0ee58bc5a6
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
<<<<<<< HEAD
    public function rules(): array
    {
        return [
            //
=======
    public function rules()
    {
        return [
            'doctor_id' => 'sometimes|exists:users,id',
            'service_id' => 'sometimes|exists:services,id',
            'guest_id' => 'sometimes|exists:users,id',
            'booking_date' => ['sometimes', 'date', 'after_or_equal:' . Carbon::now()->toDateString()],
            'booking_time' => ['sometimes','date_format:H:i',
                function ($attribute, $value, $fail) {
                    if (Carbon::parse(request('booking_date', $this->route('booking')->booking_date) . ' ' . $value)
                        ->lt(Carbon::now()->addHours(2))) {$fail('Thời gian đặt lịch phải cách hiện tại ít nhất 2 giờ.');}}],
            'note' => 'nullable|string|max:255',
            'status' => 'sometimes|in:pending,confirmed,cancelled,completed'
        ];
    }

    public function messages()
    {
        return [
            'doctor_id.exists' => 'Bác sĩ không tồn tại.',
            'service_id.exists' => 'Dịch vụ không tồn tại.',
            'guest_id.exists' => 'Khách hàng không tồn tại.',
            'booking_date.date' => 'Ngày đặt lịch không hợp lệ.',
            'booking_date.after_or_equal' => 'Không thể đặt lịch ở ngày trong quá khứ.',
            'booking_time.date_format' => 'Giờ đặt lịch không hợp lệ (HH:mm).',
            'note.string' => 'Ghi chú phải là văn bản.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'status.in' => 'Trạng thái không hợp lệ.',
>>>>>>> 8ff85ea459e84e5c05aaa434423a1a0ee58bc5a6
        ];
    }
}
