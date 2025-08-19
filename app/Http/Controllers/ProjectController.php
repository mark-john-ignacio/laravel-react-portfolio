<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('order')->get();

        return Inertia::render('projects/index', compact('projects'));
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if (isset($data['technologies']) && is_array($data['technologies'])) {
            $data['technologies'] = json_encode($data['technologies']);
        }

        Project::create($data);

        return redirect()->route('admin.projects.index');
    }

    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        if (isset($data['technologies']) && is_array($data['technologies'])) {
            $data['technologies'] = json_encode($data['technologies']);
        }

        $project->update($data);

        return redirect()->route('admin.projects.index');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index');
    }
}
