<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePersonalInfoRequest;
use App\Models\PersonalInfo;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PersonalInfoController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('portfolio/admin/personal-info-show', [
            'personalInfo' => PersonalInfo::instance(),
        ]);
    }

    public function edit(): Response
    {
        return Inertia::render('portfolio/admin/personal-info-edit', [
            'personalInfo' => PersonalInfo::instance(),
        ]);
    }

    public function update(UpdatePersonalInfoRequest $request): RedirectResponse
    {
        $info = PersonalInfo::instance();
        $data = $request->validated();
        // Handle image upload if provided
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('portfolio/profile', 'public');
            $data['profile_image_url'] = $path;
        }
        $info->update($data);
        return back()->with('success', 'Personal information updated');
    }
}
