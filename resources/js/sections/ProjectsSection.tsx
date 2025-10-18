import React, { useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';
import { Reveal, RevealGroup } from '@/components/reveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
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
            >
              <GlassCard hover glow className="group relative flex flex-col p-6 h-full">
                <div className="mb-3 aspect-video w-full overflow-hidden rounded bg-[#0f223d] ring-1 ring-[#233554]/30">
                  <img src={p.image || '/images/placeholders/grid-1.svg'} alt={p.title} loading="lazy" className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" />
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
                        className="hover:text-[#64ffda] transition-colors"
                        aria-label="GitHub repository"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {p.links?.demo && (
                      <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#64ffda] transition-colors"
                        aria-label="Live demo"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <p className="mb-4 text-sm text-[#8892b0] flex-1">{p.description}</p>
                <ul className="mb-4 flex flex-wrap gap-3 font-mono text-[11px] text-[#8892b0]">
                  {p.tech.map((t) => (
                    <li key={t} className="px-2 py-1 rounded bg-[#64ffda]/5 ring-1 ring-[#64ffda]/20">{t}</li>
                  ))}
                </ul>
                <div>
                  <button
                    onClick={() => setActiveProject(p)}
                    className="text-[#64ffda] font-mono text-xs underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 flex items-center gap-1 group/btn"
                  >
                    View Details
                    <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </RevealGroup>
        <div className="mt-10 text-center">
          <AnimatedButton
            onClick={() => setShowAll((s) => !s)}
            variant="outline"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </AnimatedButton>
        </div>
      </motion.div>
      <ProjectDialog project={activeProject} onOpenChange={(open) => !open && setActiveProject(null)} />
    </Section>
  );
}

// ProjectDialog extracted to components/ProjectDialog.tsx
