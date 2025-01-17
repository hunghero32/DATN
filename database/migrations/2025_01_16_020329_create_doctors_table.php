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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng users
            $table->string('doctor_avatar')->nullable(); // Hình ảnh đại diện của bác sĩ (có thể null)
            $table->string('doctor_name'); // Tên bác sĩ
            $table->text('doctor_bio')->nullable(); // Tiểu sử bác sĩ
            $table->foreignId('clinic_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng clinics
            $table->foreignId('specialty_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng specialties
            $table->integer('exp')->nullable(); // Kinh nghiệm bác sĩ (số năm kinh nghiệm)
            $table->string('file')->nullable(); // File đính kèm (có thể null)
            $table->boolean('approve')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
