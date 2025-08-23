<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteSettingsRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function index(): Response
    {
        $settings = SiteSetting::orderBy('key')->get();
        return Inertia::render('portfolio/admin/site-settings-index', [
            'settings' => $settings,
        ]);
    }

    public function update(UpdateSiteSettingsRequest $request): RedirectResponse
    {
        foreach ($request->validatedSettings() as $row) {
            SiteSetting::set($row['key'], $row['value'], $row['type']);
        }
        return back()->with('success','Settings saved');
    }
}
