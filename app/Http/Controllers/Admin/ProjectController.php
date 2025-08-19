<?php

namespace App\Http\Controllers\Admin;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends BaseAdminController
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::orderByDesc('created_at')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','string','max:190'],
            'slug' => ['nullable','string','max:190','unique:projects,slug'],
            'summary' => ['nullable','string','max:500'],
            'description' => ['nullable','string'],
            'tech_stack' => ['nullable','array'],
            'url' => ['nullable','url'],
            'repo_url' => ['nullable','url'],
            'featured' => ['boolean'],
            'published' => ['boolean'],
        ]);
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        Project::create($data);
        return redirect()->route('admin.projects.index')->with('success','Project created');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/edit', [ 'project' => $project ]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title' => ['required','string','max:190'],
            'slug' => ['required','string','max:190','unique:projects,slug,' . $project->id],
            'summary' => ['nullable','string','max:500'],
            'description' => ['nullable','string'],
            'tech_stack' => ['nullable','array'],
            'url' => ['nullable','url'],
            'repo_url' => ['nullable','url'],
            'featured' => ['boolean'],
            'published' => ['boolean'],
        ]);
        $project->update($data);
        return redirect()->route('admin.projects.index')->with('success','Project updated');
    }

    public function show(Project $project): Response
    {
        return Inertia::render('admin/projects/show', [ 'project' => $project ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return back()->with('success','Project deleted');
    }
}
