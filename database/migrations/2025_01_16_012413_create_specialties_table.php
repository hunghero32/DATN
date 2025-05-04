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
        Schema::create('specialties', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Tên của specialty
            $table->text('description')->nullable(); // Mô tả specialty (có thể null)
            $table->string('icon')->nullable(); // Hình ảnh icon (có thể null)
            $table->string('image')->nullable(); // Hình ảnh chi tiết (có thể null)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specialties');
    }
};
