# Copilot Instructions for AI Agents

## Project Overview

This is a full-stack Laravel + React portfolio application. The backend is built with Laravel (PHP), and the frontend uses React (TypeScript) with Vite for bundling. Inertia.js is used for seamless server-driven SPA navigation.

## Architecture & Key Components

- **Backend (Laravel):**
    - Controllers: `app/Http/Controllers/`
    - Models: `app/Models/`
    - Middleware: `app/Http/Middleware/`
    - Requests: `app/Http/Requests/`
    - Service Providers: `app/Providers/`
    - Routes: `routes/web.php`, `routes/auth.php`, etc.
    - Database: SQLite (`database/database.sqlite`), migrations, factories, seeders
- **Frontend (React + TypeScript):**
    - Main entry: `resources/js/app.tsx`
    - Components: `resources/js/components/`
    - Pages: `resources/js/pages/`
    - Layouts: `resources/js/layouts/`
    - Hooks, types, and libs: `resources/js/hooks/`, `resources/js/types/`, `resources/js/lib/`
    - Styles: `resources/css/app.css`
- **Integration:**
    - Inertia.js bridges Laravel and React, passing props from controllers to React pages.
    - Blade templates (`resources/views/`) are used for server-rendered views and Inertia root.

## Developer Workflows

- **Build Frontend:**
    - `npm run build` (Vite)
    - `npm run dev` for local development
- **Run Backend:**
    - `php artisan serve` (Laravel dev server)
- **Database Migrations & Seeding:**
    - `php artisan migrate` / `php artisan db:seed`
- **Testing:**
    - PHP: `vendor/bin/pest` or `vendor/bin/phpunit` (tests in `tests/`)
    - JS/TS: Add tests in `resources/js/` (no test runner configured by default)
- **Linting:**
    - JS/TS: `npm run lint` (uses ESLint)
    - PHP: `vendor/bin/pint` (Laravel Pint)

## Project-Specific Patterns & Conventions

- **React pages** are mapped to Laravel routes via Inertia. Each page in `resources/js/pages/` should have a corresponding route/controller.
- **TypeScript** is used for all frontend code. Shared types live in `resources/js/types/`.
- **State management** is typically local or via React context/hooks. No Redux/MobX.
- **Blade templates** are minimal, mostly for Inertia root and fallback views.
- **Environment config**: Use `.env` for Laravel, `.env.local` for frontend if needed.

## Integration Points

- **Inertia.js**: Props from Laravel controllers are passed to React pages. See `app/Http/Controllers/` and `resources/js/pages/` for examples.
- **API endpoints**: Use Laravel routes/controllers for backend logic. Frontend fetches via Inertia or direct API calls.
- **Assets**: Built frontend assets are output to `public/build/`.

## External Dependencies

- **Laravel** (PHP), **React** (TypeScript), **Vite**, **Inertia.js**, **Pest** (PHP testing), **ESLint**, **Laravel Pint**

## Example: Adding a New Page

1. Create a React page in `resources/js/pages/Example.tsx`.
2. Add a route in `routes/web.php` and a controller method in `app/Http/Controllers/` that returns an Inertia response.
3. Pass props from controller to page via Inertia.

## Key Files & Directories

- `app/Http/Controllers/` – Backend logic
- `resources/js/pages/` – React pages
- `routes/web.php` – Main route definitions
- `resources/views/app.blade.php` – Inertia root view
- `database/migrations/` – DB schema
- `tests/` – PHP tests

---

For more details, see Laravel, React, and Inertia.js documentation. Update this file as project conventions evolve.
