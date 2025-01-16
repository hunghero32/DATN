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
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guest_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng guests
            $table->foreignId('doctor_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng doctors
            $table->foreignId('clinic_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng clinics
            $table->foreignId('service_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng services
            $table->tinyInteger('rating')->unsigned(); // Đánh giá (1-5)
            $table->text('comments')->nullable(); // Bình luận
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending'); // Trạng thái phản hồi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};
