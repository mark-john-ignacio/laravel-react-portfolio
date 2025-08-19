<?php

namespace App\Http\Controllers\Admin;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends BaseAdminController
{
    public function index(): Response
    {
        return Inertia::render('admin/skills/index', [
            'skills' => Skill::orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/skills/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:120'],
            'category' => ['nullable','string','max:120'],
            'level' => ['nullable','string','max:120'],
            'sort_order' => ['nullable','integer'],
        ]);
        Skill::create($data);
        return redirect()->route('admin.skills.index')->with('success', 'Skill created');
    }

    public function edit(Skill $skill): Response
    {
        return Inertia::render('admin/skills/edit', [ 'skill' => $skill ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $data = $request->validate([
            'name' => ['required','string','max:120'],
            'category' => ['nullable','string','max:120'],
            'level' => ['nullable','string','max:120'],
            'sort_order' => ['nullable','integer'],
        ]);
        $skill->update($data);
        return redirect()->route('admin.skills.index')->with('success', 'Skill updated');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return back()->with('success', 'Skill deleted');
    }
}
