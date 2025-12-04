<?php

use App\Models\PersonalInfo;
use App\Models\Project;
use App\Models\Experience;
use App\Models\SocialLink;

it('returns portfolio inertia page with expected props', function () {
    // Ensure at least one personal info record exists
    $info = PersonalInfo::instance();

    // Create minimal related data if none
    if (Project::count() === 0) {
        Project::factory()->create(['is_published' => true]);
    }
    if (Experience::count() === 0) {
        Experience::factory()->create();
    }
    if (SocialLink::count() === 0) {
        SocialLink::factory()->create(['is_active' => true]);
    }

    $response = $this->get('/');
    $response->assertStatus(200);

    $page = $response->viewData('page');
    expect($page)->toBeArray();
    $props = data_get($page, 'props');
    expect($props)->toHaveKeys(['personalInfo','socialLinks','experiences','projects','meta','tech']);
    expect($props['personalInfo'])->toBeArray();
    expect($props['personalInfo'])->toHaveKey('contact_blurb');
    expect($props['projects'])->toHaveKeys(['featured','secondary']);
});

it('invalidates public portfolio cache when a project updates', function () {
    $project = \App\Models\Project::factory()->create(['is_published' => true, 'title' => 'Original Title']);

    // Warm cache
    $this->get('/')->assertStatus(200);

    // Update project (should flush cache via model event)
    $project->update(['title' => 'Updated Title']);

    $response = $this->get('/');
    $page = $response->viewData('page');
    $props = data_get($page, 'props');
    $allTitles = collect($props['projects']['featured'])->pluck('title')
        ->merge(collect($props['projects']['secondary'])->pluck('title'));
    expect($allTitles->contains('Updated Title'))->toBeTrue();
});

it('serves dynamic tech stack from database and invalidates on change', function () {
    $first = \App\Models\TechStack::factory()->create(['name' => 'ZetaTech']);
    // Warm cache
    $this->get('/')->assertStatus(200);

    // Update tech stack entry (should flush cache via model event)
    $first->update(['name' => 'OmegaTech']);

    $page = $this->get('/')->viewData('page');
    $props = data_get($page, 'props');
    expect($props['tech'])->toContain('OmegaTech');
});
