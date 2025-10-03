<?php

namespace Database\Seeders;

use App\Models\PersonalInfo;
use Illuminate\Database\Seeder;

class PersonalInfoSeeder extends Seeder
{
    public function run(): void
    {
        PersonalInfo::query()->delete();
        PersonalInfo::create([
            'name' => 'Mark John Ignacio',
            'title' => 'Full Stack Developer',
            'tagline' => 'Building performant web applications with Laravel, React, and AWS.',
            'email' => 'Markme44.mm@gmail.com',
            'phone' => '(+63) 927-647-7171',
            'location' => 'General Trias, Cavite, PH',
            'bio_short' => 'Full stack developer specializing in Laravel, React, and cloud services — with experience building secure, high-performance applications in finance and other industries.',
            'bio_long' => "I’m a full stack developer with expertise in Laravel, React, and AWS cloud services. I enjoy crafting scalable systems, optimizing performance, and delivering user-friendly interfaces. My work includes building financial applications, real-time dashboards, and modern DevOps workflows. Whether in FinTech or other sectors, I focus on creating solutions that are secure, reliable, and designed to scale.",
            'hero_greeting' => 'Hi, I\'m',
            'hero_tagline' => 'Building trusted, high-performance web apps',
            'contact_blurb' => 'I\'m currently open to new opportunities and collaborations. Whether you have a question, a project idea, or just want to connect, my inbox is always open — I read every message.',
            'availability_status' => 'open_for_opportunities',
            'resume_url' => '/resume.pdf',
            'profile_image_url' => null,
        ]);
    }
}
