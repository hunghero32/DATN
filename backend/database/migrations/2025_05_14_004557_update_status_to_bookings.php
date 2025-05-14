<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            DB::statement("ALTER TABLE `bookings` MODIFY `status` ENUM('pending','confirmed','examining','completed', 'canceled') DEFAULT 'pending'");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            DB::statement("ALTER TABLE `bookings` MODIFY `status` ENUM('pending','confirmed','completed', 'canceled') DEFAULT 'pending'");
        });
    }
};
