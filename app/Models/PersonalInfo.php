<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class PersonalInfo extends Model
{
    use HasFactory;

    protected $table = 'personal_info';

    protected $fillable = [
        'name','title','tagline','email','phone','location','bio_short','bio_long',
        'hero_greeting','hero_tagline','availability_status','resume_url','profile_image_url','contact_blurb'
    ];

    // Example for potential JSON fields (none currently defined but placeholder for future)
    protected $casts = [
        // 'some_json_field' => 'array',
    ];

    /**
     * Scope: return singleton instance (create if missing optionally)
     */
    public function scopeSingleton($query)
    {
        return $query->orderBy('id')->limit(1);
    }

    public static function instance(): self
    {
        return static::first() ?? static::create(['name' => 'Your Name']);
    }

    protected static function booted()
    {
        $flush = function () { Cache::forget('public_portfolio_payload_v1'); };
        static::saved($flush);
        static::deleted($flush);
    }

    public function getFullNameAttribute(): string
    {
        return $this->name; // alias for clarity / future expansion
    }

    public function getFormattedPhoneAttribute(): ?string
    {
        if (!$this->phone) return null;
        $digits = preg_replace('/[^0-9]/', '', $this->phone);
        if (strlen($digits) === 11 && str_starts_with($digits, '09')) {
            return preg_replace('/^(09)(\d{3})(\d{3})(\d{2})(\d{2})$/', '$1 $2 $3 $4 $5', $digits);
        }
        return $this->phone;
    }

    public function setProfileImageUrlAttribute($value): void
    {
        // Support storing uploaded file objects or string paths
        if (is_file($value)) {
            $path = Storage::disk('public')->putFile('portfolio/profile', $value);
            $this->attributes['profile_image_url'] = $path;
        } else {
            $this->attributes['profile_image_url'] = $value;
        }
    }

    public function getProfileImageUrlAttribute($value): ?string
    {
        if (!$value) return null;
        if (str_starts_with($value, 'http')) return $value;
        return Storage::disk('public')->url($value);
    }
}
