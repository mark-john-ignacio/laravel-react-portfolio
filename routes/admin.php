<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\PersonalInfoController;
use App\Http\Controllers\Admin\SocialLinkController;
use App\Http\Controllers\Admin\TechStackController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ContactSubmissionController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\MediaController;

Route::middleware(['auth','verified'])->prefix('admin/portfolio')->name('admin.portfolio.')->group(function () {
    // Personal Info singleton
    Route::get('personal-info', [PersonalInfoController::class, 'show'])->name('personal-info.show');
    Route::get('personal-info/edit', [PersonalInfoController::class, 'edit'])->name('personal-info.edit');
    Route::put('personal-info', [PersonalInfoController::class, 'update'])->name('personal-info.update');

    // Social Links
    Route::resource('social-links', SocialLinkController::class);
    Route::post('social-links/reorder', [SocialLinkController::class, 'reorder'])->name('social-links.reorder');

    // Tech Stack
    Route::resource('tech-stack', TechStackController::class);
    Route::post('tech-stack/bulk-update', [TechStackController::class, 'bulkUpdate'])->name('tech-stack.bulk-update');

    // Experiences
    Route::resource('experiences', ExperienceController::class);
    Route::post('experiences/reorder', [ExperienceController::class, 'reorder'])->name('experiences.reorder');

    // Projects
    Route::resource('projects', ProjectController::class);
    Route::post('projects/{project}/toggle-featured', [ProjectController::class, 'toggleFeatured'])->name('projects.toggle-featured');
    Route::post('projects/{project}/toggle-published', [ProjectController::class, 'togglePublished'])->name('projects.toggle-published');

    // Contact submissions
    Route::resource('contact-submissions', ContactSubmissionController::class)->only(['index','show','destroy']);
    Route::post('contact-submissions/{submission}/mark-read', [ContactSubmissionController::class, 'markAsRead'])->name('contact-submissions.mark-read');
    Route::get('contact-submissions/export', [ContactSubmissionController::class, 'export'])->name('contact-submissions.export');

    // Site settings
    Route::get('settings', [SiteSettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [SiteSettingController::class, 'update'])->name('settings.update');

    // Media
    Route::post('media/upload', [MediaController::class, 'upload'])->name('media.upload');
    Route::get('media', [MediaController::class, 'index'])->name('media.index');
    Route::delete('media/{file}', [MediaController::class, 'destroy'])->name('media.destroy');
    Route::post('media/{file}/optimize', [MediaController::class, 'optimize'])->name('media.optimize');
    Route::post('media/batch-destroy', [MediaController::class, 'destroyBatch'])->name('media.batch-destroy');
});
