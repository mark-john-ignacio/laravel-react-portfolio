<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $driver = DB::getDriverName();
        if ($driver === 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            Project::truncate();
            ProjectCategory::truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
        } elseif ($driver === 'sqlite') {
            // SQLite requires using PRAGMA; need to wrap truncation in foreign key off/on
            DB::statement('PRAGMA foreign_keys = OFF');
            Project::query()->delete(); // truncate not resetting autoincrement fully; acceptable for seeding
            ProjectCategory::query()->delete();
            DB::statement("DELETE FROM sqlite_sequence WHERE name IN ('projects','project_categories')");
            DB::statement('PRAGMA foreign_keys = ON');
        } else {
            // Fallback: try standard deletes
            Project::query()->delete();
            ProjectCategory::query()->delete();
        }

        $categories = [
            ['name' => 'Cloud', 'slug' => 'cloud', 'description' => 'Cloud & serverless projects', 'color' => '#0ea5e9'],
            ['name' => 'Web App', 'slug' => 'web-app', 'description' => 'Full stack web applications', 'color' => '#6366f1'],
            ['name' => 'Open Source', 'slug' => 'open-source', 'description' => 'Open source contributions', 'color' => '#10b981'],
        ];

        $categoryModels = collect();
        foreach ($categories as $cat) {
            $categoryModels->push(ProjectCategory::create($cat));
        }

        $projects = [
            [
                'title' => 'AWS Cloud Resume Challenge',
                'short_description' => 'Serverless resume leveraging Lambda, API Gateway, DynamoDB, and CloudFront.',
                'long_description' => 'Implemented infrastructure-as-code, CI/CD pipeline, and analytics tracking. Demonstrates serverless patterns and edge caching strategies.',
                'technologies' => ['AWS Lambda','API Gateway','DynamoDB','CloudFront','S3','Terraform'],
                'features' => ['Serverless visitor counter','Automated deployment','Edge optimized distribution'],
                'challenges' => ['Cold start optimization','Securing API endpoints'],
                'github_url' => 'https://github.com/mark-john-ignacio/cloud-resume',
                'live_url' => 'https://example.com/resume',
                'image_url' => null,
                'gallery_images' => [],
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Financial Management Application',
                'short_description' => 'Modern financial tracking and reporting tool built with Laravel + React.',
                'long_description' => 'Developed modular architecture enabling rapid feature delivery, integrated authentication, and role-based authorization with advanced reporting dashboards.',
                'technologies' => ['Laravel','React','TypeScript','Tailwind CSS','MySQL'],
                'features' => ['Real-time data visualization','Role-based access control','Responsive UI components'],
                'challenges' => ['Query optimization','Complex authorization rules'],
                'github_url' => null,
                'live_url' => null,
                'image_url' => null,
                'gallery_images' => [],
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Online Thesis Archiving System',
                'short_description' => 'Secure digital repository for academic thesis documents.',
                'long_description' => 'Implemented advanced search, document categorization, and secure access layers improving retrieval efficiency by 40%.',
                'technologies' => ['PHP','MySQL','Bootstrap'],
                'features' => ['Advanced search','Document management','Role-based access'],
                'challenges' => ['Search performance','Data normalization'],
                'github_url' => null,
                'live_url' => null,
                'image_url' => null,
                'gallery_images' => [],
                'is_featured' => false,
                'is_published' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Portfolio Website',
                'short_description' => 'Current portfolio built with Laravel, Inertia, React, and TypeScript.',
                'long_description' => 'Showcases professional experiences, projects, and technology stack with an admin CMS for dynamic content management.',
                'technologies' => ['Laravel','Inertia.js','React','TypeScript','Tailwind CSS','Vite'],
                'features' => ['CMS driven content','Dynamic animations','Responsive design'],
                'challenges' => ['Content modeling','Animation performance'],
                'github_url' => 'https://github.com/mark-john-ignacio/laravel-react-portfolio',
                'live_url' => null,
                'image_url' => null,
                'gallery_images' => [],
                'is_featured' => false,
                'is_published' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($projects as $proj) {
            $categoriesToAttach = $categoryModels->random(rand(1, $categoryModels->count()))->pluck('id')->toArray();
            /** @var Project $p */
            $p = Project::create($proj + ['slug' => Str::slug($proj['title'])]);
            $p->categories()->attach($categoriesToAttach);
        }
    }
}
