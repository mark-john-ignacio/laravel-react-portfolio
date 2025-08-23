---
mode: agent
---
# Database-Driven Portfolio CMS Integration Prompts

## 1. Database Schema Setup Prompt

```
Create a comprehensive database schema for the portfolio CMS using SQLite migrations:

**Tables needed:**

1. **personal_info** (singleton table):
   - id, name, title, tagline, email, phone, location, bio_short, bio_long
   - hero_greeting, hero_tagline, availability_status
   - resume_url, profile_image_url
   - created_at, updated_at

2. **social_links**:
   - id, platform (github, linkedin, twitter, etc.), url, display_name, icon, is_active, sort_order
   - created_at, updated_at

3. **tech_stacks**:
   - id, name, category (frontend, backend, database, cloud, tools), proficiency_level
   - icon, color, is_featured, sort_order, created_at, updated_at

4. **experiences**:
   - id, company, position, location, start_date, end_date, is_current
   - description, achievements (JSON), technologies (JSON)
   - company_url, company_logo, sort_order, created_at, updated_at

5. **projects**:
   - id, title, slug, short_description, long_description
   - technologies (JSON), features (JSON), challenges (JSON)
   - github_url, live_url, image_url, gallery_images (JSON)
   - is_featured, is_published, sort_order, view_count, created_at, updated_at

6. **project_categories**:
   - id, name, slug, description, color, created_at, updated_at

7. **project_project_category** (pivot table):
   - project_id, project_category_id

8. **contact_submissions**:
   - id, name, email, subject, message, status (new, read, replied)
   - ip_address, user_agent, created_at, updated_at

9. **site_settings**:
   - id, key, value, type (text, boolean, json), description, created_at, updated_at

Create Laravel migrations for all these tables with proper indexes, foreign keys, and default data seeding.
```

## 2. Laravel Models & Relationships Prompt

```
Create Eloquent models for the portfolio CMS with proper relationships and accessors:

**PersonalInfo Model** (singleton):
- Use HasFactory trait
- Casts for JSON fields
- Accessor for full_name, formatted_phone
- Scope for getting the single instance
- Image upload handling for profile_image_url

**SocialLink Model**:
- Scope for active links ordered by sort_order
- Accessor for icon_html (returns SVG or icon class)
- Validation rules for URL format

**TechStack Model**:
- Scope for featured technologies
- Group by category methods
- Accessor for proficiency_label (Beginner, Intermediate, Expert, Master)

**Experience Model**:
- Casts for achievements and technologies JSON fields
- Accessor for formatted_duration
- Scope for ordered by start_date descending
- Accessor for is_current based on end_date

**Project Model**:
- Relationships: belongsToMany(ProjectCategory)
- Casts for technologies, features, challenges, gallery_images JSON
- Scopes: featured, published, ordered
- Accessor for reading_time estimate
- Image upload handling for image_url and gallery

**ContactSubmission Model**:
- Scope for unread submissions
- Accessor for time_ago
- Mutator for sanitizing message content

**SiteSetting Model**:
- Static methods: get($key), set($key, $value), getJson($key)
- Casts based on type field

Include proper validation rules, factory definitions, and seeder classes with realistic data.
```

## 3. Admin CMS Controllers Prompt

```
Create admin controllers for the portfolio CMS that integrate with the existing admin panel:

**Admin/PersonalInfoController** (singleton resource):
- show(): Display current personal info
- edit(): Show edit form  
- update(): Update personal info with validation
- Handle profile image upload with proper validation and storage

**Admin/SocialLinkController**:
- index(): List all social links with sorting
- create/store(): Add new social platform
- edit/update(): Modify existing links
- destroy(): Delete social link
- reorder(): AJAX endpoint for drag-and-drop reordering

**Admin/TechStackController**:
- index(): Grouped by category with search/filter
- create/store(): Add new technology
- edit/update(): Modify technology details
- destroy(): Remove technology
- bulkUpdate(): Batch update proficiency levels or categories

**Admin/ExperienceController**:
- index(): Timeline view with search
- create/store(): Add new experience
- edit/update(): Rich text editor for descriptions
- destroy(): Delete experience
- reorder(): Change display order

**Admin/ProjectController**:
- index(): Grid/list view with filters (featured, published, category)
- create/store(): Full project creation with image uploads
- edit/update(): Complete project management
- show(): Preview project details
- destroy(): Delete project
- toggleFeatured(): Quick feature/unfeature toggle
- togglePublished(): Quick publish/unpublish toggle

**Admin/ContactSubmissionController**:
- index(): List submissions with filters (status, date)
- show(): View submission details
- markAsRead(): Update status
- destroy(): Delete submission
- export(): Export submissions as CSV

**Admin/SiteSettingController**:
- index(): Grouped settings with tabs (General, SEO, Social, etc.)
- update(): Bulk update settings
- reset(): Reset to default values

Each controller should:
- Use FormRequest classes for validation
- Include proper authorization policies
- Return Inertia responses for React components
- Include success/error flash messages
- Handle file uploads securely
- Include bulk operations where appropriate
```

## 4. React Admin Components Prompt

