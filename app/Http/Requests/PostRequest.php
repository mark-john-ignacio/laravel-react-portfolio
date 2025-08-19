<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug,' . $this->route('post'),
            'excerpt' => 'nullable|string',
            'body' => 'nullable|string',
            'published_at' => 'nullable|date',
        ];
    }
}
