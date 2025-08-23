<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'settings' => ['required','array'],
            'settings.*.key' => ['required','string','max:255'],
            'settings.*.value' => ['nullable'],
            'settings.*.type' => ['nullable','in:text,boolean,json'],
        ];
    }

    public function validatedSettings(): array
    {
        return collect($this->validated()['settings'])
            ->map(fn($row) => [
                'key' => $row['key'],
                'value' => $row['value'] ?? null,
                'type' => $row['type'] ?? null,
            ])->all();
    }
}
