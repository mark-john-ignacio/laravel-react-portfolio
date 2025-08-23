<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Response;
use Inertia\Inertia;

class PublicController extends Controller
{
    /**
     * Single-page portfolio entry point.
     */
    public function index(): Response
    {
        // Initial props can be extended later (projects, experiences, etc.)
        return Inertia::render('portfolio');
    }
}
