# Laravel + React Portfolio

A full-stack personal portfolio powered by Laravel, Inertia.js, React + TypeScript, Tailwind, and shadcn/ui.

## Dynamic Portfolio Content

The public portfolio page (`/`) is fully data‑driven. Content comes from the following models managed in the admin area:

| Section | Model | Notes |
|---------|-------|-------|
| Hero / Meta (name, greeting, tagline, bios, profile image) | `PersonalInfo` | Singleton record (`PersonalInfo::instance()`). |
| Social sidebar | `SocialLink` | Only records with `is_active = 1` are shown (ordered by `sort_order`). |
| Experience timeline | `Experience` | Ordered by most recent `start_date` then `sort_order`. Achievements array populates bullet list; falls back to description sentences. |
| Projects (featured + grid) | `Project` | Uses scopes `published()` and `ordered()`. Featured separated server‑side. Includes cover + gallery URLs. |
| Tech stack | `TechStack` | Fully dynamic; ordered by `sort_order`, exposes flat list + structured items. |
| Contact section (email + blurb) | `PersonalInfo` | Uses `email` & new `contact_blurb` field for dynamic CTA copy. |

To update content, edit the respective records in the admin dashboard—no code changes required. The Inertia controller (`App\\Http\\Controllers\\Public\\PublicController@index`) assembles a normalized prop payload consumed by React components (hero, about, experience, projects, sidebars) instead of prior static files under `resources/js/data`.

## Testing

A feature test (`tests/Feature/PublicPortfolioTest.php`) asserts the root route returns the expected Inertia prop keys (including `personalInfo.contact_blurb`).

Run tests:
```
php artisan test
```

## Authentication Notes

User self‑registration is disabled. The `/register` route has been removed and a regression test (`tests/Feature/Auth/RegistrationDisabledTest.php`) enforces a 404 response. Create users manually via database seeding or artisan tinker if additional accounts are required.

## Next Improvements
- Expose categories visually for tech stack (grouping UI).
- Add OpenGraph image generation (dynamic OG card).
- Implement project detail deep-linking using slugs (modal routing).

## Troubleshooting

### Vite Manifest Missing Page Entry
If you see an error similar to:

```
Unable to locate file in Vite manifest: resources/js/pages/portfolio.tsx
```

Cause: The root Blade template previously attempted to load each Inertia page component directly:

```
@vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
```

In production builds only the main entry (`resources/js/app.tsx`) is an explicit entry in `public/build/manifest.json`; individual pages are discovered at runtime via:

```ts
resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'))
```

Fix: Remove the per‑page `@vite` reference and keep only:

```
@vite(['resources/js/app.tsx'])
```

Then rebuild and clear caches:

```
npm run build
php artisan view:clear
php artisan config:clear
php artisan route:clear
```

This also eliminates case-sensitivity issues (e.g. `Portfolio/` vs lowercase) on Linux deployments.

## Branding

### Favicon
Updated the favicon to a minimal dark navy tile (`#0a192f`) with a teal accent monogram `M` (`#64ffda`) to better align with the portfolio color palette (navy background + teal highlight). The SVG now lives in `public/favicon.svg` and scales cleanly at low resolutions.

### Header Logo
The application header now uses the same monogram style as the favicon for visual consistency (`AppLogoIcon`). The logo is a teal `M` inside a rounded navy tile with an accent stroke, paired with a monospace brand label `PORTFOLIO` in the header.

## License
MIT
