<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng doctors (có thể null)
            $table->foreignId('combo_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng combos (có thể null)
            $table->foreignId('service_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng services (có thể null)
            $table->foreignId('guest_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng guests
            $table->date('booking_date'); // Ngày đặt lịch
            $table->time('booking_time'); // Giờ đặt lịch
            $table->text('notes')->nullable(); // Ghi chú (có thể null)
            $table->enum('status', ['pending', 'confirmed', 'completed', 'canceled'])->default('pending'); // Trạng thái đặt lịch
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
