<?php

namespace Database\Seeders;

use App\Models\TechStack;
use Illuminate\Database\Seeder;

class TechStackSeeder extends Seeder
{
    public function run(): void
    {
        TechStack::truncate();

        $data = [
            // Frontend
            ['name' => 'React', 'category' => 'frontend', 'proficiency_level' => 85, 'icon' => 'react', 'color' => '#61dafb', 'is_featured' => true, 'sort_order' => 1],
            ['name' => 'TypeScript', 'category' => 'frontend', 'proficiency_level' => 80, 'icon' => 'typescript', 'color' => '#3178c6', 'is_featured' => true, 'sort_order' => 2],
            ['name' => 'Tailwind CSS', 'category' => 'frontend', 'proficiency_level' => 78, 'icon' => 'tailwind', 'color' => '#38bdf8', 'is_featured' => true, 'sort_order' => 3],
            ['name' => 'Next.js', 'category' => 'frontend', 'proficiency_level' => 60, 'icon' => 'nextjs', 'color' => '#000000', 'is_featured' => false, 'sort_order' => 4],
            ['name' => 'Vue.js', 'category' => 'frontend', 'proficiency_level' => 55, 'icon' => 'vue', 'color' => '#42b883', 'is_featured' => false, 'sort_order' => 5],
            // Backend
            ['name' => 'Laravel', 'category' => 'backend', 'proficiency_level' => 85, 'icon' => 'laravel', 'color' => '#ff2d20', 'is_featured' => true, 'sort_order' => 1],
            ['name' => 'PHP', 'category' => 'backend', 'proficiency_level' => 80, 'icon' => 'php', 'color' => '#777bb4', 'is_featured' => true, 'sort_order' => 2],
            ['name' => 'Node.js', 'category' => 'backend', 'proficiency_level' => 65, 'icon' => 'node', 'color' => '#339933', 'is_featured' => false, 'sort_order' => 3],
            ['name' => 'Python', 'category' => 'backend', 'proficiency_level' => 60, 'icon' => 'python', 'color' => '#3776ab', 'is_featured' => false, 'sort_order' => 4],
            // Database
            ['name' => 'MySQL', 'category' => 'database', 'proficiency_level' => 75, 'icon' => 'mysql', 'color' => '#4479a1', 'is_featured' => true, 'sort_order' => 1],
            ['name' => 'PostgreSQL', 'category' => 'database', 'proficiency_level' => 55, 'icon' => 'postgresql', 'color' => '#336791', 'is_featured' => false, 'sort_order' => 2],
            ['name' => 'SQLite', 'category' => 'database', 'proficiency_level' => 70, 'icon' => 'sqlite', 'color' => '#0c6e9c', 'is_featured' => false, 'sort_order' => 3],
            ['name' => 'MongoDB', 'category' => 'database', 'proficiency_level' => 40, 'icon' => 'mongodb', 'color' => '#4ea94b', 'is_featured' => false, 'sort_order' => 4],
            // Cloud
            ['name' => 'AWS', 'category' => 'cloud', 'proficiency_level' => 65, 'icon' => 'aws', 'color' => '#ff9900', 'is_featured' => true, 'sort_order' => 1],
            ['name' => 'Docker', 'category' => 'cloud', 'proficiency_level' => 60, 'icon' => 'docker', 'color' => '#2496ed', 'is_featured' => false, 'sort_order' => 2],
            ['name' => 'Linux', 'category' => 'cloud', 'proficiency_level' => 70, 'icon' => 'linux', 'color' => '#000000', 'is_featured' => false, 'sort_order' => 3],
            ['name' => 'Git', 'category' => 'cloud', 'proficiency_level' => 75, 'icon' => 'git', 'color' => '#f34f29', 'is_featured' => false, 'sort_order' => 4],
            // Tools
            ['name' => 'Vite', 'category' => 'tools', 'proficiency_level' => 70, 'icon' => 'vite', 'color' => '#646cff', 'is_featured' => false, 'sort_order' => 1],
            ['name' => 'Webpack', 'category' => 'tools', 'proficiency_level' => 55, 'icon' => 'webpack', 'color' => '#8dd6f9', 'is_featured' => false, 'sort_order' => 2],
            ['name' => 'Jest', 'category' => 'tools', 'proficiency_level' => 45, 'icon' => 'jest', 'color' => '#944058', 'is_featured' => false, 'sort_order' => 3],
            ['name' => 'Cypress', 'category' => 'tools', 'proficiency_level' => 40, 'icon' => 'cypress', 'color' => '#00b597', 'is_featured' => false, 'sort_order' => 4],
        ];

        foreach ($data as $row) {
            TechStack::create($row);
        }
    }
}
