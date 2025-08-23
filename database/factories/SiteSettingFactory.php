<?php

namespace Database\Factories;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class SiteSettingFactory extends Factory
{
    protected $model = SiteSetting::class;

    public function definition(): array
    {
        $key = 'custom.'.Str::slug($this->faker->unique()->words(3, true));
        return [
            'key' => $key,
            'value' => $this->faker->sentence(),
            'type' => 'text',
            'description' => $this->faker->sentence(),
        ];
    }
}
