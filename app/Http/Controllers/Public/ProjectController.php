<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;
use League\CommonMark\MarkdownConverter;

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
        $converter = app(MarkdownConverter::class);
        $project->rendered_description = (string) $converter->convert($project->description ?? '');
        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }
}
