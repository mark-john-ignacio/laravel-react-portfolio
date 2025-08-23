<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = ['key','value','type','description'];

    protected $casts = [
        'value' => 'string', // We will handle casting manually per type field
    ];

    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        if (!$setting) return $default;
        return $setting->casted_value;
    }

    public static function getJson(string $key, $default = []): array
    {
        $val = static::get($key);
        return is_array($val) ? $val : ($val ? json_decode($val, true) ?? $default : $default);
    }

    public static function set(string $key, $value, string $type = null): self
    {
        $setting = static::firstOrNew(['key' => $key]);
        $setting->type = $type ?: $setting->type ?: static::inferType($value);
        $setting->value = static::prepareValueForStorage($value, $setting->type);
        $setting->save();
        return $setting;
    }

    public function getCastedValueAttribute()
    {
        return match($this->type) {
            'boolean' => filter_var($this->value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode($this->value ?? 'null', true),
            default => $this->value,
        };
    }

    public static function inferType($value): string
    {
        return match(true) {
            is_bool($value) => 'boolean',
            is_array($value) => 'json',
            default => 'text',
        };
    }

    protected static function prepareValueForStorage($value, string $type)
    {
        return match($type) {
            'boolean' => $value ? '1' : '0',
            'json' => json_encode($value),
            default => (string)$value,
        };
    }
}
