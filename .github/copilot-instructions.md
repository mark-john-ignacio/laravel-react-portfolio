# Enhanced Copilot Instructions for Laravel + React Portfolio (Brittany Chiang Style)

## Project Overview

This is a **production-ready portfolio website** inspired by Brittany Chiang's v4 design (v4.brittanychiang.com), built using Laravel + Inertia.js + React + TypeScript. The application showcases professional experience, projects, and skills in a modern, single-page application format with sophisticated animations and interactions.

### Design Philosophy

- **Dark, professional aesthetic** with navy background and mint green accents
- **Single-page application** with smooth scroll navigation
- **Numbered sections** (01. About, 02. Experience, 03. Work, 04. Contact)  
- **Micro-interactions** and subtle animations throughout
- **Mobile-first responsive design**
- **Accessibility-focused** development

### Key Features

- **Public Portfolio**: Hero, About, Experience, Projects, Contact sections
- **Admin CMS**: Full CRUD operations for content management
- **Modern UI**: Custom design system inspired by Brittany Chiang
- **Sophisticated Animations**: Framer Motion for all interactions
- **Email Integration**: Working contact form with SMTP
- **Type Safety**: Full TypeScript implementation

## Brittany Chiang Design System Integration

### Color Palette

```css
:root {
  --navy: #0a192f;           /* Main background */
  --light-navy: #112240;     /* Elevated surfaces */
  --lightest-navy: #233554;  /* Subtle backgrounds */
  --slate: #8892b0;          /* Secondary text */
  --light-slate: #a8b2d1;    /* Primary text */
  --lightest-slate: #ccd6f6; /* Headings */
  --white: #e6f1ff;          /* Emphasis text */
  --green: #64ffda;          /* Accent color */
  --green-tint: rgba(100, 255, 218, 0.1); /* Subtle backgrounds */
}
```

### Typography System

```typescript
const typography = {
  fonts: {
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
  sizes: {
    'heading-xl': 'clamp(40px, 8vw, 80px)',
    'heading-l': 'clamp(32px, 6vw, 60px)',
    'heading-m': 'clamp(24px, 5vw, 32px)',
    'heading-s': 'clamp(20px, 4vw, 28px)',
    'body-l': '18px',
    'body-m': '16px',
    'body-s': '14px',
    'caption': '12px',
  },
};
```

### Animation Principles

- **Page Load**: Staggered fade-in animations (logo → nav → hero → social)
- **Scroll Animations**: Elements fade up when entering viewport
- **Hover Effects**: Subtle scale and color transitions
- **Micro-interactions**: Button states, form feedback, loading indicators
- **Duration**: 0.3s for quick interactions, 0.6s for page transitions
- **Easing**: Custom cubic-bezier for natural motion

## Architecture & Tech Stack

### Backend (Laravel 12+)

- **Framework**: Laravel with Inertia.js adapter
- **Database**: MySQL/SQLite with Eloquent ORM
- **Authentication**: Existing authentication system
- **Validation**: FormRequest classes with custom rules
- **Email**: SMTP configuration for contact forms

### Frontend (React + TypeScript)

- **Framework**: React 18+ with TypeScript strict mode
- **Build Tool**: Vite for fast development and optimized builds
- **UI Styling**: Custom Tailwind configuration with Brittany Chiang colors
- **Components**: shadcn/ui as base + custom portfolio components
- **Animations**: Framer Motion for all interactions
- **Forms**: react-hook-form + zod validation

### Portfolio-Specific Components

```typescript
// Core layout components
interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

interface SectionProps {
  id: string;
  title: string;
  number: string;
  children: React.ReactNode;
  className?: string;
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index: number;
}

// Portfolio data interfaces
interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  website?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  github?: string;
  external?: string;
  image?: string;
  featured: boolean;
  order: number;
}
```

## Directory Structure & Key Files

