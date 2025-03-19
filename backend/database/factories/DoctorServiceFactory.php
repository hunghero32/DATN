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
        ];
    }
}
