<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechStack extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','category','proficiency_level','icon','color','is_featured','sort_order'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'proficiency_level' => 'integer',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->orderBy('sort_order');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    public static function groupedByCategory()
    {
        return static::query()->ordered()->get()->groupBy('category');
    }

    public function getProficiencyLabelAttribute(): string
    {
        $lvl = (int)$this->proficiency_level;
        return match(true) {
            $lvl >= 85 => 'Master',
            $lvl >= 65 => 'Expert',
            $lvl >= 40 => 'Intermediate',
            $lvl >= 20 => 'Beginner',
            default => 'Learning',
        };
    }
}
