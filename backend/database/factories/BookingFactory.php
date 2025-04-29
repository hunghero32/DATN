<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Doctor;
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
        // Lấy random doctor
        $doctor = Doctor::inRandomOrder()->first();
        // Lấy random service
        $service = Services::inRandomOrder()->first();
        return [
            'doctor_id' => $doctor->id, // Lấy ngẫu nhiên ID bác sĩ
            'service_id' => $service->id ?? null, // Lấy ngẫu nhiên ID dịch vụ hoặc null
            'guest_id' => Guest::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID khách
            'doctor_name' => $doctor->doctor_name, // Lấy tên bác sĩ
            'service_name' => $service->services_name, // Lấy dịch vụ
            'service_price' => $service->price, // Lấy dịch vụ 
            'booking_date' => now()->toDateString(), // Ngày đặt lịch
            'booking_time' => $this->faker->time(), // Giờ đặt lịch
            'notes' => $this->faker->optional()->sentence(), // Ghi chú (có thể null)
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'completed', 'canceled']), // Trạng thái hợp lệ
        ];
    }
}
