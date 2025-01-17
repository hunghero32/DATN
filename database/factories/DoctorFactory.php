<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\User;
use App\Models\Clinic;
use App\Models\Specialty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Doctor::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID người dùng
            'doctor_avatar' => $this->faker->imageUrl(100, 100, 'people'), // Hình ảnh bác sĩ 
            'doctor_name' => $this->faker->name(), // Tên bác sĩ 
            'doctor_bio' => $this->faker->paragraph(), // Tiểu sử bác sĩ 
            'clinic_id' => Clinic::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID phòng khám
            'specialty_id' => Specialty::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID chuyên môn
            'exp' => $this->faker->numberBetween(1, 30), // Kinh nghiệm bác sĩ (số năm, từ 1 đến 30)
            'file' => $this->faker->optional()->filePath(), // File đính kèm (có thể null)
            'approve' => $this->faker->boolean(), // Trạng thái phê duyệt ngẫu nhiên (true/false)
        ];
    }
}
