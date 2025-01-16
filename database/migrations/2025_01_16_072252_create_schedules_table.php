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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng doctors
            $table->foreignId('clinic_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng clinics
            $table->time('time_start'); // Thời gian bắt đầu làm việc
            $table->time('time_end'); // Thời gian kết thúc làm việc
            $table->json('working_date'); // Ngày làm việc dưới dạng JSON (mảng ngày làm việc)
            $table->integer('max_patients')->unsigned(); // Số lượng bệnh nhân tối đa
            $table->boolean('status')->default(1); // Trạng thái lịch làm việc, mặc định là hoạt động (1)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
