<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Services;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DoctorService>
 */
class DoctorServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'doctor_id' => Doctor::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID bác sĩ
            'service_id' => Services::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID dịch vụ
            'doctor_fee' =>  $this->faker->randomFloat(0, 100000, 1000000), // Random lợi nhuận bác sĩ (từ 100,000 đến 1,000,000)
        ];
    }
}
