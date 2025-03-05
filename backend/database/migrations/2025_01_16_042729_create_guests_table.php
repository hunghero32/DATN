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
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng users
            $table->string('guest_name'); // Tên khách
            $table->enum('gender', ['male', 'female', 'other'])->nullable(); // Giới tính của khách (male/female/other)
            $table->date('birthday')->nullable(); // Ngày sinh của khách (có thể null)
            $table->string('guest_phone')->nullable(); // Số điện thoại khách (có thể null)
            $table->string('guest_email')->unique()->nullable(); // Email khách (duy nhất, có thể null)
            $table->json('address')->nullable(); // Địa chỉ khách (có thể null)
            $table->string('file')->nullable(); // File đính kèm (có thể null)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
