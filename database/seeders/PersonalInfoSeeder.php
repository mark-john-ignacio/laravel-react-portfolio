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
            'bio_short' => 'Full stack developer focused on clean code, performance, and delightful UX.',
            'bio_long' => "I'm a full stack developer specializing in Laravel, React, and AWS cloud services. I enjoy crafting scalable architectures, optimizing performance, and delivering polished, accessible user interfaces. My experience spans financial applications, serverless architectures, and modern DevOps workflows.",
            'hero_greeting' => 'Hi, I\'m Mark',
            'hero_tagline' => 'I design and develop modern web solutions.',
            'availability_status' => 'open_for_opportunities',
            'resume_url' => '/resume.pdf',
            'profile_image_url' => null,
        ]);
    }
}
