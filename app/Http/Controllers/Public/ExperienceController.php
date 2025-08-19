<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        $experiences = Experience::query()->orderByDesc('start_date')->get();
        return Inertia::render('experience', [
            'experiences' => $experiences,
        ]);
    }
}
