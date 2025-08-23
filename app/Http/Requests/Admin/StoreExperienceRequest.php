<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'company' => ['required','string','max:255'],
            'position' => ['required','string','max:255'],
            'location' => ['nullable','string','max:255'],
            'start_date' => ['required','date'],
            'end_date' => ['nullable','date','after_or_equal:start_date'],
            'is_current' => ['sometimes','boolean'],
            'description' => ['nullable','string'],
            'achievements' => ['nullable','array'],
            'achievements.*' => ['string','max:500'],
            'technologies' => ['nullable','array'],
            'technologies.*' => ['string','max:100'],
            'company_url' => ['nullable','url','max:255'],
            'company_logo' => ['nullable','image','mimes:png,jpg,jpeg,webp','max:1024'],
            'sort_order' => ['nullable','integer','min:0','max:1000'],
        ];
    }
}
