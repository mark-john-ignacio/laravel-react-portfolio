<?php

use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return inertia('dashboard');
    })->name('dashboard');

    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::resource('experiences', ExperienceController::class)->except(['show']);
});
