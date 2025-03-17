<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsDeletedToDoctorServiceTable extends Migration
{
    public function up()
    {
        Schema::table('doctor_service', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('service_id');
        });
    }

    public function down()
    {
        Schema::table('doctor_service', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
}
