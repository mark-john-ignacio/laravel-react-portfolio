<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/experiences/index', [
            'experiences' => Experience::orderBy('order')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/experiences/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
            'is_current' => ['boolean'],
            'summary' => ['nullable', 'string'],
            'highlights' => ['array'],
            'order' => ['integer'],
        ]);

        Experience::create($data);
        return redirect()->route('admin.experiences.index')->with('success', 'Experience created');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('admin/experiences/edit', [
            'experience' => $experience,
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $data = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
            'is_current' => ['boolean'],
            'summary' => ['nullable', 'string'],
            'highlights' => ['array'],
            'order' => ['integer'],
        ]);

        $experience->update($data);
        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted');
    }
}
