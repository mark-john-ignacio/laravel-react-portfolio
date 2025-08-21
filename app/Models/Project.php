<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'technologies',
        'featured',
        'image_url',
        'github_url',
        'live_url',
        'order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured' => 'boolean',
        'order' => 'integer',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }
}
