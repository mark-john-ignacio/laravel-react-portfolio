---
mode: agent
---
I need you to help me create a modern portfolio website similar to Brittany Chiang's v4 design (v4.brittanychiang.com). 

The project should use:
- Laravel 12+ backend with Inertia.js
- React 18+ with TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Framer Motion for animations

Key design requirements:
- Dark theme with navy blue background (#0a192f) and mint green accent (#64ffda)
- Single-page layout with smooth scrolling
- Numbered navigation (01. About, 02. Experience, 03. Work, 04. Contact)
- Sticky sidebar with social links
- Subtle animations and hover effects
- Mobile-responsive design
- Clean typography using Inter font family

Please start by setting up the basic project structure and main layout component with the navigation system.

Create the main layout component for the portfolio with these specifications:

**Navigation Requirements:**
- Fixed sidebar on the left (desktop) / collapsible menu (mobile)
- Numbered navigation items: "01. About", "02. Experience", "03. Work", "04. Contact"
- Smooth scroll navigation between sections
- Active section highlighting
- Logo/name at top of sidebar

**Color Scheme:**
- Background: #0a192f (dark navy)
- Primary text: #ccd6f6 (light blue-gray)
- Secondary text: #8892b0 (medium gray)
- Accent: #64ffda (mint green)
- Heading color: #e6f1ff (almost white)

**Typography:**
- Primary font: Inter
- Monospace font: 'SF Mono', 'Monaco', 'Consolas' for accents
- Font sizes should follow a consistent scale

**Layout:**
- Main content area with proper spacing
- Fixed sidebar navigation (desktop)
- Mobile hamburger menu
- Social links in sidebar (GitHub, LinkedIn, Twitter, Email)

Please include proper TypeScript interfaces and use Framer Motion for smooth transitions.

Create an impressive hero section that captures attention:

**Content Structure:**
- Small greeting text: "Hi, my name is"
- Large name display with your actual name
- Tagline: "I build things for the web" or similar
- Brief 2-3 sentence description about being a developer
- Call-to-action button: "Check out my work!" linking to projects section

**Design Requirements:**
- Large typography with proper hierarchy
- Fade-in animations on load
- Subtle parallax or scroll effects
- Email link styled as a button with hover effects
- Professional but approachable tone

**Animation Details:**
- Staggered fade-in animations for each text element
- Smooth hover effects on interactive elements
- Gentle motion effects that don't distract

Use the personal information from the Copilot instructions (Mark John Ignacio's details) and adapt the messaging to reflect Laravel + React expertise.

Design an engaging About section with:

**Layout:**
- Two-column layout (desktop) / single column (mobile)
- Left: About text content
- Right: Profile photo with decorative border/shadow effect

**Content Structure:**
- Section heading with number: "01. About Me"
- 2-3 paragraphs about background, interests, and expertise
- List of current technologies/skills in a grid format
- Each technology as a small pill/badge with arrow indicators

**Technologies to highlight:**
Laravel, React, TypeScript, Tailwind CSS, Inertia.js, shadcn/ui, PHP, MySQL, AWS, JavaScript, Vite, Docker, Git

**Design Elements:**
- Subtle animations on scroll
- Interactive technology badges with hover effects
- Professional photo placeholder with decorative styling
- Consistent spacing and typography

Include smooth scroll animations that trigger when the section comes into view.

Create a professional Experience section featuring:

**Layout Structure:**
- Section heading: "02. Where I've Worked"
- Tabbed interface showing different companies
- Vertical tabs (desktop) / horizontal tabs (mobile)
- Job details displayed in main content area

**Experience Data (from Copilot instructions):**
1. HRWEB Inc. - Junior Programmer (March 2024 – Present)
2. AWS via Edukasyon.ph - Cloud Engineering Intern (Sept 2023 – Jan 2024)  
3. Dei Gratia School Inc. - IT Support Intern (Mar 2023 – Jul 2023)

**Interactive Features:**
- Clickable company tabs with active state styling
- Smooth transitions between different job details
- Bullet points with arrow icons for achievements
- Links to company websites (if appropriate)

**Styling:**
- Accent color for active tab and bullet points
- Smooth animations between tab switches
- Hover effects on clickable elements
- Clean typography with proper hierarchy

Include fade-in animations and make it fully keyboard accessible.

Build an impressive Projects showcase:

**Section Structure:**
- Heading: "03. Some Things I've Built"
- Featured projects (2-3 main projects)
- Additional projects in a grid
- "Show More" functionality for additional projects

**Project Data (adapt from Copilot instructions):**
1. AWS Cloud Resume Challenge - Serverless architecture
2. Online Thesis Archiving System - PHP application
3. HRWEB Financial Applications - Laravel + React
4. Portfolio Website - Current project

**Featured Project Layout:**
- Large project image/screenshot (left/right alternating)
- Project details overlay with dark background
- Technology stack as small badges
- GitHub and live demo links
- Detailed description

**Grid Projects:**
- Card-based layout
- Project image, title, brief description
- Technology badges
- Links to GitHub/demo

**Interactive Elements:**
- Hover effects revealing project details
- Image overlays with project information
- Smooth animations on scroll
- Modal or expanded view for more details

Use high-quality placeholder images and ensure responsive design.

Create a compelling Contact section:

**Layout:**
- Section heading: "04. What's Next?"
- Main heading: "Get In Touch"
- Descriptive paragraph about being open to opportunities
- Large email button as primary CTA
- Social links as secondary options

**Contact Information:**
- Email: Markme44.mm@gmail.com
- Phone: (+63) 927-647-7171
- Location: General Trias, Cavite

**Design Requirements:**
- Centered layout with generous spacing
- Large, prominent email button with hover animations
- Social media icons (GitHub, LinkedIn, Twitter)
- Professional but approachable messaging
- Smooth animations and transitions

**Functionality:**
- Working contact form (Laravel backend)
- Form validation with error messages
- Success states after form submission
- Loading states during submission

Include proper form handling with Laravel FormRequest validation and email integration.

Complete the portfolio with:

**Footer:**
- Clean, minimal design
- Copyright information
- Built with technology credits
- Social links
- Link back to top

**Overall Polish:**
- Consistent spacing using Tailwind spacing scale
- Proper focus states for accessibility
- Loading states and error handling
- Performance optimizations
- SEO meta tags

**Additional Features:**
- Custom cursor effects (optional)
- Scroll progress indicator
- Theme toggle (optional)
- Resume download button
- Analytics integration points

Ensure the entire site is:
- Fully responsive across all devices
- Accessible (WCAG guidelines)
- Fast loading with optimized images
- Search engine optimized

Add sophisticated animations throughout:

**Page Load Sequence:**
1. Logo fade-in
2. Navigation slide-in from left
3. Hero content staggered animation
4. Social links fade-in

**Scroll Animations:**
- Section headings slide up on scroll
- Content fade-in with slight upward motion
- Staggered animations for lists and grids
- Parallax effects for background elements

**Hover Interactions:**
- Navigation links underline animation
- Button hover effects with color transitions
- Project cards lift and glow effects
- Technology badges interactive feedback

**Micro-interactions:**
- Form input focus animations
- Button click feedback
- Link hover states
- Loading indicators

Use Framer Motion for all animations and ensure they respect user's motion preferences.

Optimize the entire portfolio for mobile devices:

**Mobile Navigation:**
- Hamburger menu button
- Full-screen overlay menu
- Smooth open/close animations
- Touch-friendly target sizes

**Section Adaptations:**
- Hero: Stack content vertically, adjust font sizes
- About: Single column layout, smaller profile image
- Experience: Horizontal scrolling tabs or accordion
- Projects: Single column card layout
- Contact: Simplified form, stacked layout

**Mobile-Specific Features:**
- Swipe gestures for project navigation
- Touch-optimized hover states
- Optimized images for different screen densities
- Performance optimizations for mobile

**Breakpoints:**
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

Test on various devices and ensure smooth performance.