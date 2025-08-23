export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  links?: { github?: string; demo?: string };
  featured?: boolean;
  image?: string; // path to image
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'cloud-resume',
    title: 'AWS Cloud Resume Challenge',
    description: 'A serverless resume built with AWS Lambda, API Gateway, DynamoDB, and CloudFront.',
    longDescription:
      'Full infrastructure defined as code. Leveraged AWS services for a low-cost, highly available personal resume with visitor counter and CI/CD pipeline.',
    tech: ['AWS', 'Lambda', 'API Gateway', 'DynamoDB', 'CloudFront'],
    featured: true,
    links: { github: 'https://github.com/mark-john-ignacio', demo: '#' },
    image: '/images/placeholders/feature-1.svg',
  },
  {
    id: 'thesis-archiver',
    title: 'Online Thesis Archiving System',
    description: 'A secure platform for managing and accessing academic research documents.',
    longDescription:
      'Implements role-based access, full text search, versioning, and audit trails to streamline academic record management and retrieval.',
    tech: ['PHP', 'MySQL', 'Tailwind'],
    featured: true,
    links: { github: '#', demo: '#' },
    image: '/images/placeholders/feature-2.svg',
  },
  {
    id: 'financial-apps',
    title: 'HRWEB Financial Applications',
    description: 'Modern financial applications built with Laravel and React improving stability and UX.',
    longDescription:
      'Refactored legacy modules into modular services, introduced real-time dashboards, and improved data integrity with robust validation layers.',
    tech: ['Laravel', 'React', 'Tailwind', 'Inertia.js'],
    featured: true,
    links: { github: '#', demo: '#' },
    image: '/images/placeholders/feature-3.svg',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'This portfolio project showcasing my work and experience with refined UI/UX.',
    longDescription:
      'Built with Laravel + Inertia + React + TypeScript. Focus on accessibility, performance, and motion design patterns inspired by top personal sites.',
    tech: ['Laravel', 'React', 'TypeScript', 'Framer Motion'],
    links: { github: 'https://github.com/mark-john-ignacio/laravel-react-portfolio', demo: '#' },
    image: '/images/placeholders/grid-1.svg',
  },
  {
    id: 'infra-scripts',
    title: 'Infrastructure Scripts',
    description: 'Automation scripts for provisioning and monitoring cloud resources.',
    tech: ['AWS', 'Python', 'Bash'],
    image: '/images/placeholders/grid-2.svg',
  },
  {
    id: 'design-system',
    title: 'Design System Playground',
    description: 'Exploration of component tokens & accessibility patterns.',
    tech: ['React', 'TypeScript', 'Storybook'],
    image: '/images/placeholders/grid-3.svg',
  },
  {
    id: 'realtime-dashboard',
    title: 'Real-time Dashboard Demo',
    description: 'Event-driven updates demonstrating WebSocket streaming.',
    tech: ['Laravel', 'Pusher', 'React'],
    image: '/images/placeholders/grid-4.svg',
  },
];
