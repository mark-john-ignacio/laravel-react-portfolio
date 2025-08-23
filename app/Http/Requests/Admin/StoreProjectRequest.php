<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required','string','max:255'],
            'slug' => ['nullable','string','max:255','alpha_dash', Rule::unique('projects','slug')],
            'short_description' => ['nullable','string','max:500'],
            'long_description' => ['nullable','string'],
            'technologies' => ['nullable','array'],
            'technologies.*' => ['string','max:100'],
            'features' => ['nullable','array'],
            'features.*' => ['string','max:500'],
            'challenges' => ['nullable','array'],
            'challenges.*' => ['string','max:500'],
            'github_url' => ['nullable','url','max:255'],
            'live_url' => ['nullable','url','max:255'],
            'image' => ['nullable','image','mimes:png,jpg,jpeg,webp','max:4096'],
            'gallery' => ['nullable','array'],
            'gallery.*' => ['image','mimes:png,jpg,jpeg,webp','max:4096'],
            'is_featured' => ['sometimes','boolean'],
            'is_published' => ['sometimes','boolean'],
            'sort_order' => ['nullable','integer','min:0','max:1000'],
            'categories' => ['nullable','array'],
            'categories.*' => ['integer','exists:project_categories,id'],
        ];
    }
}
