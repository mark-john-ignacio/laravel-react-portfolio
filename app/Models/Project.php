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
        'long_description',
        'image_url',
        'demo_url',
        'github_url',
        'technologies',
        'completed_at',
        'sort_order',
        'is_featured',
        'is_published',
        'status',
    ];

    protected $casts = [
        'technologies' => 'array',
        'completed_at' => 'date',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('completed_at', 'desc');
    }
}
