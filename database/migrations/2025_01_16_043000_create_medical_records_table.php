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
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guest_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng guests
            $table->string('BHYT')->nullable(); // Mã bảo hiểm y tế (có thể null)
            $table->text('medical_condition')->nullable(); // Tình trạng bệnh
            $table->text('medications')->nullable(); // Danh sách thuốc đang sử dụng
            $table->text('allergies')->nullable(); // Dị ứng
            $table->text('family_history')->nullable(); // Tiền sử bệnh gia đình
            $table->text('treatment')->nullable(); // Quá trình điều trị
            $table->text('note')->nullable(); // Ghi chú
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
