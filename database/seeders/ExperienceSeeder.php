<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            ['role' => 'Laravel Developer', 'company' => 'Freelance', 'location' => 'Remote', 'start_date' => '2024-11-01', 'end_date' => null, 'is_current' => true, 'description' => 'Building and optimizing full-stack apps using Laravel, React, and AWS services.'],
            ['role' => 'AWS Intern', 'company' => 'Cloud Internship', 'location' => 'Remote', 'start_date' => '2024-06-01', 'end_date' => '2024-09-30', 'is_current' => false, 'description' => 'Implemented automation scripts and learned cloud architecture best practices.'],
            ['role' => 'IT Support', 'company' => 'Tech Support Co.', 'location' => 'On-site', 'start_date' => '2023-01-01', 'end_date' => '2023-12-31', 'is_current' => false, 'description' => 'Resolved technical issues and improved internal documentation.'],
        ];

        foreach ($experiences as $exp) {
            Experience::firstOrCreate([
                'role' => $exp['role'],
                'company' => $exp['company'],
                'start_date' => $exp['start_date'],
            ], $exp);
        }
    }
}
