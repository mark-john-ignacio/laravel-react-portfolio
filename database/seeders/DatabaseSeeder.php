<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Post;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
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

        if (! User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
            ]);
        }

        if (DB::table('experiences')->count() === 0) {
            Experience::factory()->count(3)->create();
        }

        if (DB::table('projects')->count() === 0) {
            Project::factory()->count(4)->create();
        }

        if (DB::table('posts')->count() === 0) {
            Post::factory()->count(3)->create();
        }
    }
}
