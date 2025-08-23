<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.Str::random(5),
            'short_description' => $this->faker->sentence(10),
            'long_description' => $this->faker->paragraphs(4, true),
            'technologies' => $this->faker->randomElements(['Laravel','React','AWS','Docker','Node.js','TypeScript','Tailwind','MySQL'], rand(3,6)),
            'features' => $this->faker->sentences(3),
            'challenges' => $this->faker->sentences(2),
            'github_url' => $this->faker->boolean(50) ? $this->faker->url() : null,
            'live_url' => $this->faker->boolean(40) ? $this->faker->url() : null,
            'image_url' => null,
            'gallery_images' => [],
            'is_featured' => $this->faker->boolean(15),
            'is_published' => true,
            'sort_order' => $this->faker->numberBetween(1,100),
            'view_count' => $this->faker->numberBetween(0, 5000),
        ];
    }
}
