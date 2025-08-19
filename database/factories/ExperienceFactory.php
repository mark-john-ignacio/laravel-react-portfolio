<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExperienceFactory extends Factory
{
    protected $model = Experience::class;

    public function definition(): array
    {
        $start = $this->faker->date();
        $end = $this->faker->boolean(50) ? $this->faker->date() : null;

        return [
            'title' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
            'start_date' => $start,
            'end_date' => $end,
            'is_current' => $end === null,
            'description' => $this->faker->paragraph(),
            'order' => $this->faker->numberBetween(0, 10),
        ];
    }
}
