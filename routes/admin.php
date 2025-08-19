<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'can:access-admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', function () {
            return inertia('dashboard');
        })->name('dashboard');

    // Admin CRUD resources (shallow to keep routes concise)
    Route::resource('about', App\Http\Controllers\Admin\AboutController::class)->only(['index','update']);
    Route::resource('skills', App\Http\Controllers\Admin\SkillController::class)->except(['show']);
    Route::resource('experiences', App\Http\Controllers\Admin\ExperienceController::class)->except(['show']);
    Route::resource('projects', App\Http\Controllers\Admin\ProjectController::class);
    Route::resource('posts', App\Http\Controllers\Admin\PostController::class);
    });
