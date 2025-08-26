<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','slug','short_description','long_description','technologies','features','challenges','github_url','live_url','image_url','gallery_images','is_featured','is_published','sort_order','view_count'
    ];

    protected $casts = [
        'technologies' => 'array',
        'features' => 'array',
        'challenges' => 'array',
        'gallery_images' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'view_count' => 'integer',
    ];

    protected $appends = [
        'cover_url',
        'gallery_urls',
    ];

    public function categories()
    {
        return $this->belongsToMany(ProjectCategory::class);
    }

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
        return $query->orderByDesc('is_featured')->orderBy('sort_order')->orderBy('title');
    }

    public function getReadingTimeAttribute(): int
    {
        $text = strip_tags((string)$this->long_description);
        $words = str_word_count($text);
        return max(1, (int)ceil($words / 200)); // minutes
    }

    protected static function booted()
    {
        static::creating(function (self $project) {
            if (empty($project->slug)) {
                $base = Str::slug($project->title);
                $slug = $base;
                $i = 1;
                while (static::where('slug', $slug)->exists()) {
                    $slug = $base.'-'.(++$i);
                }
                $project->slug = $slug;
            }
        });

        $flush = function () { Cache::forget('public_portfolio_payload_v1'); };
        static::saved($flush);
        static::deleted($flush);
    }

    public function getCoverUrlAttribute(): ?string
    {
        return $this->image_url ? asset('storage/'.$this->image_url) : null;
    }

    public function getGalleryUrlsAttribute(): array
    {
        return array_map(function ($path) {
            return asset('storage/'.$path);
        }, $this->gallery_images ?? []);
    }
}
