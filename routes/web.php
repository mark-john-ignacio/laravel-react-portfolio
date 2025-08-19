<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public content pages
Route::get('experiences', [\App\Http\Controllers\ExperienceController::class, 'index'])->name('experiences.index');
Route::get('projects', [\App\Http\Controllers\ProjectController::class, 'index'])->name('projects.index');
Route::get('blog', [\App\Http\Controllers\PostController::class, 'index'])->name('blog.index');
Route::get('blog/{post:slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('blog.show');
Route::get('contact', [\App\Http\Controllers\ContactController::class, 'show'])->name('contact');
Route::post('contact', [\App\Http\Controllers\ContactController::class, 'send'])->name('contact.send');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin CMS routes (prefix admin for clarity)
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('experiences', \App\Http\Controllers\ExperienceController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('projects', \App\Http\Controllers\ProjectController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('posts', \App\Http\Controllers\PostController::class)->only(['index', 'store', 'update', 'destroy']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
