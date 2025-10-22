<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureWwwDomain
{
    /**
     * Handle an incoming request.
     * Redirects non-www to www to avoid CORS issues.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only redirect in production
        if (app()->environment('production')) {
            $host = $request->getHost();
            
            // If accessing without www, redirect to www
            if ($host === 'markjohnignacio.tech') {
                return redirect()->to(
                    'https://www.' . $host . $request->getRequestUri(),
                    301 // Permanent redirect
                );
            }
        }

        return $next($request);
    }
}
