<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'about';

    protected $fillable = [
        'summary',
        'timeline',
    ];

    protected $casts = [
        'timeline' => 'array',
    ];
}
