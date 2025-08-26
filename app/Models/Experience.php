<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'company','position','location','start_date','end_date','is_current','description','achievements','technologies','company_url','company_logo','sort_order'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'achievements' => 'array',
        'technologies' => 'array',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderByDesc('start_date')->orderBy('sort_order');
    }

    public function getFormattedDurationAttribute(): string
    {
        $start = $this->start_date ? $this->start_date->format('M Y') : '';
        $end = $this->end_date ? $this->end_date->format('M Y') : 'Present';
        return trim($start.' - '.$end);
    }

    public function getIsCurrentAttribute($value): bool
    {
        if ($value !== null) return (bool)$value;
        return $this->end_date === null || $this->end_date->isFuture();
    }

    protected static function booted()
    {
        $flush = function () { Cache::forget('public_portfolio_payload_v1'); };
        static::saved($flush);
        static::deleted($flush);
    }
}
