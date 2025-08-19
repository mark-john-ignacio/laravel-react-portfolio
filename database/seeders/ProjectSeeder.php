<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            ['title' => 'AWS Resume Challenge', 'summary' => 'Infrastructure-as-Code deployment of a resume site on AWS.', 'description' => 'Deployed a resume challenge using S3, CloudFront, Route53, and CI/CD automation.', 'tech_stack' => ['AWS', 'CloudFront', 'S3', 'GitHub Actions'], 'repo_url' => null, 'live_url' => null, 'featured' => true],
            ['title' => 'Thesis Archiving System', 'summary' => 'System to store & search academic theses.', 'description' => 'Built a searchable archive for academic theses with role-based access.', 'tech_stack' => ['Laravel', 'MySQL', 'Inertia', 'React'], 'repo_url' => null, 'live_url' => null, 'featured' => true],
            ['title' => 'New Project Placeholder', 'summary' => 'Upcoming build in progress.', 'description' => 'Reserved slot for a future portfolio highlight.', 'tech_stack' => ['TBD'], 'repo_url' => null, 'live_url' => null, 'featured' => false],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate([
                'slug' => Str::slug($project['title']),
            ], array_merge($project, ['slug' => Str::slug($project['title'])]));
        }
    }
}
