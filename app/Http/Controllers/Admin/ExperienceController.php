<?php

namespace App\Http\Controllers\Admin;

use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends BaseAdminController
{
    public function index(): Response
    {
        return Inertia::render('admin/experiences/index', [
            'experiences' => Experience::orderByDesc('start_date')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/experiences/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'role' => ['required','string','max:190'],
            'company' => ['required','string','max:190'],
            'location' => ['nullable','string','max:190'],
            'start_date' => ['required','date'],
            'end_date' => ['nullable','date','after_or_equal:start_date'],
            'is_current' => ['boolean'],
            'description' => ['nullable','string'],
        ]);
        Experience::create($data);
        return redirect()->route('admin.experiences.index')->with('success','Experience created');
    }

    public function edit(Experience $experience): Response
    {
        return Inertia::render('admin/experiences/edit', [ 'experience' => $experience ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $data = $request->validate([
            'role' => ['required','string','max:190'],
            'company' => ['required','string','max:190'],
            'location' => ['nullable','string','max:190'],
            'start_date' => ['required','date'],
            'end_date' => ['nullable','date','after_or_equal:start_date'],
            'is_current' => ['boolean'],
            'description' => ['nullable','string'],
        ]);
        $experience->update($data);
        return redirect()->route('admin.experiences.index')->with('success','Experience updated');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return back()->with('success','Experience deleted');
    }
}