```
Create React admin components that work with the existing admin panel layout:

**PersonalInfoForm Component**:
- Form sections: Basic Info, Contact, Bio, Hero Content, Availability
- Profile image upload with preview and crop functionality
- Rich text editor for bio content
- Form validation with react-hook-form + zod
- Auto-save functionality for better UX

**SocialLinksManager Component**:
- Drag-and-drop reorderable list
- Add new platform with icon picker
- Inline editing for quick updates
- Toggle active/inactive status
- Preview of how links appear on portfolio
- Validation for URL formats

**TechStackManager Component**:
- Tabbed interface by category (Frontend, Backend, Database, etc.)
- Add/edit modal with icon and color picker
- Proficiency level slider
- Bulk operations (change category, delete multiple)
- Featured technologies toggle
- Live preview of tech stack display

**ExperienceManager Component**:
- Timeline-style interface
- Rich text editor for descriptions and achievements
- Technology picker with autocomplete
- Date pickers with current position toggle
- Company logo upload
- Drag-and-drop reordering

**ProjectManager Component**:
- Card-based grid layout with filters
- Featured projects section at top
- Quick actions (feature, publish, delete)
- Search and category filtering
- Bulk operations toolbar
- Image gallery management
- SEO preview for project pages

**ProjectEditor Component**:
- Multi-step form (Basic Info, Details, Media, SEO)
- Rich text editor for descriptions
- Technology tags with autocomplete
- Image upload with gallery management
- Link validation for GitHub/live URLs
- Preview mode showing portfolio display
- Auto-save drafts

**ContactSubmissionsList Component**:
- Table with sorting and filtering
- Status badges (new, read, replied)
- Quick actions (mark as read, reply, delete)
- Search functionality
- Export options
- Bulk operations

**SiteSettingsPanel Component**:
- Tabbed interface (General, SEO, Portfolio, Contact)
- Form fields based on setting type (text, boolean, JSON)
- Live preview of changes
- Reset to defaults option
- Import/export settings functionality

All components should:
- Use shadcn/ui components for consistency
- Include proper loading states
- Handle errors gracefully
- Include confirmation dialogs for destructive actions
- Be fully responsive
- Include keyboard shortcuts for power users
```

## 5. Frontend Portfolio Integration Prompt

```
Update the portfolio frontend to fetch data from the database instead of static content:

**Create API integration layer**:
- usePortfolioData hook for fetching all portfolio content
- Individual hooks: usePersonalInfo, useSocialLinks, useExperiences, useProjects
- Include loading states, error handling, and caching
- Real-time updates when admin makes changes (optional WebSocket integration)

**Update existing components**:

**Hero Section**: 
- Fetch personal_info.hero_greeting, hero_tagline, name, title
- Dynamic availability status with different styling
- Load profile image from database

**About Section**:
- Load bio_long, tech stacks grouped by category
- Dynamic tech stack with proficiency indicators
- Featured technologies highlighted differently

**Experience Section**:
- Load experiences ordered by date
- Dynamic company logos and links
- Rich content for descriptions and achievements
- Technology badges from database

**Projects Section**:
- Load featured projects first, then others
- Dynamic project categories filtering
- Image galleries from database
- View count tracking (optional)

**Contact Section**:
- Load contact info from personal_info
- Social links from database
- Dynamic contact form that saves to contact_submissions

**Social/Email Sidebars**:
- Load social_links where is_active = true
- Dynamic email from personal_info
- Respect sort_order for icon positioning

**SEO Integration**:
- Dynamic meta tags from personal_info and site_settings
- Structured data for projects and experience
- Dynamic sitemap generation

**Add these features**:
- Loading skeletons while data fetches
- Error boundaries for failed API calls  
- Offline support with cached content
- Analytics tracking for project views
- Search functionality across projects
- RSS feed for projects/blog posts
```

## 6. Data Seeding & Migration Prompt

```
Create comprehensive database seeders with realistic portfolio content:

**PersonalInfoSeeder**:
- Use Mark John Ignacio's actual information
- Multiple bio variations (short/long)
- Professional hero content variations
- Contact information and availability status

**SocialLinksSeeder**:
- GitHub, LinkedIn, Twitter, Email with proper URLs
- Additional platforms: Dev.to, Stack Overflow, Medium
- Proper sort order and active status
- Icon mappings for each platform

**TechStackSeeder**:
- Frontend: React, TypeScript, Tailwind CSS, Next.js, Vue.js
- Backend: Laravel, PHP, Node.js, Python
- Database: MySQL, PostgreSQL, SQLite, MongoDB
- Cloud: AWS, Docker, Linux, Git
- Tools: Vite, Webpack, Jest, Cypress
- Proper categorization and proficiency levels

**ExperienceSeeder**:
- HRWEB Inc., AWS/Edukasyon.ph, Dei Gratia School experiences
- Realistic achievements and technology arrays
- Proper date formatting and company information

**ProjectSeeder**:
- AWS Cloud Resume Challenge (featured)
- Financial Management Application (featured)
- Online Thesis Archiving System
- Portfolio Website (current project)
- Additional portfolio projects with proper categorization

**SiteSettingsSeeder**:
- SEO settings (meta description, keywords, OG tags)
- Contact form settings (rate limiting, notification email)
- Portfolio display settings (projects per page, featured count)
- Analytics and tracking settings

**Run these commands**:
```bash
php artisan migrate:fresh
php artisan db:seed --class=PortfolioSeeder
php artisan storage:link
php artisan optimize
```

Include proper error handling and rollback capabilities for all seeders.
```

