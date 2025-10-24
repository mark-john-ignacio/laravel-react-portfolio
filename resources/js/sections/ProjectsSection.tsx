import { ProjectDialog } from '@/components/ProjectDialog';
import { Reveal, RevealGroup } from '@/components/reveal';
import { Section, SectionHeading } from '@/components/Section';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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

export interface ProjectsSectionProps {
    id?: string;
    headingIndex?: number;
    featured: ProjectItemData[];
    secondary: ProjectItemData[];
}

export function ProjectsSection({ id = 'work', headingIndex = 3, featured, secondary }: ProjectsSectionProps) {
    const ref = useRef<HTMLElement | null>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [showAll, setShowAll] = useState(false);
    const [activeProject, setActiveProject] = useState<ProjectItemData | null>(null);

    // Show 6 projects initially, then all when expanded
    const INITIAL_SHOW_COUNT = 6;
    const visibleSecondaryProjects = showAll ? secondary : secondary.slice(0, INITIAL_SHOW_COUNT);
    const hasMore = secondary.length > INITIAL_SHOW_COUNT;
    const isDialogOpen = Boolean(activeProject);

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
                className={cn('space-y-32', isDialogOpen && 'pointer-events-none')}
                aria-hidden={isDialogOpen}
            >
                <RevealGroup className="space-y-32" disableAnimations={isDialogOpen}>
                    {featured.map((p, idx) => (
                        <Reveal
                            key={p.id}
                            index={idx}
                            distance={40}
                            className="flex flex-col gap-6 md:grid md:grid-cols-12 md:items-center md:gap-0"
                        >
                            {/* Image - Stacks on mobile, overlapping on desktop */}
                            <button
                                type="button"
                                onClick={() => setActiveProject(p)}
                                className={`group relative w-full ${
                                    idx % 2 === 0 ? 'md:col-span-7 md:col-start-1' : 'md:col-span-7 md:col-start-6'
                                } focus:outline-none md:row-start-1`}
                                aria-label={`Open details for ${p.title}`}
                            >
                                <div className="aspect-video w-full overflow-hidden rounded bg-[#64ffda]/10">
                                    <img
                                        src={p.image || '/images/placeholders/feature-1.svg'}
                                        alt={p.title}
                                        loading="lazy"
                                        className="h-full w-full object-contain opacity-25 transition duration-300 group-hover:opacity-100"
                                    />
                                </div>
                                {/* Teal overlay on hover - removed to show actual image colors */}
                                <div className="pointer-events-none absolute inset-0 rounded bg-[#64ffda]/0 transition duration-300" />
                            </button>

                            {/* Content - Stacks below image on mobile, overlays on desktop */}
                            <div
                                className={`relative w-full ${
                                    idx % 2 === 0 ? 'md:col-span-7 md:col-start-6 md:text-right' : 'md:col-span-7 md:col-start-1 md:text-left'
                                } md:z-10 md:row-start-1 md:p-0`}
                            >
                                <p className="mb-2 font-mono text-xs text-[#64ffda]">Featured Project</p>
                                <h3 className="mb-5 text-[clamp(24px,5vw,28px)] font-semibold text-[#ccd6f6]">
                                    <button
                                        type="button"
                                        onClick={() => setActiveProject(p)}
                                        className="transition-colors hover:text-[#64ffda] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                                    >
                                        {p.title}
                                    </button>
                                </h3>
                                <div className="mb-6 rounded bg-[#112240] p-6 text-[15px] leading-relaxed text-[#a8b2d1] shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]">
                                    {p.description}
                                </div>
                                <ul
                                    className={`mb-6 flex flex-wrap gap-3 font-mono text-xs text-[#a8b2d1] ${
                                        idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                                    }`}
                                >
                                    {p.tech.map((t) => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                                <div className={`flex gap-5 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                    {p.links?.github && (
                                        <a
                                            href={p.links.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#a8b2d1] transition-colors hover:text-[#64ffda]"
                                            aria-label="GitHub repository"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                    {p.links?.demo && (
                                        <a
                                            href={p.links.demo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#a8b2d1] transition-colors hover:text-[#64ffda]"
                                            aria-label="Live demo"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </RevealGroup>

                {/* Visual separator between featured and secondary projects */}
                {featured.length > 0 && secondary.length > 0 && (
                    <div className="py-8">
                        <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#233554] to-transparent"></div>
                    </div>
                )}

                <RevealGroup as="div" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" disableAnimations={isDialogOpen}>
                    {visibleSecondaryProjects.map((p, index) => (
                        <Reveal key={p.id} distance={24} index={index}>
                            <GlassCard hover glow className="group relative flex h-full flex-col p-6">
                                <div className="mb-4 aspect-video w-full overflow-hidden rounded bg-[#0f223d] ring-1 ring-[#233554]/30">
                                    <img
                                        src={p.image || '/images/placeholders/grid-1.svg'}
                                        alt={p.title}
                                        loading="lazy"
                                        className="h-full w-full object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                                    />
                                </div>
                                <div className="mb-2 flex items-start justify-between">
                                    <h4 className="text-lg font-semibold text-[#e6f1ff] transition-colors group-hover:text-[#64ffda]">
                                        <button
                                            type="button"
                                            onClick={() => setActiveProject(p)}
                                            className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
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
                                                className="transition-colors hover:text-[#64ffda]"
                                                aria-label="GitHub repository"
                                            >
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        )}
                                        {p.links?.demo && (
                                            <a
                                                href={p.links.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="transition-colors hover:text-[#64ffda]"
                                                aria-label="Live demo"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="mb-4 flex-1 text-sm text-[#8892b0]">{p.description}</p>
                                <ul className="mb-4 flex flex-wrap gap-3 font-mono text-[11px] text-[#8892b0]">
                                    {p.tech.map((t) => (
                                        <li key={t} className="rounded bg-[#64ffda]/5 px-2 py-1 ring-1 ring-[#64ffda]/20">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <button
                                        onClick={() => setActiveProject(p)}
                                        className="group/btn flex items-center gap-1 font-mono text-xs text-[#64ffda] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                                    >
                                        View Details
                                        <svg
                                            className="h-3 w-3 transition-transform group-hover/btn:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </GlassCard>
                        </Reveal>
                    ))}
                </RevealGroup>
                {hasMore && (
                    <motion.div className="mt-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <AnimatedButton
                            onClick={() => {
                                setShowAll((s) => !s);
                                // Smooth scroll to projects section when collapsing
                                if (showAll) {
                                    setTimeout(() => {
                                        const element = document.getElementById(id);
                                        if (element) {
                                            const yOffset = -100; // Offset for fixed header
                                            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                            window.scrollTo({ top: y, behavior: 'smooth' });
                                        }
                                    }, 100);
                                }
                            }}
                            variant="outline"
                            className="group"
                        >
                            {showAll ? (
                                <>
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                    Show Less
                                </>
                            ) : (
                                <>
                                    Show More ({secondary.length - INITIAL_SHOW_COUNT} more)
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </>
                            )}
                        </AnimatedButton>
                        {!showAll && (
                            <p className="mt-3 text-xs text-[#8892b0]">
                                Showing {INITIAL_SHOW_COUNT} of {secondary.length} projects
                            </p>
                        )}
                    </motion.div>
                )}
            </motion.div>
            <ProjectDialog project={activeProject} onOpenChange={(open) => !open && setActiveProject(null)} />
        </Section>
    );
}

// ProjectDialog extracted to components/ProjectDialog.tsx
