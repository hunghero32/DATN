<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('systems', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('banner'); // Đặt sau cột 'banner'
        });
    }

    public function down()
    {
        Schema::table('systems', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
