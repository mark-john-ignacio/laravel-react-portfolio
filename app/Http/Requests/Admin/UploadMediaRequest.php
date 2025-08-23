<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UploadMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'file' => ['required','file','mimes:jpg,jpeg,png,webp,pdf','max:8192'],
            'type' => ['nullable','in:image,document'],
            'alt' => ['nullable','string','max:255'],
            'optimize' => ['sometimes','boolean'],
        ];
    }
}
