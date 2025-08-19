<?php

namespace Database\Seeders;

use App\Models\AboutInfo;
use App\Models\BlogPost;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default user for blog posts
        $user = User::firstOrCreate([
            'email' => 'mark@example.com'
        ], [
            'name' => 'Mark John Ignacio',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        // About Information
        AboutInfo::create([
            'key' => 'profile',
            'title' => 'About Me',
            'content' => 'I am a passionate Laravel Developer with experience in building robust web applications. I have a strong background in full-stack development, cloud technologies, and modern web frameworks.',
            'metadata' => [
                'name' => 'Mark John Ignacio',
                'title' => 'Laravel Developer',
                'location' => 'Philippines',
                'email' => 'mark@example.com',
                'phone' => '+63 xxx xxx xxxx',
                'linkedin' => 'https://linkedin.com/in/mark-john-ignacio',
                'github' => 'https://github.com/mark-john-ignacio'
            ]
        ]);

        // Skills
        $skills = [
            // Backend
            ['name' => 'PHP', 'category' => 'Backend', 'proficiency_level' => 5, 'years_experience' => 3, 'icon_name' => 'code', 'color' => '#777BB4', 'is_featured' => true],
            ['name' => 'Laravel', 'category' => 'Backend', 'proficiency_level' => 5, 'years_experience' => 3, 'icon_name' => 'code', 'color' => '#FF2D20', 'is_featured' => true],
            ['name' => 'Node.js', 'category' => 'Backend', 'proficiency_level' => 4, 'years_experience' => 2, 'icon_name' => 'server', 'color' => '#339933'],
            
            // Frontend
            ['name' => 'React', 'category' => 'Frontend', 'proficiency_level' => 4, 'years_experience' => 2, 'icon_name' => 'code2', 'color' => '#61DAFB', 'is_featured' => true],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'proficiency_level' => 4, 'years_experience' => 2, 'icon_name' => 'code2', 'color' => '#3178C6', 'is_featured' => true],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'proficiency_level' => 5, 'years_experience' => 4, 'icon_name' => 'code2', 'color' => '#F7DF1E'],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'proficiency_level' => 5, 'years_experience' => 2, 'icon_name' => 'palette', 'color' => '#06B6D4'],
            
            // Database
            ['name' => 'MySQL', 'category' => 'Database', 'proficiency_level' => 4, 'years_experience' => 3, 'icon_name' => 'database', 'color' => '#4479A1'],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'proficiency_level' => 3, 'years_experience' => 1, 'icon_name' => 'database', 'color' => '#336791'],
            
            // Tools & Cloud
            ['name' => 'AWS', 'category' => 'Cloud', 'proficiency_level' => 4, 'years_experience' => 1, 'icon_name' => 'cloud', 'color' => '#FF9900', 'is_featured' => true],
            ['name' => 'Docker', 'category' => 'Tools', 'proficiency_level' => 3, 'years_experience' => 1, 'icon_name' => 'package', 'color' => '#2496ED'],
            ['name' => 'Git', 'category' => 'Tools', 'proficiency_level' => 4, 'years_experience' => 3, 'icon_name' => 'git-branch', 'color' => '#F05032'],
        ];

        foreach ($skills as $index => $skill) {
            Skill::create(array_merge($skill, ['sort_order' => $index]));
        }

        // Experiences
        $experiences = [
            [
                'title' => 'Laravel Developer',
                'company' => 'HRWeb Inc.',
                'location' => 'Remote',
                'start_date' => '2023-01-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Developing and maintaining web applications using Laravel framework. Working on feature development, bug fixes, and performance optimization.',
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Vue.js'],
                'employment_type' => 'Full-time',
                'sort_order' => 0,
                'is_featured' => true,
            ],
            [
                'title' => 'AWS Cloud Intern',
                'company' => 'Amazon Web Services',
                'location' => 'Remote',
                'start_date' => '2022-06-01',
                'end_date' => '2022-08-31',
                'is_current' => false,
                'description' => 'Gained hands-on experience with AWS services including EC2, S3, Lambda, and CloudFormation. Worked on cloud infrastructure projects and learned best practices for cloud architecture.',
                'technologies' => ['AWS', 'Python', 'CloudFormation', 'Lambda', 'S3'],
                'employment_type' => 'Internship',
                'sort_order' => 1,
                'is_featured' => true,
            ],
            [
                'title' => 'IT Support Specialist',
                'company' => 'Tech Solutions Inc.',
                'location' => 'Metro Manila, Philippines',
                'start_date' => '2021-01-01',
                'end_date' => '2022-05-31',
                'is_current' => false,
                'description' => 'Provided technical support to end users, troubleshot hardware and software issues, and maintained computer systems and networks.',
                'technologies' => ['Windows', 'Active Directory', 'Office 365', 'Network Administration'],
                'employment_type' => 'Full-time',
                'sort_order' => 2,
                'is_featured' => false,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::create($experience);
        }

        // Projects
        $projects = [
            [
                'title' => 'AWS Resume Challenge',
                'slug' => 'aws-resume-challenge',
                'description' => 'A cloud-based resume website built with AWS services including S3, CloudFront, Lambda, and DynamoDB.',
                'long_description' => 'Built a serverless resume website using AWS services. The project demonstrates proficiency in cloud architecture, featuring a static website hosted on S3, CloudFront distribution for global content delivery, Lambda functions for dynamic content, and DynamoDB for visitor tracking.',
                'image_url' => '/images/projects/aws-resume.jpg',
                'demo_url' => 'https://resume.markjohnignacio.com',
                'github_url' => 'https://github.com/mark-john-ignacio/aws-resume-challenge',
                'technologies' => ['AWS', 'S3', 'CloudFront', 'Lambda', 'DynamoDB', 'JavaScript'],
                'completed_at' => '2022-09-15',
                'sort_order' => 0,
                'is_featured' => true,
                'status' => 'completed',
            ],
            [
                'title' => 'Thesis Archiving System',
                'slug' => 'thesis-archiving-system',
                'description' => 'A web-based system for managing and archiving academic thesis documents with search and categorization features.',
                'long_description' => 'Developed a comprehensive thesis archiving system for academic institutions. Features include document upload and management, advanced search functionality, categorization system, user role management, and analytics dashboard for administrators.',
                'image_url' => '/images/projects/thesis-system.jpg',
                'demo_url' => null,
                'github_url' => 'https://github.com/mark-john-ignacio/thesis-archiving-system',
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'jQuery'],
                'completed_at' => '2023-03-20',
                'sort_order' => 1,
                'is_featured' => true,
                'status' => 'completed',
            ],
            [
                'title' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'description' => 'A modern, responsive portfolio website built with Laravel, React, and Inertia.js.',
                'long_description' => 'This very website! Built using modern web technologies including Laravel for the backend, React with TypeScript for the frontend, Inertia.js for seamless SPA experience, and Tailwind CSS for styling. Features a complete CMS for content management.',
                'image_url' => '/images/projects/portfolio.jpg',
                'demo_url' => 'https://markjohnignacio.com',
                'github_url' => 'https://github.com/mark-john-ignacio/laravel-react-portfolio',
                'technologies' => ['Laravel', 'React', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'Shadcn UI'],
                'completed_at' => null,
                'sort_order' => 2,
                'is_featured' => true,
                'status' => 'in_progress',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        // Sample Blog Posts
        $blogPosts = [
            [
                'title' => 'Getting Started with Laravel and Inertia.js',
                'slug' => 'getting-started-with-laravel-and-inertia',
                'excerpt' => 'Learn how to build modern web applications using Laravel and Inertia.js for a seamless single-page application experience.',
                'content' => '# Getting Started with Laravel and Inertia.js\n\nInertia.js is a fantastic way to build modern, single-page applications using classic server-side routing and controllers...',
                'featured_image' => '/images/blog/laravel-inertia.jpg',
                'tags' => ['Laravel', 'Inertia.js', 'Web Development'],
                'is_published' => true,
                'published_at' => now()->subDays(7),
                'read_time_minutes' => 8,
                'user_id' => $user->id,
            ],
            [
                'title' => 'AWS Cloud Best Practices for Developers',
                'slug' => 'aws-cloud-best-practices-for-developers',
                'excerpt' => 'Essential AWS best practices every developer should know when building cloud-native applications.',
                'content' => '# AWS Cloud Best Practices for Developers\n\nBuilding applications on AWS requires understanding of cloud-native principles...',
                'featured_image' => '/images/blog/aws-best-practices.jpg',
                'tags' => ['AWS', 'Cloud', 'Best Practices'],
                'is_published' => true,
                'published_at' => now()->subDays(14),
                'read_time_minutes' => 12,
                'user_id' => $user->id,
            ],
        ];

        foreach ($blogPosts as $blogPost) {
            BlogPost::create($blogPost);
        }
    }
}
