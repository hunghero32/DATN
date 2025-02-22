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
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng bookings
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng doctors
            $table->foreignId('guest_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng guests
            $table->text('diagnosis')->nullable(); // Chẩn đoán
            $table->text('note')->nullable(); // Ghi chú
            $table->string('file')->nullable(); // Tệp kết quả (PDF, hình ảnh...)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
