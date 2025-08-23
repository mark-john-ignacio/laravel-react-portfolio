<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSocialLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'platform' => ['sometimes','string','max:50'],
            'display_name' => ['nullable','string','max:255'],
            'icon' => ['nullable','string','max:50'],
            'url' => ['sometimes','string','max:500','url'],
            'is_active' => ['sometimes','boolean'],
            'sort_order' => ['sometimes','integer','min:0','max:1000'],
        ];
    }
}
