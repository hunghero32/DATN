<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('doctor_name', 255)->after('guest_id');
            $table->string('service_name', 255)->after('doctor_name');
            $table->decimal('service_price', 15, 0)->after('service_name');
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['doctor_name', 'service_name', 'service_price']);
        });
    }

};
