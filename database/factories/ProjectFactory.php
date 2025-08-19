<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'url' => $this->faker->boolean(50) ? $this->faker->url() : null,
            'repo' => $this->faker->boolean(50) ? $this->faker->url() : null,
            'year' => $this->faker->year(),
            'technologies' => [$this->faker->word(), $this->faker->word()],
            'order' => $this->faker->numberBetween(0, 10),
        ];
    }
}
