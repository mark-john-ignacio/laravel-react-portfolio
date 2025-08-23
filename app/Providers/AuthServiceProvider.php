<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\{PersonalInfo, SocialLink, TechStack, Experience, Project, ContactSubmission, SiteSetting};
use App\Policies\{PersonalInfoPolicy, SocialLinkPolicy, TechStackPolicy, ExperiencePolicy, ProjectPolicy, ContactSubmissionPolicy, SiteSettingPolicy, MediaPolicy};

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        PersonalInfo::class => PersonalInfoPolicy::class,
        SocialLink::class => SocialLinkPolicy::class,
        TechStack::class => TechStackPolicy::class,
        Experience::class => ExperiencePolicy::class,
        Project::class => ProjectPolicy::class,
        ContactSubmission::class => ContactSubmissionPolicy::class,
        SiteSetting::class => SiteSettingPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('media.viewAny', [MediaPolicy::class, 'viewAny']);
        Gate::define('media.upload', [MediaPolicy::class, 'upload']);
        Gate::define('media.delete', [MediaPolicy::class, 'delete']);
        Gate::define('media.optimize', [MediaPolicy::class, 'optimize']);
    }
}
