<?php

namespace Database\Factories;

use App\Models\Specialty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Specialty>
 */
class SpecialtyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Specialty::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(), // Tên 
            'description' => $this->faker->paragraph(), // Mô tả 
            'icon' => $this->faker->imageUrl(100, 100, 'icons'), // Icon 
            'image' => $this->faker->imageUrl(800, 600, 'specialties'), // Hình ảnh 
        ];
    }
}
