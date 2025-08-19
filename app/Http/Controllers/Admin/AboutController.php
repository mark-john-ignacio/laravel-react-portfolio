<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends BaseAdminController
{
    public function index(): Response
    {
        $about = About::first();
        return Inertia::render('admin/about/index', [
            'about' => $about,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'summary' => ['required','string'],
            'timeline' => ['nullable','array'],
        ]);
        $about = About::first();
        if (!$about) {
            $about = About::create($data);
        } else {
            $about->update($data);
        }
        return back()->with('success', 'About updated');
    }
}
