<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('guests', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('file'); // Đặt sau cột 'file'
        });
    }

    public function down()
    {
        Schema::table('guests', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
