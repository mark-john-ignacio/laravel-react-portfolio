<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name','slug','description','color'];

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
