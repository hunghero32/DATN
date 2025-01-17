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
        Schema::create('systems', function (Blueprint $table) {
            $table->id(); // Khóa chính tự tăng
            $table->string('site_name'); // Tên trang web
            $table->text('site_description')->nullable(); // Mô tả trang web
            $table->string('site_keywords')->nullable(); // Từ khóa trang web
            $table->string('site_logo')->nullable(); // Đường dẫn logo trang web
            $table->string('site_favicon')->nullable(); // Đường dẫn favicon
            $table->string('site_url'); // URL trang web
            $table->text('meta_tags')->nullable(); // Thẻ meta SEO
            $table->string('default_language')->default('en'); // Ngôn ngữ mặc định
            $table->string('timezone')->default('UTC'); // Múi giờ
            $table->text('tracking_code')->nullable(); // Mã tracking (Google Analytics, ...)
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('systems');
    }
};
