<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('personal_info', function (Blueprint $table) {
            $table->text('contact_blurb')->nullable()->after('bio_long');
        });
    }

    public function down(): void
    {
        Schema::table('personal_info', function (Blueprint $table) {
            $table->dropColumn('contact_blurb');
        });
    }
};
