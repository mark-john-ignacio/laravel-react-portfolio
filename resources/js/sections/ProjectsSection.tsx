import React, { useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';
import { Reveal, RevealGroup } from '@/components/reveal';
// Dynamic projects now passed via props
export interface ProjectItemData {
  id: string;
  slug?: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  links?: { github?: string; demo?: string };
  featured?: boolean;
  image?: string | null;
  gallery?: string[];
  readMinutes?: number | null;
}
import { Section, SectionHeading } from '@/components/Section';
import { ProjectDialog } from '@/components/ProjectDialog';

export interface ProjectsSectionProps { id?: string; headingIndex?: number; featured: ProjectItemData[]; secondary: ProjectItemData[]; }

export function ProjectsSection({ id = 'work', headingIndex = 3, featured, secondary }: ProjectsSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItemData | null>(null);
  // Data already separated server-side

  return (
    <Section as="section" ref={ref} aria-labelledby={id} id={id} className="pt-24">
      <SectionHeading index={headingIndex} id={`${id}-heading`}>
        Some Things I've Built
      </SectionHeading>
      {featured.length === 0 && secondary.length === 0 && (
        <div className="mt-8 rounded border border-[#233554] bg-[#112240] p-8 text-center text-sm text-[#8892b0]">
          <p>No projects are published yet. Mark some projects as published (and optionally featured) in the admin to display them here.</p>
        </div>
      )}
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
                  src={p.image || '/images/placeholders/feature-1.svg'}
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
                <img src={p.image || '/images/placeholders/grid-1.svg'} alt={p.title} loading="lazy" className="h-full w-full object-cover opacity-80 group-hover:opacity-100" />
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
    </Section>
  );
}

// ProjectDialog extracted to components/ProjectDialog.tsx
