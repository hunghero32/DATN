<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Post::class;

    public function definition()
    {
        return [
            'category_id' => Category::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID danh mục
            'user_id' => User::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID người dùng
            'slug' => $this->faker->slug, // Slug ngẫu nhiên
            'title' => $this->faker->sentence, // Tiêu đề giả
            'content' => $this->faker->paragraphs(3, true), // Nội dung bài viết giả
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']), // Trạng thái giả
            'published_at' => $this->faker->optional()->dateTime, // Thời gian xuất bản giả (ngẫu nhiên hoặc null)
        ];
    }
}
