<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreTechStackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        $categories = ['frontend','backend','database','cloud','tools'];
        return [
            'name' => ['required','string','max:100'],
            'category' => ['required','in:'.implode(',', $categories)],
            'proficiency_level' => ['required','integer','min:0','max:100'],
            'icon' => ['nullable','string','max:100'],
            'color' => ['nullable','string','max:32'],
            'is_featured' => ['sometimes','boolean'],
            'sort_order' => ['nullable','integer','min:0','max:1000'],
        ];
    }
}
