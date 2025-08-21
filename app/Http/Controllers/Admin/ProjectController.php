<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::orderBy('order')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:projects,slug'],
            'description' => ['required', 'string'],
            'technologies' => ['array'],
            'featured' => ['boolean'],
            'image_url' => ['nullable', 'url'],
            'github_url' => ['nullable', 'url'],
            'live_url' => ['nullable', 'url'],
            'order' => ['integer'],
        ]);

        Project::create($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project created');
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('projects', 'slug')->ignore($project->id)],
            'description' => ['required', 'string'],
            'technologies' => ['array'],
            'featured' => ['boolean'],
            'image_url' => ['nullable', 'url'],
            'github_url' => ['nullable', 'url'],
            'live_url' => ['nullable', 'url'],
            'order' => ['integer'],
        ]);

        $project->update($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project updated');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted');
    }
}
