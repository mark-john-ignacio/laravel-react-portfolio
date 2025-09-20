<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Normalize Ziggy location URL and force https scheme when appropriate.
     */
    protected function normalizeZiggyLocation(string $url, Request $request): string
    {
        $parts = parse_url($url);
        if ($parts === false || !isset($parts['host'])) {
            return $url;
        }

        $scheme = isset($parts['scheme']) ? strtolower($parts['scheme']) : null;

        if ($scheme === 'https') {
            return $url;
        }

        $forwardedProto = $request->headers->get('x-forwarded-proto');
        $isHttpsRequest = ($forwardedProto === 'https') || $request->isSecure() || config('app.env') === 'production';

        if (! $isHttpsRequest) {
            return $url;
        }

        // Build the URL back with https scheme
        $newUrl = 'https://' . $parts['host'];
        if (isset($parts['port'])) {
            $newUrl .= ':' . $parts['port'];
        }
        if (isset($parts['path'])) {
            $newUrl .= $parts['path'];
        }
        if (isset($parts['query'])) {
            $newUrl .= '?' . $parts['query'];
        }
        if (isset($parts['fragment'])) {
            $newUrl .= '#' . $parts['fragment'];
        }

        return $newUrl;
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () use ($request): array => [
                ...(new Ziggy)->toArray(),
                // Prefer the configured app URL, but ensure the scheme is https
                // in production deployments (for example, Vercel) to avoid
                // mixed-content issues where the page is served over HTTPS but
                // Ziggy generated URLs use HTTP. If the environment indicates
                // HTTPS (via APP_ENV or X-Forwarded-Proto), force the https
                // scheme on the URL.
                'location' => $this->normalizeZiggyLocation(config('app.url'), $request),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
