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
        Schema::create('combos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clinic_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng clinics
            $table->string('combo_avatar')->nullable(); // Avatar của combo (có thể null)
            $table->string('combo_name'); // Tên của combo
            $table->text('combo_bio')->nullable(); // Mô tả combo (có thể null)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('combos');
    }
};
