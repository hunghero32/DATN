<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('doctor_specialties', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('specialty_id'); // Thay 'column_name' bằng cột phù hợp
        });
    }

    public function down()
    {
        Schema::table('doctor_specialties', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
