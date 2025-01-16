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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng categories
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khóa ngoại tham chiếu đến bảng users
            $table->string('slug')->unique(); // Slug bài viết (duy nhất)
            $table->string('title'); // Tiêu đề bài viết
            $table->text('content'); // Nội dung bài viết
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft'); // Trạng thái bài viết
            $table->timestamp('published_at')->nullable(); // Thời gian xuất bản (nếu có)
            $table->softDeletes(); // Hỗ trợ xóa mềm
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
