<?php

namespace App\Http\Controllers;

use App\Models\AboutInfo;
use App\Models\BlogPost;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        $aboutInfo = AboutInfo::getByKey('profile');
        $featuredSkills = Skill::featured()->ordered()->get();
        $featuredExperiences = Experience::featured()->ordered()->take(3)->get();
        $featuredProjects = Project::featured()->published()->ordered()->take(3)->get();

        return Inertia::render('Portfolio/Home', [
            'aboutInfo' => $aboutInfo,
            'featuredSkills' => $featuredSkills,
            'featuredExperiences' => $featuredExperiences,
            'featuredProjects' => $featuredProjects,
        ]);
    }

    public function experience(): Response
    {
        $experiences = Experience::ordered()->get();

        return Inertia::render('Portfolio/Experience', [
            'experiences' => $experiences,
        ]);
    }

    public function projects(): Response
    {
        $projects = Project::published()->ordered()->get();

        return Inertia::render('Portfolio/Projects', [
            'projects' => $projects,
        ]);
    }

    public function project(Project $project): Response
    {
        if (!$project->is_published) {
            abort(404);
        }

        return Inertia::render('Portfolio/Project', [
            'project' => $project,
        ]);
    }

    public function blog(): Response
    {
        $posts = BlogPost::published()->recent()->paginate(10);

        return Inertia::render('Portfolio/Blog', [
            'posts' => $posts,
        ]);
    }

    public function blogPost(BlogPost $post): Response
    {
        if (!$post->is_published) {
            abort(404);
        }

        $post->incrementViews();

        return Inertia::render('Portfolio/BlogPost', [
            'post' => $post->load('user'),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Portfolio/Contact');
    }
}
