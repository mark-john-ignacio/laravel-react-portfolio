<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreExperienceRequest;
use App\Http\Requests\Admin\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('portfolio/admin/experiences-index', [
            'experiences' => Experience::ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('portfolio/admin/experiences-create');
    }

    public function store(StoreExperienceRequest $request): RedirectResponse
    {
        Experience::create($request->validated());
        return redirect()->route('admin.portfolio.experiences.index')->with('success','Experience added');
    }

    public function edit(Experience $experience): Response
    {
        return Inertia::render('portfolio/admin/experiences-edit', [
            'experience' => $experience,
        ]);
    }

    public function update(UpdateExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $experience->update($request->validated());
        return back()->with('success','Experience updated');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();
        return redirect()->route('admin.portfolio.experiences.index')->with('success','Deleted');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $order = $request->input('order', []);
        foreach ($order as $id => $sort) {
            Experience::where('id', $id)->update(['sort_order' => (int)$sort]);
        }
        return back()->with('success','Order updated');
    }
}
