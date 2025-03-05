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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng users
            $table->foreignId('booking_id')->nullable()->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng bookings (có thể null)
            $table->string('title'); // Tiêu đề thông báo
            $table->text('content'); // Nội dung thông báo
            $table->string('type'); // Loại thông báo
            $table->boolean('is_read')->default(0); // Trạng thái đã đọc, mặc định là chưa đọc (0)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
