<?php

namespace Database\Factories;

use App\Models\Result;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Guest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Result::class;

    public function definition()
    {
        return [
            'booking_id' => Booking::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID lịch hẹn
            'doctor_id' => Doctor::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID bác sĩ
            'guest_id' => Guest::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID khách hàng
            'diagnosis' => $this->faker->sentence(), // Chẩn đoán
            'prescription' => $this->faker->sentence(), // Đơn thuốc
            'note' => $this->faker->optional()->sentence(), // Ghi chú
            'file' => $this->faker->optional()->word() . '.pdf', // Tên tệp (PDF)
        ];
    }
}
