<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('medical_records', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('note'); // Đặt sau cột 'note'
        });
    }

    public function down()
    {
        Schema::table('medical_records', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
