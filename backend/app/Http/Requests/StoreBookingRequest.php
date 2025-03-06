<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
<<<<<<< HEAD
=======
use Illuminate\Support\Carbon;
>>>>>>> 8ff85ea459e84e5c05aaa434423a1a0ee58bc5a6

class StoreBookingRequest extends FormRequest
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
            'service_id' => 'required|exists:services,id',
            'guest_id' => 'required|exists:users,id',
            'booking_date' => ['required', 'date', 'after_or_equal:' . Carbon::now()->toDateString()],
            'booking_time' => ['required','date_format:H:i',
                fn($attr, $val, $fail) => Carbon::parse(request('booking_date') . ' ' . $val)
                    ->lt(Carbon::now()->addHours(2)) ? $fail('Thời gian đặt lịch phải cách hiện tại ít nhất 2 giờ.') : null],
            'note' => 'nullable|string|max:255',
            'status' => 'required|in:pending,confirmed,cancelled,completed'
        ];
    }

    public function messages()
    {
        return [
            'service_id.required' => 'Vui lòng chọn dịch vụ.',
            'service_id.exists' => 'Dịch vụ không tồn tại.',
            'guest_id.required' => 'Vui lòng chọn khách hàng.',
            'guest_id.exists' => 'Khách hàng không tồn tại.',
            'booking_date.required' => 'Vui lòng chọn ngày đặt lịch.',
            'booking_date.date' => 'Ngày đặt lịch không hợp lệ.',
            'booking_date.after_or_equal' => 'Ngày đặt lịch không được ở quá khứ.',
            'booking_time.required' => 'Vui lòng chọn giờ đặt lịch.',
            'booking_time.date_format' => 'Giờ đặt lịch không hợp lệ (HH:mm).',
            'note.string' => 'Ghi chú phải là văn bản.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái không hợp lệ.'
>>>>>>> 8ff85ea459e84e5c05aaa434423a1a0ee58bc5a6
        ];
    }
}
