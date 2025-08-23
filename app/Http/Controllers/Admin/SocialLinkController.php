<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSocialLinkRequest;
use App\Http\Requests\Admin\UpdateSocialLinkRequest;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialLinkController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('portfolio/admin/social-links-index', [
            'links' => SocialLink::orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('portfolio/admin/social-links-create');
    }

    public function store(StoreSocialLinkRequest $request): RedirectResponse
    {
        SocialLink::create($request->validated());
        return redirect()->route('admin.portfolio.social-links.index')->with('success','Social link created');
    }

    public function edit(SocialLink $social_link): Response
    {
        return Inertia::render('portfolio/admin/social-links-edit', [
            'link' => $social_link,
        ]);
    }

    public function update(UpdateSocialLinkRequest $request, SocialLink $social_link): RedirectResponse
    {
        $social_link->update($request->validated());
        return back()->with('success','Social link updated');
    }

    public function destroy(SocialLink $social_link): RedirectResponse
    {
        $social_link->delete();
        return redirect()->route('admin.portfolio.social-links.index')->with('success','Deleted');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $order = $request->input('order', []); // array of id => sort_order
        foreach ($order as $id => $sort) {
            SocialLink::where('id', $id)->update(['sort_order' => (int)$sort]);
        }
        return back()->with('success','Order updated');
    }
}
