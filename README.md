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
| Tech stack | Static array (see `PublicController`) | Can be moved to DB later if needed. |

To update content, edit the respective records in the admin dashboard—no code changes required. The Inertia controller (`App\\Http\\Controllers\\Public\\PublicController@index`) assembles a normalized prop payload consumed by React components (hero, about, experience, projects, sidebars) instead of prior static files under `resources/js/data`.

## Testing

A feature test (`tests/Feature/PublicPortfolioTest.php`) asserts the root route returns the expected Inertia prop keys.

Run tests:
```
php artisan test
```

## Next Improvements
- Make tech stack editable via admin (e.g., `technologies` table or JSON on `PersonalInfo`).
- Cache assembled public props (`Cache::remember`) for faster anonymous responses.
- Add OpenGraph image generation (dynamic OG card).
- Implement project detail deep-linking using slugs (modal routing).

## License
MIT
