import React, { useRef, useState, useMemo } from 'react';
import { useInView, motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { Reveal, RevealGroup } from '@/components/reveal';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  links?: { github?: string; demo?: string };
  featured?: boolean;
  image?: string; // path to image
}

const baseProjects: ProjectItem[] = [
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

export interface ProjectsSectionProps {
  id?: string;
  headingIndex?: number;
}

export function ProjectsSection({ id = 'work', headingIndex = 3 }: ProjectsSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const featured = useMemo(() => baseProjects.filter((p) => p.featured), []);
  const secondary = useMemo(() => baseProjects.filter((p) => !p.featured), []);

  return (
    <section ref={ref} className="px-6 py-24 md:px-24" aria-labelledby={id}>
      <h2 id={id} className="group mb-8 flex items-center gap-4 font-semibold tracking-tight text-[#e6f1ff] text-2xl md:text-3xl">
        <span className="font-mono text-base text-[#64ffda]">{String(headingIndex).padStart(2, '0')}.</span> Some Things I've Built
        <span className="h-px flex-1 bg-[#233554] group-hover:bg-[#64ffda]/50 transition-colors" />
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="space-y-24"
      >
        <RevealGroup>
        {featured.map((p, idx) => (
          <Reveal key={p.id} index={idx} distance={40} className="grid items-center gap-10 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setActiveProject(p)}
              className={`order-2 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'} relative group focus:outline-none`}
              aria-label={`Open details for ${p.title}`}
            >
              <div className="aspect-video w-full overflow-hidden rounded bg-[#112240] ring-1 ring-[#64ffda]/30">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100 group-hover:scale-[1.02]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded border border-[#64ffda]/30 opacity-0 transition group-hover:opacity-100" />
            </button>
            <div className={`order-1 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative`}> 
              <p className="mb-2 font-mono text-sm text-[#64ffda]">Featured Project</p>
              <h3 className="mb-4 text-2xl font-semibold text-[#e6f1ff]">
                <button
                  type="button"
                  onClick={() => setActiveProject(p)}
                  className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                >
                  {p.title}
                </button>
              </h3>
              <div className="mb-4 rounded bg-[#112240] p-6 text-[#8892b0] shadow-lg ring-1 ring-[#1d2d50]">
                {p.description}
              </div>
              <ul className="mb-4 flex flex-wrap gap-4 font-mono text-xs text-[#8892b0]">
                {p.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="flex gap-4 text-sm font-mono">
                {p.links?.github && (
                  <a href={p.links.github} target="_blank" rel="noreferrer" className="text-[#64ffda] hover:underline">GitHub</a>
                )}
                {p.links?.demo && (
                  <a href={p.links.demo} target="_blank" rel="noreferrer" className="text-[#64ffda] hover:underline">Live Demo</a>
                )}
                <button
                  onClick={() => setActiveProject(p)}
                  className="text-[#64ffda] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                >
                  Details
                </button>
              </div>
            </div>
          </Reveal>
        ))}
        </RevealGroup>
        <RevealGroup as="div" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondary.slice(0, showAll ? undefined : 3).map((p) => (
            <Reveal
              key={p.id}
              distance={24}
              className="group relative flex flex-col rounded-lg bg-[#112240] p-6 ring-1 ring-[#233554] hover:-translate-y-1 hover:ring-[#64ffda] transition"
            >
              <div className="mb-3 aspect-video w-full overflow-hidden rounded bg-[#0f223d]">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover opacity-80 group-hover:opacity-100" />
              </div>
              <div className="mb-2 flex items-start justify-between">
                <h4 className="text-lg font-semibold text-[#e6f1ff] group-hover:text-[#64ffda] transition-colors">
                  <button
                    type="button"
                    onClick={() => setActiveProject(p)}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 rounded"
                  >
                    {p.title}
                  </button>
                </h4>
                <div className="flex gap-3 text-[#8892b0]">
                  {p.links?.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#64ffda]"
                      aria-label="GitHub repository"
                    >
                      GH
                    </a>
                  )}
                  {p.links?.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#64ffda]"
                      aria-label="Live demo"
                    >
                      ↗
                    </a>
                  )}
                </div>
              </div>
              <p className="mb-4 text-sm text-[#8892b0] flex-1">{p.description}</p>
              <ul className="mb-4 flex flex-wrap gap-3 font-mono text-[11px] text-[#8892b0]">
                {p.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div>
                <button
                  onClick={() => setActiveProject(p)}
                  className="text-[#64ffda] font-mono text-xs underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                >
                  Details
                </button>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            className="rounded border border-[#64ffda] px-6 py-3 font-mono text-sm text-[#64ffda] transition hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </motion.div>
      <ProjectDialog project={activeProject} onOpenChange={(open) => !open && setActiveProject(null)} />
    </section>
  );
}

interface ProjectDialogProps {
  project: ProjectItem | null;
  onOpenChange: (open: boolean) => void;
}

function ProjectDialog({ project, onOpenChange }: ProjectDialogProps) {
  return (
    <Dialog.Root open={!!project} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {project && (
          <Dialog.Portal forceMount>
            <motion.div
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Dialog.Overlay className="fixed inset-0" />
            <div className="fixed inset-0 z-[210] overflow-y-auto p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25 }}
                className="mx-auto max-w-2xl rounded-lg bg-[#112240] p-6 shadow-xl ring-1 ring-[#1d2d50]"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <Dialog.Title className="text-xl font-semibold text-[#e6f1ff]">{project.title}</Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      className="rounded border border-[#64ffda] px-3 py-1 font-mono text-xs text-[#64ffda] hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                      aria-label="Close project details"
                    >
                      Close
                    </button>
                  </Dialog.Close>
                </div>
                <div className="mb-4 aspect-video w-full overflow-hidden rounded bg-[#0f223d]">
                  <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="mb-4 text-[#8892b0] text-sm leading-relaxed">{project.longDescription || project.description}</p>
                <ul className="mb-6 flex flex-wrap gap-3 font-mono text-[11px] text-[#8892b0]">
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm font-mono">
                  {project.links?.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="text-[#64ffda] hover:underline">
                      GitHub
                    </a>
                  )}
                  {project.links?.demo && (
                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-[#64ffda] hover:underline">
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
