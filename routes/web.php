<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Public\PublicController;
use App\Http\Controllers\ContactController;

// Portfolio single-page application entry
Route::get('/', [PublicController::class, 'index'])->name('home');

// Public contact form submission
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
