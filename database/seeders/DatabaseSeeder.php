<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Experience;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'mark@example.com'],
            [
                'name' => 'Mark John Ignacio',
                'email_verified_at' => now(),
            ],
        );

        // Experiences (timeline)
        Experience::query()->delete();
        Experience::create([
            'company' => 'Freelance',
            'role' => 'Full-stack Developer',
            'start_date' => '2021-01-01',
            'is_current' => true,
            'summary' => 'Building Laravel + React apps with a focus on DX, performance, and clean UI.',
            'highlights' => [
                'Shipped production-grade SaaS dashboards with Inertia + shadcn/ui.',
                'Optimized database and caching strategies for low-latency pages.',
                'Led component libraries with Tailwind and Radix primitives.',
            ],
            'order' => 1,
        ]);

        // Projects
        Project::query()->delete();
        Project::create([
            'title' => 'Terminal Portfolio',
            'slug' => 'terminal-portfolio',
            'description' => "A terminal-themed portfolio powered by Laravel + Inertia React + shadcn/ui with neon accents.",
            'technologies' => ['Laravel', 'Inertia', 'React', 'TypeScript', 'Tailwind', 'shadcn/ui'],
            'featured' => true,
            'github_url' => null,
            'live_url' => null,
            'order' => 1,
        ]);
        Project::create([
            'title' => 'Admin CMS',
            'slug' => 'admin-cms',
            'description' => 'Matrix-style admin with CRUD for projects and experience using shadcn data patterns.',
            'technologies' => ['Laravel', 'Inertia', 'React', 'Tailwind'],
            'featured' => true,
            'order' => 2,
        ]);
    }
}
