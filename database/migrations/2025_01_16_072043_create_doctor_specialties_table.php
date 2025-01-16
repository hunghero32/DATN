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
        Schema::create('doctor_specialties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng doctors
            $table->foreignId('clinic_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng clinics
            $table->foreignId('specialty_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng specialties
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor_specialties');
    }
};
