<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('personal_info', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title')->nullable();
            $table->string('tagline', 500)->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('location')->nullable();
            $table->string('bio_short', 500)->nullable();
            $table->text('bio_long')->nullable();
            $table->string('hero_greeting', 255)->nullable();
            $table->string('hero_tagline', 500)->nullable();
            $table->string('availability_status', 50)->default('available');
            $table->string('resume_url')->nullable();
            $table->string('profile_image_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personal_info');
    }
};