```
resources/js/
├── components/
│   ├── ui/                          # shadcn/ui base components
│   ├── portfolio/                   # Portfolio-specific components
│   │   ├── Hero.tsx                 # Landing hero section
│   │   ├── About.tsx                # About section with photo
│   │   ├── Experience.tsx           # Tabbed experience section
│   │   ├── Projects.tsx             # Featured + grid projects
│   │   ├── Contact.tsx              # Contact form section
│   │   ├── Navigation.tsx           # Sticky sidebar navigation
│   │   ├── SocialSidebar.tsx        # Social links sidebar
│   │   └── LoadingScreen.tsx        # Initial loading animation
│   └── common/                      # Reusable components
│       ├── Section.tsx              # Standard section wrapper
│       ├── AnimatedText.tsx         # Text reveal animations
│       └── ScrollIndicator.tsx      # Scroll progress indicator
├── layouts/
│   ├── PortfolioLayout.tsx          # Main portfolio layout
│   └── AdminLayout.tsx              # Admin CMS layout
├── pages/
│   ├── Portfolio.tsx                # Single-page portfolio
│   └── Admin/                       # Admin CMS pages
├── hooks/
│   ├── useScrollSpy.ts              # Track active section
│   ├── useMousePosition.ts          # Custom cursor effects
│   └── usePreferredMotion.ts        # Motion preferences
├── lib/
│   ├── animations.ts                # Framer Motion variants
│   ├── portfolio-data.ts            # Static portfolio content
│   └── scroll-utils.ts              # Smooth scroll helpers
└── styles/
    └── portfolio.css                # Custom portfolio styles
```

## Portfolio-Specific Development Patterns

### Section Structure Pattern

```tsx
export function Section({ id, title, number, children, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("py-20 md:py-32", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          variants={fadeInUpVariant}
          className="flex items-center text-2xl md:text-3xl font-semibold text-lightest-slate mb-8 md:mb-12"
        >
          <span className="text-green font-mono text-lg md:text-xl mr-2">
            {number}.
          </span>
          {title}
          <div className="ml-8 h-px bg-lightest-navy flex-1 hidden md:block"></div>
        </motion.h2>
        {children}
      </div>
    </motion.section>
  );
}
```

### Navigation Pattern

```tsx
export function Navigation() {
  const { activeSection } = useScrollSpy();
  
  const navItems = [
    { id: 'about', label: 'About', number: '01' },
    { id: 'experience', label: 'Experience', number: '02' },
    { id: 'work', label: 'Work', number: '03' },
    { id: 'contact', label: 'Contact', number: '04' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 md:w-24 flex flex-col items-center justify-center z-50">
      {navItems.map((item) => (
        <NavItem 
          key={item.id}
          {...item}
          active={activeSection === item.id}
        />
      ))}
    </nav>
  );
}
```

### Project Card Pattern

```tsx
export function ProjectCard({ project, featured = false, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;
  
  if (featured) {
    return (
      <motion.div
        className={cn(
          "grid md:grid-cols-12 gap-4 md:gap-8 items-center mb-24",
          !isEven && "md:text-right"
        )}
        variants={staggerChildVariant}
      >
        {/* Alternating image/content layout for featured projects */}
        <ProjectImage 
          src={project.image} 
          alt={project.title}
          className={cn(
            "md:col-span-7",
            !isEven ? "md:col-start-6" : "md:col-start-1"
          )}
        />
        <ProjectContent 
          project={project}
          className={cn(
            "md:col-span-5 md:row-start-1",
            !isEven ? "md:col-start-1" : "md:col-start-8"
          )}
        />
      </motion.div>
    );
  }

  return <GridProjectCard project={project} />;
}
```

### Animation Variants

```typescript
// lib/animations.ts
export const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const navLinkHoverVariant = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};
```

## Personal Information (Source of Truth)

### Contact Details

