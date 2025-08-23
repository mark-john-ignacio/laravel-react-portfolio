<?php

namespace Database\Factories;

use App\Models\ContactSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactSubmissionFactory extends Factory
{
    protected $model = ContactSubmission::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'subject' => $this->faker->sentence(5),
            'message' => $this->faker->paragraphs(2, true),
            'status' => $this->faker->randomElement(['new','read','replied']),
            'ip_address' => $this->faker->ipv4(),
            'user_agent' => 'Mozilla/5.0',
        ];
    }
}
