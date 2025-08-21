<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Project;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('public/home', [
            'projects' => Project::orderBy('order')->featured()->get(),
            'experiences' => Experience::orderBy('order')->get(),
        ]);
    }

    public function about()
    {
        return Inertia::render('public/about', [
            'experiences' => Experience::orderBy('order')->get(),
        ]);
    }

    public function projects()
    {
        return Inertia::render('public/projects', [
            'projects' => Project::orderBy('order')->get(),
        ]);
    }

    public function contact()
    {
        return Inertia::render('public/contact');
    }
}
