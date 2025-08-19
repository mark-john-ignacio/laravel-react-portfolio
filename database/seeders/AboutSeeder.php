<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        About::query()->firstOrCreate([], [
            'summary' => 'Passionate Laravel & React developer focused on building maintainable, scalable web applications.',
            'timeline' => [
                ['year' => '2025', 'title' => 'Laravel Developer', 'description' => 'Building full-stack applications with Laravel, React, Inertia, and AWS.'],
                ['year' => '2024', 'title' => 'AWS Internship', 'description' => 'Worked on cloud infrastructure automation & deployments.'],
                ['year' => '2023', 'title' => 'IT Support', 'description' => 'Provided enterprise technical support & process improvements.'],
            ],
        ]);
    }
}
