<?php

namespace Database\Factories;

use App\Models\Combo;
use App\Models\Clinic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Combo>
 */
class ComboFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Combo::class;

    public function definition()
    {
        return [
            'clinic_id' => Clinic::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID phòng khám
            'combo_avatar' => $this->faker->optional()->imageUrl(300, 300, 'avatar'), // Ảnh avatar (có thể null)
            'combo_name' => $this->faker->words(3, true), // Tên combo
            'combo_bio' => $this->faker->optional()->paragraph(), // Mô tả combo (có thể null)
        ];
    }
}
