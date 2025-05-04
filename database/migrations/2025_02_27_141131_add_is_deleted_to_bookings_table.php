<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(false)->after('status'); // Thêm cột isDeleted
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
