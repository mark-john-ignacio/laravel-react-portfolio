<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreSocialLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        $platforms = ['github','linkedin','twitter','email','dev.to','stack overflow','medium'];
        return [
            'platform' => ['required','string','max:50'], // optionally enforce in_array(strtolower())
            'display_name' => ['nullable','string','max:255'],
            'icon' => ['nullable','string','max:50'],
            'url' => ['required','string','max:500','url'],
            'is_active' => ['sometimes','boolean'],
            'sort_order' => ['nullable','integer','min:0','max:1000'],
        ];
    }
}
