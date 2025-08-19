<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::firstOrCreate(['slug' => 'welcome-post'], [
            'title' => 'Welcome Post',
            'excerpt' => 'First blog entry placeholder.',
            'body' => "# Welcome\nThis is the first placeholder post in markdown.",
            'published_at' => now(),
        ]);
    }
}
