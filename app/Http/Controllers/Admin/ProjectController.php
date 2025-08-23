<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Project::query()->with('categories');
        if ($request->boolean('featured')) $query->where('is_featured', true);
        if ($request->boolean('unpublished')) $query->where('is_published', false);
        if ($category = $request->get('category')) {
            $query->whereHas('categories', fn($q) => $q->where('slug', $category));
        }
        return Inertia::render('portfolio/admin/projects-index', [
            'projects' => $query->ordered()->paginate(20)->withQueryString(),
            'categories' => ProjectCategory::orderBy('name')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('portfolio/admin/projects-create', [
            'categories' => ProjectCategory::orderBy('name')->get(),
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $categories = $data['categories'] ?? [];
        unset($data['categories']);
        if ($request->hasFile('image')) {
            $data['image_url'] = $request->file('image')->store('portfolio/projects/cover', 'public');
        }
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('portfolio/projects/gallery', 'public');
            }
            $data['gallery_images'] = $galleryPaths;
        }
        /** @var Project $project */
        $project = Project::create($data);
        if ($categories) {
            $project->categories()->sync($categories);
        }
        return redirect()->route('admin.portfolio.projects.index')->with('success','Project created');
    }

    public function edit(Project $project): Response
    {
        $project->load('categories');
        return Inertia::render('portfolio/admin/projects-edit', [
            'project' => $project,
            'categories' => ProjectCategory::orderBy('name')->get(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        $categories = $data['categories'] ?? [];
        unset($data['categories']);
        if ($request->hasFile('image')) {
            $data['image_url'] = $request->file('image')->store('portfolio/projects/cover', 'public');
        }
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('portfolio/projects/gallery', 'public');
            }
            $data['gallery_images'] = $galleryPaths;
        }
        $project->update($data);
        if ($categories) {
            $project->categories()->sync($categories);
        }
        return back()->with('success','Project updated');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();
        return redirect()->route('admin.portfolio.projects.index')->with('success','Deleted');
    }

    public function toggleFeatured(Project $project): RedirectResponse
    {
        $project->update(['is_featured' => !$project->is_featured]);
        return back()->with('success','Toggled featured');
    }

    public function togglePublished(Project $project): RedirectResponse
    {
        $project->update(['is_published' => !$project->is_published]);
        return back()->with('success','Toggled published');
    }
}
