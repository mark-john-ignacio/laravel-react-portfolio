<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform','display_name','icon','url','is_active','sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function getIconHtmlAttribute(): string
    {
        // Basic mapping placeholder; can be replaced with dynamic icon system
        $platform = strtolower($this->platform);
        $icons = [
            'github' => '<svg class="size-4" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.02-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1 .11-.79.42-1.32.76-1.63-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.25-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.78.84 1.25 1.91 1.25 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .5"/></svg>',
            'linkedin' => '<svg class="size-4" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5Zm.02 4.75H2V21h3V8.25ZM8 8.25V21h3v-6.5c0-1.381.843-2.5 2.25-2.5s2.25 1.119 2.25 2.5V21h3v-7.25c0-2.77-1.795-4.5-4.25-4.5-1.701 0-2.89.75-3.5 1.62V8.25H8Z"/></svg>',
        ];
        return $icons[$platform] ?? '<span class="icon icon-'.e($platform).'" />';
    }
}