```typescript
export const personalInfo = {
  name: "Mark John Ignacio",
  title: "Full Stack Developer",
  email: "Markme44.mm@gmail.com",
  phone: "(+63) 927-647-7171",
  location: "General Trias, Cavite",
  tagline: "I build exceptional digital experiences",
  description: "I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at HRWEB Inc.",
  social: {
    github: "https://github.com/markjohnignacio",
    linkedin: "https://linkedin.com/in/markjohnignacio", 
    twitter: "https://twitter.com/markjohnignacio"
  }
};
```

### Experience Data

```typescript
export const experiences: Experience[] = [
  {
    id: 1,
    company: "HRWEB Inc.",
    position: "Junior Programmer",
    duration: "March 2024 – Present",
    description: [
      "Designed and developed financial applications using Laravel 12, React, Tailwind CSS, shadcn UI, Inertia.js, and Vite",
      "Built responsive user interfaces with React and Tailwind CSS, focusing on user experience and accessibility",
      "Implemented dynamic features, secure authentication systems, and real-time data visualization components",
      "Improved platform stability by 30% and reduced user-reported bugs through comprehensive testing and debugging"
    ],
    technologies: ["Laravel", "React", "TypeScript", "Tailwind CSS", "Inertia.js", "MySQL", "Vite"]
  },
  {
    id: 2,
    company: "AWS (via Edukasyon.ph)",
    position: "Cloud Engineering Intern",
    duration: "September 2023 – January 2024",
    description: [
      "Deployed and managed scalable infrastructure using Amazon EC2, RDS, and S3 services",
      "Configured IAM roles and policies, set up CloudWatch monitoring for performance optimization",
      "Developed Python automation scripts for infrastructure management in Linux environments",
      "Applied AWS Well-Architected Framework principles to ensure secure and efficient cloud solutions"
    ],
    technologies: ["AWS", "Python", "Linux", "CloudWatch", "EC2", "RDS", "S3"]
  },
  {
    id: 3,
    company: "Dei Gratia School Inc.",
    position: "IT Support Intern",
    duration: "March 2023 – July 2023",
    description: [
      "Maintained hardware infrastructure and performed OS and software installations across campus",
      "Provided comprehensive technical support for students, faculty, and administrative staff",
      "Diagnosed and resolved network connectivity issues, improving overall system uptime",
      "Created documentation for common IT procedures and troubleshooting workflows"
    ],
    technologies: ["Windows", "Linux", "Networking", "Hardware Maintenance", "Technical Support"]
  }
];
```

### Featured Projects Data

```typescript
export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Financial Management Application",
    description: "A comprehensive financial application built for HRWEB Inc. featuring real-time data visualization, secure authentication, and responsive design.",
    longDescription: "Designed and developed a full-stack financial management application using modern web technologies. The application features a React-based frontend with TypeScript for type safety, Laravel backend with robust API architecture, and real-time data visualization components. Implemented secure authentication, role-based access control, and comprehensive testing suite.",
    technologies: ["Laravel", "React", "TypeScript", "Tailwind CSS", "Inertia.js", "MySQL", "Vite"],
    featured: true,
    order: 1,
    image: "/images/projects/financial-app.jpg"
  },
  {
    id: 2,
    title: "AWS Cloud Resume Challenge",
    description: "A serverless resume website showcasing cloud architecture skills using AWS services with Infrastructure as Code.",
    longDescription: "Built a serverless resume website using AWS services including Lambda, API Gateway, DynamoDB, and CloudFront. Implemented Infrastructure as Code using CloudFormation, set up CI/CD pipeline with GitHub Actions, and integrated visitor counter functionality with DynamoDB. Demonstrates proficiency in modern cloud architecture and DevOps practices.",
    technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFront", "Python", "JavaScript", "CloudFormation"],
    github: "https://github.com/markjohnignacio/aws-cloud-resume",
    external: "https://resume.markjohnignacio.com",
    featured: true,
    order: 2,
    image: "/images/projects/cloud-resume.jpg"
  },
  {
    id: 3,
    title: "Online Thesis Archiving System",
    description: "A secure web application for academic institutions to manage and archive thesis documents with advanced search capabilities.",
    longDescription: "Developed a comprehensive thesis archiving system for academic institutions using PHP and MySQL. Features include secure document upload and storage, advanced search functionality, user role management, and automated backup systems. The system improved document retrieval efficiency by 40% and provides robust security for sensitive academic materials.",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Apache"],
    featured: true,
    order: 3,
    image: "/images/projects/thesis-archive.jpg"
  }
];
```

