<?php

namespace Database\Factories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Invoice::class;

    public function definition()
    {
        $totalAmount = $this->faker->randomFloat(0, 100, 10000); // Tổng tiền ngẫu nhiên từ 100 đến 10,000
        $discount = $this->faker->randomFloat(0, 0, $totalAmount * 0.2); // Giảm giá tối đa 20% của tổng tiền
        $tax = ($totalAmount - $discount) * 0.1; // Thuế 10% trên số tiền sau giảm giá

        return [
            'total_amount' => $totalAmount, // Tổng số tiền
            'discount' => $discount,       // Giảm giá
            'tax' => $tax,                 // Thuế
        ];
    }
}
