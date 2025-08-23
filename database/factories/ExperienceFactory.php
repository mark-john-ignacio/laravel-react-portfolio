<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExperienceFactory extends Factory
{
    protected $model = Experience::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-4 years','-1 year');
        $end = $this->faker->boolean(50) ? $this->faker->dateTimeBetween($start,'now') : null;
        return [
            'company' => $this->faker->company(),
            'position' => $this->faker->jobTitle(),
            'location' => $this->faker->city(),
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end?->format('Y-m-d'),
            'is_current' => $end === null,
            'description' => $this->faker->paragraph(),
            'achievements' => $this->faker->sentences(3),
            'technologies' => $this->faker->randomElements(['Laravel','React','AWS','Docker','MySQL','TypeScript','Tailwind','Node.js'], rand(3,6)),
            'company_url' => $this->faker->boolean(60) ? $this->faker->url() : null,
            'company_logo' => null,
            'sort_order' => $this->faker->numberBetween(1,50),
        ];
    }
}
