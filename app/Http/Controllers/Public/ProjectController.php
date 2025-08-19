<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::query()->orderBy('title')->get();
        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    public function show(Project $project): Response
    {
        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }
}
