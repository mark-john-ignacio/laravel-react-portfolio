# Terminal-Themed Portfolio (Laravel + Inertia React + shadcn/ui)

A terminal-inspired, dark-first portfolio with neon accents (green, cyan, purple) and a small admin CMS for managing projects and experience.

## Features

- Public pages: Home, About, Projects, Contact
- Admin CMS: CRUD for Projects and Experiences
- Contact form: stores messages and optionally emails you (configure SMTP)
- shadcn/ui + Tailwind (v4) with terminal vibes

## Quickstart

### Requirements

- PHP 8.3+
- Composer
- Node 18+

### Setup

```powershell
# Backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed

# Frontend
npm install
npm run dev
```

Open your app at http://localhost. Login/Register via built-in auth to access /admin.

### shadcn/ui install (components already scaffolded)

```powershell
# Tailwind is already configured in resources/css/app.css using v4
# shadcn primitives are present under resources/js/components/ui
# If you need additional components later:
# npx shadcn@latest add button card badge input label dialog dropdown-menu tooltip select separator skeleton avatar checkbox navigation-menu sheet sidebar
```

## Routes

- / — Home
- /about — About
- /projects — Projects
- /contact — Contact (POST /contact)
- /admin — Admin dashboard
- /admin/projects — CRUD projects
- /admin/experiences — CRUD experiences

## Environment

See `.env.example`. For email, set your SMTP credentials to get contact emails.

## Notes

- Seeded demo user: mark@example.com (set a password via register or tinker). Seeded sample projects and experience.
- Uses SQLite by default with `database/database.sqlite`.
