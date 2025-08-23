<?php

namespace Database\Factories;

use App\Models\PersonalInfo;
use Illuminate\Database\Eloquent\Factories\Factory;

class PersonalInfoFactory extends Factory
{
    protected $model = PersonalInfo::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'title' => 'Full Stack Developer',
            'tagline' => $this->faker->sentence(8),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => '+639'.rand(100000000, 999999999),
            'location' => $this->faker->city(),
            'bio_short' => $this->faker->sentence(12),
            'bio_long' => $this->faker->paragraphs(3, true),
            'hero_greeting' => 'Hi, I\'m '.$this->faker->firstName(),
            'hero_tagline' => $this->faker->sentence(6),
            'availability_status' => $this->faker->randomElement(['available','open_for_opportunities','unavailable']),
            'resume_url' => '/resume.pdf',
            'profile_image_url' => null,
        ];
    }
}
