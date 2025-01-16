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
        Schema::create('clinics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Liên kết với bảng users
            $table->string('clinic_avatar')->nullable(); // Avatar của phòng khám
            $table->string('clinic_name'); // Tên phòng khám
            $table->text('clinic_bio')->nullable(); // Giới thiệu về phòng khám
            $table->string('clinic_phone')->nullable(); // Số điện thoại phòng khám
            $table->string('email')->unique()->nullable(); // Email phòng khám
            $table->string('file')->nullable(); // File đính kèm (nếu có)
            $table->json('address')->nullable(); // Địa chỉ phòng khám (có thể null)
            $table->boolean('approve')->default(0); // Trạng thái duyệt (0: chưa duyệt, 1: đã duyệt)
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinics');
    }
};
