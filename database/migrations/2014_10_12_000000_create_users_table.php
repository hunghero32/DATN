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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('social_id')->nullable(); // ID từ mạng xã hội
            $table->string('social_provider')->nullable(); // Nhà cung cấp mạng xã hội
            $table->timestamp('email_verified_at')->nullable(); // Thời gian xác thực email
            $table->string('password'); // Mật khẩu mã hóa (có thể dài)
            $table->enum('role', ['admin', 'clinic', 'doctor', 'guest'])->default('guest'); // Vai trò
            $table->rememberToken(); // Token "remember me"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
