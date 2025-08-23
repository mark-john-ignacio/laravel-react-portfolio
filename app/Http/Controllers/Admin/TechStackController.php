<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTechStackRequest;
use App\Http\Requests\Admin\UpdateTechStackRequest;
use App\Models\TechStack;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TechStackController extends Controller
{
    public function index(Request $request): Response
    {
        $stacks = TechStack::ordered()->get()->groupBy('category');
        return Inertia::render('portfolio/admin/tech-stack-index', [
            'grouped' => $stacks,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('portfolio/admin/tech-stack-create');
    }

    public function store(StoreTechStackRequest $request): RedirectResponse
    {
        TechStack::create($request->validated());
        return redirect()->route('admin.portfolio.tech-stack.index')->with('success','Technology added');
    }

    public function edit(TechStack $tech_stack): Response
    {
        return Inertia::render('portfolio/admin/tech-stack-edit', [
            'tech' => $tech_stack,
        ]);
    }

    public function update(UpdateTechStackRequest $request, TechStack $tech_stack): RedirectResponse
    {
        $tech_stack->update($request->validated());
        return back()->with('success','Technology updated');
    }

    public function destroy(TechStack $tech_stack): RedirectResponse
    {
        $tech_stack->delete();
        return redirect()->route('admin.portfolio.tech-stack.index')->with('success','Deleted');
    }

    public function bulkUpdate(Request $request): RedirectResponse
    {
        $ids = $request->input('ids', []);
        $data = $request->only(['category','proficiency_level','is_featured']);
        TechStack::whereIn('id', $ids)->update(array_filter($data, fn($v) => !is_null($v)));
        return back()->with('success','Bulk update applied');
    }
}
