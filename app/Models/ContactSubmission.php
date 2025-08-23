<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class ContactSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','email','subject','message','status','ip_address','user_agent'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeUnread($query)
    {
        return $query->where('status', 'new');
    }

    public function getTimeAgoAttribute(): string
    {
        return $this->created_at?->diffForHumans() ?? '';
    }

    public function setMessageAttribute($value): void
    {
        // Basic sanitization (further hardening via Purifier could be added)
        $clean = strip_tags((string)$value, '<p><br><strong><em><ul><ol><li><a>');
        $this->attributes['message'] = $clean;
    }
}
