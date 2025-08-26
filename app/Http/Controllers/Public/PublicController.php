<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PersonalInfo;
use App\Models\SocialLink;
use App\Models\Experience;
use App\Models\Project;
use App\Models\TechStack;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    /**
     * Single-page portfolio entry point.
     */
    public function index(Request $request): Response
    {
        $forceRefresh = $request->boolean('refresh');
        $cacheKey = 'public_portfolio_payload_v1';

        if ($forceRefresh) {
            Cache::forget($cacheKey);
        }

        $payload = Cache::remember($cacheKey, 300, function () {
            $info = PersonalInfo::instance();

            // Social links (active only)
            $socials = SocialLink::active()->get(['platform','display_name','url','icon'])->map(fn($s) => [
                'platform' => $s->platform,
                'label' => $s->display_name ?? $s->platform,
                'url' => $s->url,
                'icon' => $s->icon,
            ])->values();

            // Experiences shaped for current front-end expectation
            $experiences = Experience::ordered()->get()->map(function ($e) {
                $bullets = $e->achievements ?? [];
                if (empty($bullets) && $e->description) {
                    $parts = preg_split('/\r?\n+|\.\s+/', trim($e->description));
                    $bullets = array_values(array_filter(array_map('trim', $parts)));
                }
                return [
                    'company' => $e->company,
                    'role' => $e->position,
                    'period' => $e->formatted_duration,
                    'bullets' => $bullets,
                    'url' => $e->company_url,
                ];
            });

            // Projects (published only). Separate featured vs others.
            $projectsQuery = Project::published()->ordered()->get();
            $featured = [];
            $secondary = [];
            foreach ($projectsQuery as $p) {
                $data = [
                    'id' => (string)$p->id,
                    'slug' => $p->slug,
                    'title' => $p->title,
                    'description' => $p->short_description,
                    'longDescription' => $p->long_description,
                    'tech' => $p->technologies ?? [],
                    'links' => array_filter([
                        'github' => $p->github_url,
                        'demo' => $p->live_url,
                    ]),
                    'featured' => (bool)$p->is_featured,
                    'image' => $p->cover_url,
                    'gallery' => $p->gallery_urls,
                    'readMinutes' => $p->reading_time ?? null,
                ];
                if ($p->is_featured) {
                    $featured[] = $data;
                } else {
                    $secondary[] = $data;
                }
            }

            // Meta + hero/about assembly
            $metaDescription = $info->tagline
                ?? $info->hero_tagline
                ?? $info->bio_short
                ?? 'Portfolio';

            $canonical = url('/');
            $ogImage = $info->profile_image_url;

            $tech = TechStack::ordered()->get(['name','category','is_featured','sort_order'])->map(fn($t) => [
                'name' => $t->name,
                'category' => $t->category,
                'featured' => $t->is_featured,
            ]);

            return [
                'personalInfo' => [
                    'name' => $info->name,
                    'title' => $info->title,
                    'tagline' => $info->tagline,
                    'hero_greeting' => $info->hero_greeting,
                    'hero_tagline' => $info->hero_tagline,
                    'bio_short' => $info->bio_short,
                    'bio_long' => $info->bio_long,
                    'email' => $info->email,
                    'location' => $info->location,
                    'availability_status' => $info->availability_status,
                    'resume_url' => $info->resume_url,
                    'profile_image_url' => $info->profile_image_url,
                ],
                'socialLinks' => $socials,
                'experiences' => $experiences,
                'projects' => [
                    'featured' => $featured,
                    'secondary' => $secondary,
                ],
                'meta' => [
                    'description' => $metaDescription,
                    'canonical' => $canonical,
                    'og_image' => $ogImage,
                ],
                // Provide both flat list (legacy) and structured tech items
                'tech' => $tech->pluck('name')->values(),
                'tech_items' => $tech,
            ];
        });

        return Inertia::render('portfolio', $payload + [
            '_cached' => ! $forceRefresh,
        ]);
    }
}
