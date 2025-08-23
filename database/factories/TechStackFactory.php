<?php

namespace Database\Factories;

use App\Models\TechStack;
use Illuminate\Database\Eloquent\Factories\Factory;

class TechStackFactory extends Factory
{
    protected $model = TechStack::class;

    public function definition(): array
    {
        $categories = ['frontend','backend','database','cloud','tools'];
        return [
            'name' => ucfirst($this->faker->unique()->word()),
            'category' => $this->faker->randomElement($categories),
            'proficiency_level' => $this->faker->numberBetween(10,90),
            'icon' => null,
            'color' => $this->faker->hexColor(),
            'is_featured' => $this->faker->boolean(20),
            'sort_order' => $this->faker->numberBetween(1,100),
        ];
    }
}