## Development Workflow Commands

### Portfolio-Specific Commands

```bash
# Development setup
npm run dev:portfolio          # Start with portfolio-specific hot reload
php artisan portfolio:seed     # Seed portfolio data
php artisan make:portfolio     # Generate portfolio components

# Asset optimization
npm run build:portfolio        # Optimized build for portfolio
npm run optimize:images        # Compress and optimize project images
npm run generate:sitemap       # Generate SEO sitemap

# Content management
php artisan portfolio:backup   # Backup portfolio content
php artisan portfolio:deploy   # Deploy to production
```

## Performance & SEO Considerations

### Image Optimization

```typescript
// Implement lazy loading and responsive images
export function ProjectImage({ src, alt, className }: ProjectImageProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
      <div className="absolute inset-0 bg-green/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
```

### SEO Meta Tags

```typescript
// Implement dynamic meta tags for portfolio sections
export const portfolioMeta = {
  title: "Mark John Ignacio - Full Stack Developer",
  description: "Full Stack Developer specializing in Laravel, React, and AWS. Building exceptional digital experiences with modern web technologies.",
  keywords: ["Full Stack Developer", "Laravel", "React", "TypeScript", "AWS", "Web Development"],
  openGraph: {
    title: "Mark John Ignacio - Full Stack Developer",
    description: "Full Stack Developer specializing in Laravel, React, and AWS",
    image: "/images/og-image.jpg",
    url: "https://markjohnignacio.com"
  }
};
```

### Performance Optimizations

```typescript
// Implement intersection observer for animations
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: "-50px",
      ...options
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [options]);

  return isIntersecting;
}

// Preload critical images
export function preloadCriticalImages() {
  const criticalImages = [
    "/images/hero-bg.jpg",
    "/images/profile.jpg",
    "/images/projects/featured-1.jpg"
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
```

## Accessibility Standards

### Focus Management

```typescript
// Custom focus trap for mobile navigation
export function useFocusTrap(isOpen: boolean) {
  const trapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = trapRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  return trapRef;
}
```

### ARIA Labels and Semantic HTML

```typescript
// Proper semantic structure for sections
export function AccessibleSection({ id, title, number, children }: SectionProps) {
  return (
    <section 
      id={id}
      aria-labelledby={`${id}-heading`}
      className="py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 
          id={`${id}-heading`}
          className="flex items-center text-2xl md:text-3xl font-semibold text-lightest-slate mb-8"
        >
          <span 
            className="text-green font-mono text-lg md:text-xl mr-2"
            aria-label={`Section ${number}`}
          >
            {number}.
          </span>
          {title}
          <div 
            className="ml-8 h-px bg-lightest-navy flex-1 hidden md:block"
            role="presentation"
            aria-hidden="true"
          />
        </h2>
        <div role="region" aria-labelledby={`${id}-heading`}>
          {children}
        </div>
      </div>
    </section>
  );
}
```

## Advanced Animation Patterns

### Custom Hooks for Animations

```typescript
// Advanced scroll-triggered animations
export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { 
        threshold,
        rootMargin: '-100px 0px'
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, isVisible]);

  return { ref: elementRef, isVisible };
}

// Magnetic button effect
export function useMagneticEffect(strength = 0.3) {
  const elementRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return { ref: elementRef, position };
}
```

### Complex Animation Sequences

```typescript
// Page load animation sequence
export const pageLoadSequence = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
  exit: { opacity: 0 }
};

export const staggeredFadeIn = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
};

// Project card reveal animation
export const projectCardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      scale: {
        duration: 0.6
      }
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};
```

