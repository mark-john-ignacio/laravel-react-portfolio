<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'title',
        'content',
        'metadata',
        'is_active',
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getByKey(string $key)
    {
        return static::where('key', $key)->where('is_active', true)->first();
    }
}