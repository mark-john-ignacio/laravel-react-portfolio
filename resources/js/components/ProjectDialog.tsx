import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectItem } from '@/data/projects';

interface ProjectDialogProps {
  project: ProjectItem | null;
  onOpenChange: (open: boolean) => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, onOpenChange }) => {
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
};
