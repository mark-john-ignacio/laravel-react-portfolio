import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SECTIONS } from '@/data/sections';
import AppLogoIcon from '@/components/app-logo-icon';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useHideOnScroll } from '@/hooks/useHideOnScroll';

export const Header: React.FC = () => {
  const active = useScrollSpy(SECTIONS.map(s => s.id));
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScroll({ disabled: open });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 backdrop-blur bg-[#0a192f]/80 border-b border-[#112240] w-full"
      >
        <a href="#top" className="group flex items-center focus:outline-none" aria-label="Home">
          <AppLogoIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
          <span className="sr-only">Home</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s, i) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`group font-mono text-[13px] tracking-wide transition-colors ${isActive ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'}`}
              >
                <span className="text-[#64ffda] mr-1">{String(i + 1).padStart(2, '0')}.</span>
                <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-[#64ffda] after:transition-all after:w-0 group-hover:after:w-full" aria-current={isActive ? 'true' : undefined}>{s.label}</span>
              </a>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#64ffda] px-4 py-2 font-mono text-xs text-[#64ffda] hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
          >
            Resume
          </a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="md:hidden rounded border border-[#64ffda] px-3 py-2 font-mono text-xs text-[#64ffda]"
        >
          Menu
        </button>
      </motion.header>
      {open && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/95 backdrop-blur-sm md:hidden">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="absolute top-5 right-5 rounded border border-[#64ffda] px-3 py-2 font-mono text-xs text-[#64ffda]"
          >
            Close
          </button>
          <nav className="mt-32 flex flex-col items-center gap-6" aria-label="Mobile navigation">
            {SECTIONS.map((s, i) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-sm transition-colors ${isActive ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'}`}
                >
                  <span className="text-[#64ffda] mr-2">{String(i + 1).padStart(2, '0')}.</span>
                  {s.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-16 flex flex-col items-center gap-6 text-[#8892b0]">
            <div className="flex gap-8">
              <a href="https://github.com/mark-john-ignacio" target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">GitHub</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">LinkedIn</a>
              <a href="mailto:Markme44.mm@gmail.com" className="hover:text-[#64ffda]">Email</a>
            </div>
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[#64ffda] px-4 py-2 font-mono text-xs text-[#64ffda] hover:bg-[#64ffda]/10"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
