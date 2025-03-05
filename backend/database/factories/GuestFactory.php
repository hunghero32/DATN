<?php

namespace Database\Factories;


use App\Models\Guest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guest>
 */
class GuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Guest::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'guest_name' => $this->faker->name(), // Tên khách 
            'gender' => $this->faker->randomElement(['male', 'female', 'other']), // Giới tính 
            'birthday' => $this->faker->optional()->date(), // Ngày sinh  (có thể null)
            'guest_phone' => $this->faker->optional()->phoneNumber(), // Số điện thoại  (có thể null)
            'guest_email' => $this->faker->unique()->safeEmail(), // Email  (có thể null)
            'address' => json_encode([
                'province' => $this->faker->city(),
                'district' => $this->faker->randomElement(['Quận 1', 'Quận 2', 'Quận 3', 'Huyện Bình Chánh']), // Tùy chỉnh
                'ward' => $this->faker->randomElement(['Phường 1', 'Phường 2', 'Phường 3', 'Xã Tân Thạnh']), // Tùy chỉnh
                'street' => $this->faker->streetAddress(),
                'details' => 'Số nhà ' . rand(1, 100) . ', ngõ ' . rand(1, 50),
            ]), // Địa chỉ 
            'file' => $this->faker->optional()->filePath(), // File  (có thể null)
        ];
    }
}
