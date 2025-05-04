<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('feedback', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('status'); // Đặt sau cột 'status'
        });
    }

    public function down()
    {
        Schema::table('feedback', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
