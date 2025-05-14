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
        Schema::table('doctor_service', function (Blueprint $table) {
            $table->decimal('doctor_fee', 15, 0)->default(0)->after('service_id'); // Số tiền trả bác sĩ
            $table->text('note')->nullable()->after('doctor_fee');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doctor_service', function (Blueprint $table) {
            $table->dropColumn('doctor_fee');
            $table->dropColumn('note');
        });
    }
};
