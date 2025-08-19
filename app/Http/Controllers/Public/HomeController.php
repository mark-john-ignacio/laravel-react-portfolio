<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Experience;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $about = About::query()->first();
        $skills = Skill::query()->orderBy('sort_order')->get();
        $featuredProjects = Project::query()->where('featured', true)->orderBy('created_at', 'desc')->take(3)->get();
        $recentExperiences = Experience::query()->orderByDesc('start_date')->take(3)->get();

        return Inertia::render('home', [
            'about' => $about,
            'skills' => $skills,
            'featuredProjects' => $featuredProjects,
            'recentExperiences' => $recentExperiences,
        ]);
    }
}
