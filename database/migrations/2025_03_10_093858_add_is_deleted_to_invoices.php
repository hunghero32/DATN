<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->boolean('isDeleted')->default(0)->after('tax'); // Đặt sau cột 'tax'
        });
    }

    public function down()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('isDeleted');
        });
    }
};
