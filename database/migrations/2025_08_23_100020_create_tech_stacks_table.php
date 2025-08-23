<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tech_stacks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->unsignedTinyInteger('proficiency_level')->default(0); // 0-100 or scale mapping
            $table->string('icon')->nullable();
            $table->string('color', 32)->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tech_stacks');
    }
};
