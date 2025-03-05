<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Category::class;
    public function definition(): array
    {
        return [
            'parent_id' => $this->faker->optional()->randomElement([null, Category::inRandomOrder()->first()?->id]), // Tạo parent_id ngẫu nhiên
            'name' => $this->faker->word(), // Tên danh mục 
            'description' => $this->faker->paragraph(), // Mô tả danh mục 
        ];
    }
}
