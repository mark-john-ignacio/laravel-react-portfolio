import { ProjectDialog } from '@/components/ProjectDialog';
import { Section, SectionHeading } from '@/components/Section';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const featuredContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.18 } },
};

const featuredCardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const secondaryContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const secondaryCardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] } },
};
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
    const sectionRef = useRef<HTMLElement | null>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: '-120px' });
    const reduceMotion = useReducedMotion();

    const [showAll, setShowAll] = useState(false);
    const [activeProject, setActiveProject] = useState<ProjectItemData | null>(null);

    const INITIAL_SHOW_COUNT = 6;

    const visibleSecondaryProjects = useMemo(() => (showAll ? secondary : secondary.slice(0, INITIAL_SHOW_COUNT)), [secondary, showAll]);

    const hasMore = useMemo(() => secondary.length > INITIAL_SHOW_COUNT, [secondary.length]);
    const isDialogOpen = Boolean(activeProject);

    useEffect(() => {
        const node = sectionRef.current as HTMLElement | null;
        if (!node) {
            return;
        }

        if (isDialogOpen) {
            node.setAttribute('aria-hidden', 'true');
            node.setAttribute('inert', '');
        } else {
            node.removeAttribute('aria-hidden');
            node.removeAttribute('inert');
        }
    }, [isDialogOpen]);

    const handleProjectOpen = useCallback((project: ProjectItemData) => {
        setActiveProject(project);
    }, []);

    const handleDialogChange = useCallback((open: boolean) => {
        if (!open) {
            setActiveProject(null);
        }
    }, []);

    return (
        <Section as="section" ref={sectionRef} aria-labelledby={id} id={id} className="pt-24">
            <SectionHeading index={headingIndex} id={`${id}-heading`}>
                Some Things I've Built
            </SectionHeading>
            {featured.length === 0 && secondary.length === 0 && (
                <div className="mt-8 rounded border border-[#233554] bg-[#112240] p-8 text-center text-sm text-[#8892b0]">
                    <p>No projects are published yet. Mark some projects as published (and optionally featured) in the admin to display them here.</p>
                </div>
            )}
            <motion.div
                layout
                className={cn('space-y-32', isDialogOpen && 'pointer-events-none opacity-95 select-none')}
                variants={reduceMotion ? undefined : featuredContainerVariants}
                initial="hidden"
                animate={sectionInView ? 'visible' : 'hidden'}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div layout variants={reduceMotion ? undefined : featuredContainerVariants} className="space-y-32">
                    {featured.map((project, index) => (
                        <FeaturedProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            align={index % 2 === 0 ? 'left' : 'right'}
                            onOpen={handleProjectOpen}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </motion.div>

                {featured.length > 0 && secondary.length > 0 && (
                    <div className="py-8">
                        <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#233554] to-transparent" />
                    </div>
                )}

                <motion.div
                    layout
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    variants={reduceMotion ? undefined : secondaryContainerVariants}
                >
                    {visibleSecondaryProjects.map((project, index) => (
                        <SecondaryProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onOpen={handleProjectOpen}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </motion.div>

                {hasMore && (
                    <motion.div className="mt-10 text-center" layout>
                        <AnimatedButton
                            onClick={() => {
                                setShowAll((prev) => !prev);
                                if (showAll) {
                                    setTimeout(() => {
                                        const element = document.getElementById(id);
                                        if (element) {
                                            const yOffset = -100;
                                            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                            window.scrollTo({ top: y, behavior: 'smooth' });
                                        }
                                    }, 120);
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
            <ProjectDialog project={activeProject} onOpenChange={handleDialogChange} />
        </Section>
    );
}

// ProjectDialog extracted to components/ProjectDialog.tsx

interface FeaturedProjectCardProps {
    project: ProjectItemData;
    index: number;
    align: 'left' | 'right';
    onOpen: (project: ProjectItemData) => void;
    reduceMotion: boolean;
}

const FeaturedProjectCard = memo(function FeaturedProjectCard({ project, index, align, onOpen, reduceMotion }: FeaturedProjectCardProps) {
    const imageAlignment = align === 'left' ? 'md:col-span-7 md:col-start-1' : 'md:col-span-7 md:col-start-6';
    const contentAlignment = align === 'left' ? 'md:col-span-7 md:col-start-6 md:text-right' : 'md:col-span-7 md:col-start-1 md:text-left';
    const contentJustify = align === 'left' ? 'md:justify-end' : 'md:justify-start';

    return (
        <motion.article
            layout
            variants={reduceMotion ? undefined : featuredCardVariants}
            className="flex flex-col gap-6 md:grid md:grid-cols-12 md:items-center md:gap-0"
            transition={reduceMotion ? undefined : { delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.button
                type="button"
                onClick={() => onOpen(project)}
                className={cn('group relative w-full focus:outline-none md:row-start-1', imageAlignment)}
                aria-label={`Open details for ${project.title}`}
                whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
                <div className="aspect-video w-full overflow-hidden rounded bg-[#64ffda]/10">
                    <img
                        src={project.image || '/images/placeholders/feature-1.svg'}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-contain opacity-30 transition duration-300 group-hover:opacity-100"
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded bg-[#0a1a30]/0 transition duration-300" />
            </motion.button>

            <div className={cn('relative w-full md:z-10 md:row-start-1 md:p-0', contentAlignment)}>
                <p className="mb-2 font-mono text-xs text-[#64ffda]">Featured Project</p>
                <h3 className="mb-5 text-[clamp(24px,5vw,28px)] font-semibold text-[#ccd6f6]">
                    <button
                        type="button"
                        onClick={() => onOpen(project)}
                        className="transition-colors hover:text-[#64ffda] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                    >
                        {project.title}
                    </button>
                </h3>
                <div className="mb-6 rounded bg-[#112240] p-6 text-[15px] leading-relaxed text-[#a8b2d1] shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]">
                    {project.description}
                </div>
                <ul className={cn('mb-6 flex flex-wrap gap-3 font-mono text-xs text-[#a8b2d1]', contentJustify)}>
                    {project.tech.map((tech) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>
                <div className={cn('flex gap-5 text-[#a8b2d1]', contentJustify)}>
                    {project.links?.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-[#64ffda]"
                            aria-label="GitHub repository"
                        >
                            <GithubIcon />
                        </a>
                    )}
                    {project.links?.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-[#64ffda]"
                            aria-label="Live demo"
                        >
                            <ExternalLinkIcon />
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
});

interface SecondaryProjectCardProps {
    project: ProjectItemData;
    index: number;
    onOpen: (project: ProjectItemData) => void;
    reduceMotion: boolean;
}

const SecondaryProjectCard = memo(function SecondaryProjectCard({ project, index, onOpen, reduceMotion }: SecondaryProjectCardProps) {
    return (
        <motion.article layout variants={reduceMotion ? undefined : secondaryCardVariants} transition={{ delay: index * 0.05 }}>
            <GlassCard hover glow className="group relative flex h-full flex-col p-6">
                <div className="mb-4 aspect-video w-full overflow-hidden rounded bg-[#0f223d] ring-1 ring-[#233554]/30">
                    <img
                        src={project.image || '/images/placeholders/grid-1.svg'}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                    />
                </div>
                <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-lg font-semibold text-[#e6f1ff] transition-colors group-hover:text-[#64ffda]">
                        <button
                            type="button"
                            onClick={() => onOpen(project)}
                            className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                        >
                            {project.title}
                        </button>
                    </h4>
                    <div className="flex gap-3 text-[#8892b0]">
                        {project.links?.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-[#64ffda]"
                                aria-label="GitHub repository"
                            >
                                <GithubIcon />
                            </a>
                        )}
                        {project.links?.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-[#64ffda]"
                                aria-label="Live demo"
                            >
                                <ExternalLinkIcon />
                            </a>
                        )}
                    </div>
                </div>
                <p className="mb-4 flex-1 text-sm text-[#8892b0]">{project.description}</p>
                <ul className="mb-4 flex flex-wrap gap-3 font-mono text-[11px] text-[#8892b0]">
                    {project.tech.map((tech) => (
                        <li key={tech} className="rounded bg-[#64ffda]/5 px-2 py-1 ring-1 ring-[#64ffda]/20">
                            {tech}
                        </li>
                    ))}
                </ul>
                <div>
                    <button
                        onClick={() => onOpen(project)}
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
        </motion.article>
    );
});

const GithubIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
    </svg>
);
