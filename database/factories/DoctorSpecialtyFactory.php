<?php

namespace Database\Factories;

use App\Models\DoctorSpecialty;
use App\Models\Doctor;
use App\Models\Clinic;
use App\Models\Specialty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DoctorSpecialty>
 */
class DoctorSpecialtyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = DoctorSpecialty::class;

    public function definition()
    {
        return [
            'doctor_id' => Doctor::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID bác sĩ
            'clinic_id' => Clinic::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID phòng khám
            'specialty_id' => Specialty::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID chuyên khoa
        ];
    }
}
