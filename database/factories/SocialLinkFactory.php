<?php

namespace Database\Factories;

use App\Models\SocialLink;
use Illuminate\Database\Eloquent\Factories\Factory;

class SocialLinkFactory extends Factory
{
    protected $model = SocialLink::class;

    public function definition(): array
    {
        $platform = $this->faker->randomElement(['GitHub','LinkedIn','Twitter','Dev.to','Stack Overflow']);
        return [
            'platform' => $platform,
            'display_name' => strtolower($platform).'/'.$this->faker->userName(),
            'icon' => strtolower(str_replace(['.',' '], '', $platform)),
            'url' => $this->faker->url(),
            'is_active' => true,
            'sort_order' => $this->faker->numberBetween(1,50),
        ];
    }
}