## Mobile-Specific Optimizations

### Touch Interactions

```typescript
// Enhanced mobile navigation
export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle swipe to close
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 bg-navy"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Mobile navigation content */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Responsive Breakpoints

```typescript
// Custom breakpoint system
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Responsive utilities
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('sm');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1536) setBreakpoint('2xl');
      else if (width >= 1280) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else setBreakpoint('sm');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}
```

## Testing Strategies

### Component Testing

```typescript
// Test utilities for portfolio components
import { render, screen, fireEvent } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';

export function renderWithMotion(ui: React.ReactElement, options = {}) {
  return render(
    <MotionConfig reducedMotion="always">
      {ui}
    </MotionConfig>,
    options
  );
}

// Example test for Navigation component
describe('Navigation', () => {
  it('highlights active section', async () => {
    renderWithMotion(<Navigation />);
    
    // Mock intersection observer
    const mockObserver = jest.fn();
    global.IntersectionObserver = jest.fn(() => ({
      observe: mockObserver,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    expect(screen.getByLabelText('About section')).toHaveClass('active');
  });
});
```

### Accessibility Testing

```typescript
// Accessibility test utilities
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Portfolio Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = renderWithMotion(<Portfolio />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    renderWithMotion(<Navigation />);
    
    const firstNavItem = screen.getByRole('link', { name: /about/i });
    firstNavItem.focus();
    
    fireEvent.keyDown(firstNavItem, { key: 'Tab' });
    expect(screen.getByRole('link', { name: /experience/i })).toHaveFocus();
  });
});
```

## Deployment & Production

### Build Optimization

```bash
# Production build with optimizations
npm run build:production

# Optimize images for web
npm run optimize:images

# Generate service worker for offline support
npm run generate:sw

# Bundle analysis
npm run analyze:bundle
```

### Laravel Production Setup

```php
// config/portfolio.php
return [
    'cache_ttl' => env('PORTFOLIO_CACHE_TTL', 3600),
    'enable_animations' => env('PORTFOLIO_ANIMATIONS', true),
    'image_optimization' => env('PORTFOLIO_IMAGE_OPTIMIZATION', true),
    
    'contact_form' => [
        'rate_limit' => env('CONTACT_RATE_LIMIT', 5),
        'notification_email' => env('CONTACT_NOTIFICATION_EMAIL', 'admin@example.com'),
    ],
    
    'analytics' => [
        'google_analytics_id' => env('GOOGLE_ANALYTICS_ID'),
        'enable_tracking' => env('ENABLE_ANALYTICS', false),
    ],
];
```

## Content Management Integration

### Admin Interface for Portfolio Updates

```tsx
// Admin components for managing portfolio content
export function ProjectEditor({ project }: { project?: Project }) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      title: '',
      description: '',
      technologies: [],
      featured: false
    }
  });

  const onSubmit = async (data: ProjectFormData) => {
    const response = await router.post('/admin/projects', data);
    if (response.success) {
      toast.success('Project saved successfully!');
    }
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Featured Project</FormLabel>
            </FormItem>
          )}
        />
      </div>
      
      <Button type="submit" className="w-full">
        Save Project
      </Button>
    </Form>
  );
}
```

## Quick Reference Commands

```bash
# Start development with portfolio optimizations
npm run dev:portfolio

# Generate portfolio component
php artisan make:portfolio-component ComponentName

# Update portfolio data
php artisan portfolio:sync

# Deploy to production
npm run build:production && php artisan deploy:portfolio

# Run accessibility tests
npm run test:a11y

# Optimize images for portfolio
npm run optimize:portfolio-images

# Generate sitemap
php artisan portfolio:sitemap
```

---

**Remember**: This portfolio is inspired by Brittany Chiang's exceptional design while showcasing your unique Laravel + React expertise. Focus on smooth animations, professional aesthetics, and flawless user experience across all devices. Every interaction should feel intentional and polished.