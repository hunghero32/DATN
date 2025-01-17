<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Combo;
use App\Models\Services;
use App\Models\Guest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Booking::class;

    public function definition()
    {
        return [
            'doctor_id' => Doctor::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID bác sĩ
            'combo_id' => Combo::inRandomOrder()->first()->id ?? null, // Lấy ngẫu nhiên ID combo hoặc null
            'service_id' => Services::inRandomOrder()->first()->id ?? null, // Lấy ngẫu nhiên ID dịch vụ hoặc null
            'guest_id' => Guest::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID khách
            'booking_date' => $this->faker->date(), // Ngày đặt lịch
            'booking_time' => $this->faker->time(), // Giờ đặt lịch
            'notes' => $this->faker->optional()->sentence(), // Ghi chú (có thể null)
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'completed', 'canceled']), // Trạng thái hợp lệ
        ];
    }
}
