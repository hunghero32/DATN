<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('specialties', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('image'); // Thay 'column_name' bằng cột phù hợp
        });
    }

    public function down()
    {
        Schema::table('specialties', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
