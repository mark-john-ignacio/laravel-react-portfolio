<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
    Experience::factory()->count(3)->create();
    Project::factory()->count(4)->create();
    Post::factory()->count(3)->create();
}
