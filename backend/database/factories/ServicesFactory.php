<?php

namespace Database\Factories;

use App\Models\Services;
use App\Models\Specialty;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Services>
 */
class ServicesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Services::class;

    public function definition()
    {
        return [
            'specialty_id' => Specialty::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID chuyên môn
            'category_id' => Category::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID danh mục
            'services_name' => $this->faker->words(3, true), // Tên dịch vụ 
            'description' => $this->faker->optional()->paragraph(), // Mô tả dịch vụ  (có thể null)
            'price' => $this->faker->randomFloat(0, 100, 10000), // Giá dịch vụ  (từ 100 đến 10,000)
            'duration' => $this->faker->numberBetween(15, 180), // Thời lượng dịch vụ  (15 đến 180 phút)
            'status' => $this->faker->boolean(90), // Trạng thái  (90% là true)
        ];
    }
}
