<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonalInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null; // Adjust with policy later
    }

    public function rules(): array
    {
        return [
            'name' => ['required','string','max:255'],
            'title' => ['nullable','string','max:255'],
            'tagline' => ['nullable','string','max:500'],
            'email' => ['nullable','email','max:255'],
            'phone' => ['nullable','string','max:50'],
            'location' => ['nullable','string','max:255'],
            'bio_short' => ['nullable','string','max:500'],
            'bio_long' => ['nullable','string'],
            'hero_greeting' => ['nullable','string','max:255'],
            'hero_tagline' => ['nullable','string','max:500'],
            'availability_status' => ['required','string','in:available,open_for_opportunities,unavailable'],
            'resume_url' => ['nullable','string','max:500'],
            'profile_image' => ['nullable','image','mimes:jpg,jpeg,png,webp','max:2048'],
        ];
    }
}
