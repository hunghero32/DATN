<?php

namespace Database\Factories;

use App\Models\Schedule;
use App\Models\Doctor;
use App\Models\Clinic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Schedule::class;

    public function definition()
    {
        return [
            'doctor_id' => Doctor::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID bác sĩ
            'clinic_id' => Clinic::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID phòng khám
            'time_start' => $this->faker->time('H:i:s'), // Giờ bắt đầu làm việc
            'time_end' => $this->faker->time('H:i:s'), // Giờ kết thúc làm việc
            'working_date' => $this->faker->unique()->date() . ',' . $this->faker->unique()->date(), // Mảng các ngày làm việc
            'max_patients' => $this->faker->numberBetween(5, 50), // Số bệnh nhân tối đa
            'status' => $this->faker->boolean(50), // Trạng thái (true/false)
        ];
    }
}
