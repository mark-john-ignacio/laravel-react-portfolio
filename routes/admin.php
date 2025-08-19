<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\AboutInfoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    // Experiences management
    Route::resource('experiences', ExperienceController::class);
    
    // Projects management
    Route::resource('projects', ProjectController::class);
    
    // Skills management
    Route::resource('skills', SkillController::class);
    
    // Blog posts management
    Route::resource('blog-posts', BlogPostController::class);
    
    // About info management
    Route::resource('about-info', AboutInfoController::class);
});
