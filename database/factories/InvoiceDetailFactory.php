<?php

namespace Database\Factories;

use App\Models\InvoiceDetail;
use App\Models\Invoice;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvoiceDetail>
 */
class InvoiceDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = InvoiceDetail::class;

    public function definition()
    {
        return [
            'invoice_id' => Invoice::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID hóa đơn
            'booking_id' => Booking::inRandomOrder()->first()->id, // Lấy ngẫu nhiên ID đặt lịch
        ];
    }
}
