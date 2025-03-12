<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Booking;

class BookingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_lay_danh_sach_dat_lich()
    {
        $response = $this->getJson('/api/doctor/bookings');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_bac_si_cap_nhat_trang_thai_dat_lich()
    {
        $doctor = User::factory()->create(['role' => 'doctor']);
        $booking = Booking::factory()->create(['status' => 'pending']);

        $response = $this->actingAs($doctor)->putJson("/api/doctor/bookings/{$booking->id}", [
            'status' => 'confirmed'
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Bác sĩ nhận lịch thành công.']);

        $this->assertDatabaseHas('bookings', [
            'id' => $booking->id,
            'status' => 'confirmed',
            'doctor_id' => $doctor->id
        ]);
    }
}
