<?php

namespace Database\Factories;

use App\Models\Feedback;
use App\Models\Guest;
use App\Models\Doctor;
use App\Models\Clinic;
use App\Models\Services;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Feedback::class;

    public function definition()
    {
        return [
            'guest_id' => Guest::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID khách hàng
            'doctor_id' => $this->faker->optional()->randomElement(Doctor::pluck('id')->toArray()), // Ngẫu nhiên ID bác sĩ (hoặc null)
            'clinic_id' => $this->faker->optional()->randomElement(Clinic::pluck('id')->toArray()), // Ngẫu nhiên ID phòng khám (hoặc null)
            'service_id' => $this->faker->optional()->randomElement(Services::pluck('id')->toArray()), // Ngẫu nhiên ID dịch vụ (hoặc null)
            'rating' => $this->faker->numberBetween(1, 5), // Đánh giá từ 1-5
            'comments' => $this->faker->optional()->sentence(), // Bình luận giả (hoặc null)
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']), // Trạng thái giả
        ];
    }
}
