<?php

namespace Database\Factories;

use App\Models\MedicalRecord;
use App\Models\Guest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalRecord>
 */
class MedicalRecordFactory extends Factory
{
    protected $model = MedicalRecord::class;

    public function definition()
    {
        return [
            'guest_id' => Guest::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID khách hàng
            'BHYT' => $this->faker->optional()->regexify('[A-Z0-9]{10}'), // Mã bảo hiểm 
            'medical_condition' => $this->faker->optional()->sentence(), // Tình trạng bệnh 
            'medications' => $this->faker->optional()->words(3, true), // Thuốc đang sử dụng 
            'allergies' => $this->faker->optional()->words(3, true), // Dị ứng 
            'family_history' => $this->faker->optional()->sentence(), // Tiền sử bệnh gia đình 
            'treatment' => $this->faker->optional()->paragraph(), // Quá trình điều trị 
            'note' => $this->faker->optional()->sentence(), // Ghi chú 
        ];
    }
}
