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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('specialty_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng specialties
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng categories
            $table->string('services_name'); // Tên dịch vụ
            $table->text('description')->nullable(); // Mô tả dịch vụ (có thể null)
            $table->decimal('price', 15, 0); // Giá dịch vụ
            $table->integer('duration'); // Thời lượng dịch vụ (tính bằng phút)
            $table->boolean('status')->default(1); // Trạng thái dịch vụ, mặc định là hoạt động (1)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
