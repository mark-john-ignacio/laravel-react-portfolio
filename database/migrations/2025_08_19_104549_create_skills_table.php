<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category'); // Frontend, Backend, Database, Tools, etc.
            $table->integer('proficiency_level')->default(1); // 1-5 scale
            $table->integer('years_experience')->nullable();
            $table->string('icon_name')->nullable(); // For lucide or other icon libraries
            $table->string('color')->nullable(); // Hex color for display
            $table->integer('sort_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
