<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('services', function (Blueprint $table) {
        // Gỡ bỏ foreign key trước
        $table->dropForeign(['category_id']);

        // Sau đó mới xóa cột
        $table->dropColumn('category_id');
    });
}


    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->nullable(); // hoặc không nullable nếu cần
        });
    }
};
