<?php

namespace Database\Factories;

use App\Models\Clinic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Clinic>
 */
class ClinicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Clinic::class;
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Tạo liên kết với bảng users
            'clinic_avatar' => $this->faker->imageUrl(100, 100, 'clinic', true, 'Faker'), // Hình ảnh 
            'clinic_name' => $this->faker->company(), // Tên công ty
            'clinic_bio' => $this->faker->paragraph(), // Mô tả 
            'clinic_phone' => $this->faker->phoneNumber(), // Số điện thoại 
            'email' => $this->faker->unique()->safeEmail(), // Email 
            'file' => $this->faker->filePath(), // File đường dẫn 
            'address' => json_encode([
                'province' => $this->faker->city(),
                'district' => $this->faker->randomElement(['Quận 1', 'Quận 2', 'Quận 3', 'Huyện Bình Chánh']), // Tùy chỉnh
                'ward' => $this->faker->randomElement(['Phường 1', 'Phường 2', 'Phường 3', 'Xã Tân Thạnh']), // Tùy chỉnh
                'street' => $this->faker->streetAddress(),
                'details' => 'Số nhà ' . rand(1, 100) . ', ngõ ' . rand(1, 50),
            ]), // Địa chỉ 
            'approve' => $this->faker->boolean(), // Trạng thái duyệt
        ];
    }
}
