<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        Experience::truncate();
        $experiences = [
            [
                'company' => 'HRWEB Inc.',
                'position' => 'Junior Programmer',
                'location' => 'Remote / Philippines',
                'start_date' => '2024-03-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Designing and implementing financial application modules with a focus on performance and reliability.',
                'achievements' => [
                    'Improved platform stability by 30% through refactoring and observability.',
                    'Implemented secure authentication and authorization layers.',
                    'Delivered responsive UI components with shadcn/ui and Tailwind CSS.'
                ],
                'technologies' => ['Laravel','React','Tailwind CSS','TypeScript','Inertia.js','Vite'],
                'company_url' => 'https://example.com/hrweb',
                'company_logo' => null,
                'sort_order' => 1,
            ],
            [
                'company' => 'AWS (via Edukasyon.ph)',
                'position' => 'Cloud Engineering Intern',
                'location' => 'Remote',
                'start_date' => '2023-09-01',
                'end_date' => '2024-01-31',
                'is_current' => false,
                'description' => 'Supported deployment and monitoring of AWS cloud infrastructure.',
                'achievements' => [
                    'Automated infrastructure tasks with Python scripts.',
                    'Implemented CloudWatch monitoring dashboards.',
                    'Applied AWS Well-Architected Framework principles.'
                ],
                'technologies' => ['AWS','Python','Linux','Bash','RDS','S3','EC2'],
                'company_url' => 'https://aws.amazon.com',
                'company_logo' => null,
                'sort_order' => 2,
            ],
            [
                'company' => 'Dei Gratia School Inc.',
                'position' => 'IT Support Intern',
                'location' => 'On-site',
                'start_date' => '2023-03-01',
                'end_date' => '2023-07-31',
                'is_current' => false,
                'description' => 'Provided hardware and network support across campus systems.',
                'achievements' => [
                    'Maintained workstation fleet and performed OS/software installations.',
                    'Diagnosed and resolved network connectivity issues.',
                    'Improved support response times with ticket triage process.'
                ],
                'technologies' => ['Windows','Networking','Hardware','Scripting'],
                'company_url' => null,
                'company_logo' => null,
                'sort_order' => 3,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::create($exp);
        }
    }
}
