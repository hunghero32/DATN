<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Notification::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID người dùng
            'booking_id' => Booking::inRandomOrder()->first()->id ?? null, // Lấy ngẫu nhiên ID đặt lịch hoặc null
            'title' => $this->faker->sentence(), // Tiêu đề thông báo 
            'content' => $this->faker->paragraph(), // Nội dung thông báo 
            'type' => $this->faker->randomElement(['info', 'warning', 'success']), // Loại thông báo 
            'is_read' => $this->faker->boolean(50), // Trạng thái đã đọc (true/false)
        ];
    }
}
