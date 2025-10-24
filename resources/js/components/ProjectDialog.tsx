import { Badge } from '@/components/ui/UIComponents';
import { ProjectItemData } from '@/sections/ProjectsSection';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';

interface ProjectDialogProps {
    project: ProjectItemData | null;
    onOpenChange: (open: boolean) => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, onOpenChange }) => {
    const handleBackdropClick = (e: React.MouseEvent) => {
        // Only close if clicking the backdrop itself, not children
        if (e.target === e.currentTarget) {
            onOpenChange(false);
        }
    };

    const isOpen = Boolean(project);

    useEffect(() => {
        if (!isOpen || typeof window === 'undefined') {
            return;
        }

        const root = document.documentElement;
        const previousOverflow = root.style.overflow;
        const previousPaddingRight = root.style.paddingRight;
        const scrollbarWidth = window.innerWidth - root.clientWidth;

        root.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            root.style.paddingRight = `${scrollbarWidth}px`;
        }
        root.setAttribute('data-project-dialog-open', 'true');

        return () => {
            root.style.overflow = previousOverflow;
            root.style.paddingRight = previousPaddingRight;
            root.removeAttribute('data-project-dialog-open');
        };
    }, [isOpen]);

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {project && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        </Dialog.Overlay>
                        <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 md:p-10" onClick={handleBackdropClick}>
                            <Dialog.Content asChild>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-[#112240] shadow-2xl ring-1 ring-[#1d2d50]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="relative">
                                        <div className="aspect-video w-full overflow-hidden bg-[#0f223d]">
                                            <img
                                                src={project.image || '/images/placeholders/feature-1.svg'}
                                                alt={project.title}
                                                loading="lazy"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <Dialog.Close asChild>
                                                <button
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#64ffda]/30 bg-[#112240]/90 text-[#64ffda] backdrop-blur-sm transition-all hover:border-[#64ffda] hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                                                    aria-label="Close project details"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </Dialog.Close>
                                        </div>
                                        {project.featured && (
                                            <div className="absolute top-4 left-4">
                                                <Badge variant="accent">Featured Project</Badge>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6 p-6 md:p-8">
                                        <div>
                                            <Dialog.Title className="mb-2 text-2xl font-bold text-[#e6f1ff] md:text-3xl">
                                                {project.title}
                                            </Dialog.Title>
                                            {project.readMinutes && (
                                                <p className="font-mono text-xs text-[#8892b0]">{project.readMinutes} min read</p>
                                            )}
                                        </div>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="leading-relaxed text-[#8892b0]">{project.longDescription || project.description}</p>
                                        </div>

                                        <div>
                                            <h4 className="mb-3 font-mono text-sm font-semibold text-[#e6f1ff]">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <Badge key={t} variant="secondary">
                                                        {t}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {(project.links?.github || project.links?.demo) && (
                                            <div className="flex flex-wrap gap-4 border-t border-[#233554] pt-4">
                                                {project.links?.github && (
                                                    <a
                                                        href={project.links.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2 rounded border border-[#64ffda] px-4 py-2 font-mono text-sm text-[#64ffda] transition-colors hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                                                    >
                                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                        View Code
                                                    </a>
                                                )}
                                                {project.links?.demo && (
                                                    <a
                                                        href={project.links.demo}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2 rounded border border-[#64ffda] bg-[#64ffda]/10 px-4 py-2 font-mono text-sm text-[#64ffda] transition-colors hover:bg-[#64ffda]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
                                                    >
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                            />
                                                        </svg>
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </Dialog.Content>
                        </div>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};
