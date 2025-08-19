<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
            'repo' => 'nullable|url',
            'year' => 'nullable|digits:4',
            'technologies' => 'nullable|array',
            'order' => 'nullable|integer',
        ];
    }
}
