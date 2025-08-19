<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 'Advanced', 'sort_order' => 1],
            ['name' => 'React', 'category' => 'Frontend', 'level' => 'Advanced', 'sort_order' => 2],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'level' => 'Advanced', 'sort_order' => 3],
            ['name' => 'AWS', 'category' => 'Cloud', 'level' => 'Intermediate', 'sort_order' => 4],
            ['name' => 'MySQL', 'category' => 'Database', 'level' => 'Advanced', 'sort_order' => 5],
        ];

        foreach ($skills as $skill) {
            Skill::firstOrCreate(['name' => $skill['name']], $skill);
        }
    }
}
