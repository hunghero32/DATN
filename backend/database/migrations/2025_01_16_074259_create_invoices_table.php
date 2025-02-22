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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->decimal('total_amount', 15, 0); // Tổng số tiền (định dạng số thập phân)
            $table->decimal('discount', 15, 0)->default(0); // Giảm giá (định dạng số thập phân)
            $table->decimal('tax', 15, 0)->default(0); // Thuế (định dạng số thập phân)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
