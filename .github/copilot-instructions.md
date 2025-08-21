# Copilot Instructions for Laravel + React Portfolio Application

## Project Overview

This is a **production-ready portfolio website** with admin CMS built using Laravel + Inertia.js + React + TypeScript. The application showcases professional experience, projects, and skills while providing a content management system for easy updates.

### Key Features

- **Public Portfolio**: Homepage, About, Projects, Contact pages
- **Admin CMS**: Full CRUD operations for content management
- **Modern UI**: shadcn/ui components with Tailwind CSS
- **Animations**: Framer Motion for smooth interactions
- **Email Integration**: Working contact form with SMTP
- **Type Safety**: Full TypeScript implementation

## Architecture & Tech Stack

### Backend (Laravel 11+)

- **Framework**: Laravel with Inertia.js adapter
- **Database**: MySQL/SQLite with Eloquent ORM
- **Authentication**: There is an existing authentication system in place
- **Validation**: FormRequest classes with custom rules
- **Email**: SMTP configuration for contact forms

### Frontend (React + TypeScript)

- **Framework**: React 18+ with TypeScript strict mode
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components + Tailwind CSS
- **Animations**: Framer Motion for micro-interactions
- **Forms**: react-hook-form + zod validation
- **State**: React hooks (no external state management)

### Integration Layer

- **Inertia.js**: Server-driven SPA with React rendering
- **Type Sharing**: Shared TypeScript interfaces between frontend/backend

## Directory Structure & Key Files

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── PublicController.php          # Public portfolio pages
│   │   ├── ContactController.php         # Contact form handling
│   │   └── Admin/                        # Admin CMS controllers
│   ├── Requests/                         # Form validation classes
│   └── Middleware/                       # Custom middleware
├── Models/                               # Eloquent models (User, Project, Experience)
└── Policies/                            # Authorization policies

database/
├── migrations/                          # Database schema
├── factories/                           # Model factories for testing
└── seeders/                            # Sample data for development

resources/
├── js/
│   ├── app.tsx                         # React entry point
│   ├── types/                          # TypeScript type definitions
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   └── custom/                     # Custom components
│   ├── pages/
│   │   ├── Home.tsx                    # Public pages
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Admin/                      # Admin CMS pages
│   ├── layouts/                        # Page layouts
│   └── lib/                           # Utility functions
├── css/app.css                         # Tailwind CSS entry
└── views/app.blade.php                 # Inertia root template

routes/
├── web.php                             # Public routes
├── admin.php                           # Admin routes
└── auth.php                           # Authentication routes

public/
├── build/                              # Compiled assets
└── images/                            # Static images and placeholders
```

## Development Workflow Commands

### Setup & Installation

```bash
# Backend setup
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# Frontend setup
npm install
npm run dev

# Start development servers (Laravel Herd)
# Laravel Herd handles the backend server automatically
```

### Database Operations

```bash
php artisan migrate              # Run migrations
php artisan migrate:fresh --seed # Reset and seed database
php artisan db:seed             # Seed data only
php artisan tinker              # Laravel REPL
```

### Build & Production

```bash
npm run build                   # Production frontend build
npm run preview                 # Preview production build
php artisan config:cache        # Cache Laravel config
php artisan route:cache         # Cache routes
```

### Code Quality & Testing

```bash
# PHP
vendor/bin/pint                 # Format PHP code (Laravel Pint)
vendor/bin/pest                 # Run PHP tests
php artisan test               # Alternative test runner

# JavaScript/TypeScript
npm run lint                   # ESLint checking
npm run lint:fix              # Auto-fix ESLint issues
npm run type-check            # TypeScript type checking
npm run format                # Prettier formatting
```

## Project-Specific Patterns & Conventions

### Laravel Backend Patterns

#### Controller Structure

```php
// Public controllers return Inertia responses
class PublicController extends Controller
{
    public function home()
    {
        return inertia('Home', [
            'projects' => Project::featured()->get(),
            'experiences' => Experience::latest()->get(),
        ]);
    }
}

// Admin controllers handle CRUD operations
class Admin\ProjectController extends Controller
{
    public function index()
    {
        return inertia('Admin/Projects/Index', [
            'projects' => Project::paginate(),
        ]);
    }
}
```

#### Form Validation

```php
// Use FormRequest classes for validation
class ContactFormRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string|min:10',
        ];
    }
}
```

#### Models with Relationships

```php
class Project extends Model
{
    protected $fillable = ['title', 'description', 'technologies'];
    protected $casts = ['technologies' => 'array'];

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }
}
```

### React Frontend Patterns

#### Page Components

```tsx
// Pages receive props from Laravel controllers
interface HomeProps {
    projects: Project[];
    experiences: Experience[];
}