## 7. Admin Routes & Navigation Integration Prompt

```
Integrate portfolio CMS routes with the existing admin panel:

**Add to routes/admin.php**:
```php
Route::prefix('portfolio')->name('portfolio.')->group(function () {
    // Personal Info (singleton)
    Route::get('personal-info', [PersonalInfoController::class, 'show'])->name('personal-info.show');
    Route::get('personal-info/edit', [PersonalInfoController::class, 'edit'])->name('personal-info.edit');
    Route::put('personal-info', [PersonalInfoController::class, 'update'])->name('personal-info.update');
    
    // Social Links
    Route::resource('social-links', SocialLinkController::class);
    Route::post('social-links/reorder', [SocialLinkController::class, 'reorder'])->name('social-links.reorder');
    
    // Tech Stack
    Route::resource('tech-stack', TechStackController::class);
    Route::post('tech-stack/bulk-update', [TechStackController::class, 'bulkUpdate'])->name('tech-stack.bulk-update');
    
    // Experience
    Route::resource('experiences', ExperienceController::class);
    Route::post('experiences/reorder', [ExperienceController::class, 'reorder'])->name('experiences.reorder');
    
    // Projects
    Route::resource('projects', ProjectController::class);
    Route::post('projects/{project}/toggle-featured', [ProjectController::class, 'toggleFeatured'])->name('projects.toggle-featured');
    Route::post('projects/{project}/toggle-published', [ProjectController::class, 'togglePublished'])->name('projects.toggle-published');
    
    // Contact Submissions
    Route::resource('contact-submissions', ContactSubmissionController::class)->only(['index', 'show', 'destroy']);
    Route::post('contact-submissions/{submission}/mark-read', [ContactSubmissionController::class, 'markAsRead'])->name('contact-submissions.mark-read');
    Route::get('contact-submissions/export', [ContactSubmissionController::class, 'export'])->name('contact-submissions.export');
    
    // Site Settings
    Route::get('settings', [SiteSettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [SiteSettingController::class, 'update'])->name('settings.update');
});
```

**Update admin navigation** to include Portfolio section:
```typescript
const portfolioMenuItems = [
  { name: 'Personal Info', href: '/admin/portfolio/personal-info', icon: User },
  { name: 'Social Links', href: '/admin/portfolio/social-links', icon: Link },
  { name: 'Tech Stack', href: '/admin/portfolio/tech-stack', icon: Code },
  { name: 'Experience', href: '/admin/portfolio/experiences', icon: Briefcase },
  { name: 'Projects', href: '/admin/portfolio/projects', icon: FolderOpen },
  { name: 'Contact Forms', href: '/admin/portfolio/contact-submissions', icon: Mail },
  { name: 'Settings', href: '/admin/portfolio/settings', icon: Settings },
];
```

**Add portfolio permissions**:
- Create policies for each model
- Add portfolio management permission to existing roles
- Implement proper authorization checks

**Dashboard widgets**:
- Recent contact submissions count
- Projects published/draft stats  
- Popular projects by views
- Quick actions for common tasks
```

## 8. File Upload & Media Management Prompt

```
Implement comprehensive file upload system for portfolio assets:

**Storage Configuration**:
- Configure disk for portfolio uploads (public/portfolio)
- Image optimization pipeline (resize, compress, WebP conversion)
- File validation (type, size, dimensions)
- Secure file handling with proper sanitization

**Upload Features Needed**:
- Profile image upload with cropping
- Project images and galleries
- Company logos for experiences  
- Resume/CV file upload
- Social media icons (custom icons)

**Image Processing**:
- Multiple sizes: thumbnail (150x150), medium (400x300), large (800x600), original
- WebP conversion for better performance
- Lazy loading integration
- Alt text management for accessibility

**Media Library Component**:
- Grid view of uploaded files
- Search and filter capabilities
- Bulk operations (delete, optimize)
- File details sidebar (size, dimensions, usage)
- Direct upload with drag-and-drop
- Integration with rich text editors

**API Endpoints**:
```php
Route::post('media/upload', [MediaController::class, 'upload']);
Route::get('media', [MediaController::class, 'index']);
Route::delete('media/{file}', [MediaController::class, 'destroy']);
Route::post('media/{file}/optimize', [MediaController::class, 'optimize']);
```

**Usage Integration**:
- File picker component for forms
- Image preview in admin forms
- Automatic cleanup of unused files
- CDN integration for production
- Backup strategy for media files
```

## Quick Start Command

```bash
# Run this single command to set up everything:
php artisan make:portfolio-cms --with-admin --database=sqlite --seed
```

This will create all migrations, models, controllers, and seed the database with your portfolio content!