<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public portfolio routes
Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/experience', [PortfolioController::class, 'experience'])->name('experience');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects');
Route::get('/projects/{project:slug}', [PortfolioController::class, 'project'])->name('project');
Route::get('/blog', [PortfolioController::class, 'blog'])->name('blog');
Route::get('/blog/{post:slug}', [PortfolioController::class, 'blogPost'])->name('blog.post');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

// Dashboard for authenticated users
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Include admin routes
require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