export default function Home({ projects, experiences }: HomeProps) {
    return (
        <Layout title="Home">
            <HeroSection />
            <ProjectsGrid projects={projects} />
            <ExperienceTimeline experiences={experiences} />
        </Layout>
    );
}
```

#### Custom Components

```tsx
// Use shadcn/ui as base, extend with custom logic
interface AppCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function AppCard({ title, children, className }: AppCardProps) {
    return (
        <Card className={cn('transition-shadow hover:shadow-lg', className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
```

#### Form Handling

```tsx
// Use react-hook-form + zod for validation
const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    message: z.string().min(10, 'Message too short'),
});

export function ContactForm() {
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = (data: z.infer<typeof contactSchema>) => {
        router.post('/contact', data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields using shadcn form components */}</form>
        </Form>
    );
}
```

### Animation Patterns

```tsx
// Use Framer Motion for animations
import { motion } from 'framer-motion';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.02 }}>
            {children}
        </motion.div>
    );
}
```

## Integration Points

### Inertia.js Data Flow

1. **Laravel Route** → **Controller** → **Inertia Response**
2. **Inertia** serializes props and sends to React
3. **React Page** receives props as TypeScript interfaces
4. **Form Submissions** go back through Inertia to Laravel

### Type Safety

```typescript
// Define shared types
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    featured: boolean;
    image_url?: string;
}
```

### Email Configuration

```php
// .env configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yoursite.com
```

## Common Development Tasks

### Adding a New Public Page

1. Create React component in `resources/js/pages/NewPage.tsx`
2. Add route in `routes/web.php`
3. Create/update controller method to return Inertia response
4. Add navigation link if needed

### Adding Admin CRUD

1. Create controller: `php artisan make:controller Admin/ModelController`
2. Create React pages in `resources/js/pages/Admin/Model/`
3. Add routes in `routes/admin.php`
4. Create FormRequest for validation
5. Add navigation to admin layout

### Adding New Component

1. Create in `resources/js/components/custom/ComponentName.tsx`
2. Export from `resources/js/components/index.ts`
3. Add TypeScript interfaces
4. Include usage examples in JSDoc

### Database Changes

1. Create migration: `php artisan make:migration create_table_name`
2. Update model with new fields/relationships
3. Update factories and seeders
4. Run migration: `php artisan migrate`

## Environment & Configuration

### Required Environment Variables

```bash
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=

# Mail
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password

# App
APP_NAME="Portfolio"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
```

## Troubleshooting Common Issues

### Inertia Not Updating

- Clear browser cache
- Run `php artisan route:clear`
- Restart `npm run dev`

### TypeScript Errors

- Run `npm run type-check` for detailed errors
- Ensure all props are properly typed
- Check `tsconfig.json` for strict settings

### Animation Issues

- Verify Framer Motion is installed
- Check for CSS conflicts with Tailwind
- Test on different browsers

### Form Validation Not Working

- Ensure FormRequest validation rules match frontend zod schema
- Check network tab for validation errors
- Verify CSRF token is included

## Performance & Best Practices

### Frontend Optimization

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use Tailwind's purge feature

### Backend Optimization

- Use eager loading for relationships
- Implement database indexing
- Cache frequently accessed data
- Use queues for email sending

### SEO & Accessibility

- Add proper meta tags in Inertia responses
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works

## Personal Information (Source of Truth)

### Contact Details

```
Mark John Ignacio
Email: Markme44.mm@gmail.com
Phone: (+63) 927-647-7171
Location: General Trias, Cavite
```

### Experience Data

**HRWEB Inc.** | Junior Programmer | March 2024 – Present

- Designed financial applications using Laravel 12, React, Tailwind CSS, shadcn UI, Inertia.js, Vite
- Developed responsive interfaces with React and Tailwind CSS
- Implemented dynamic features, secure authentication, real-time data visualization
- Improved platform stability by 30%, reduced user-reported bugs

**AWS (via Edukasyon.ph)** | Cloud Engineering Intern | Sept 2023 – Jan 2024

- Deployed scalable infrastructure using EC2, RDS, S3
- Managed IAM roles, configured CloudWatch monitoring
- Developed Python scripts for automation in Linux environments
- Applied AWS Well-Architected Framework principles

**Dei Gratia School Inc.** | IT Support Intern | Mar 2023 – Jul 2023

- Maintained hardware, installed OS and software
- Provided technical support for students and staff
- Troubleshot network and connectivity issues

### Projects Data

1. **AWS Cloud Resume Challenge** - Serverless resume with Lambda, API Gateway, DynamoDB, CloudFront
2. **Online Thesis Archiving System** - Secure PHP app with 40% efficiency improvement
3. **HRWEB Financial Applications** - Modern financial apps with Laravel and React

### Education & Certifications

- **BS Information Technology** - Cavite State University (Sept 2023)
- **AWS Certified Cloud Practitioner** (2024)
- **CSS NC2 – TESDA** (2019)

### Skills

Laravel, React, Tailwind, TypeScript, JavaScript, PHP, MySQL, Inertia.js, Vite, AWS, Docker, Git, Linux

---

**Remember**: This is a portfolio application showcasing professional work. Focus on clean code, proper TypeScript usage, and polished UI components using shadcn/ui exclusively. Always test both admin and public-facing functionality before considering features complete.
