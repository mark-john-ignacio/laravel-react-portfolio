import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Dynamic experiences now passed via props
import { Section, SectionHeading } from '@/components/Section';

export interface ExperienceItemData {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  url?: string | null;
}

interface ExperienceSectionProps {
  experiences: ExperienceItemData[];
  headingIndex?: number;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, headingIndex = 2 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement | null>(null);
  const active = experiences[activeIndex];

  // Ensure active tab is scrolled into view on mobile when index changes
  useEffect(() => {
    const activeEl = tabRefs.current[activeIndex];
    if (activeEl && listRef.current) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (experiences.length === 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (activeIndex + 1) % experiences.length;
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (activeIndex - 1 + experiences.length) % experiences.length;
      setActiveIndex(prev);
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading" index={headingIndex}>Where I've Worked</SectionHeading>
  <div className="grid gap-10 md:grid-cols-[220px_1fr] overflow-hidden">
        {/* Tab list column */}
        <div role="tablist" aria-label="Job history" className="relative overflow-hidden">
          {/* Horizontal scroll area for mobile tabs */}
          <ul ref={listRef} className="group flex md:flex-col overflow-x-auto md:overflow-visible gap-1 px-3 pb-2 md:pb-0 md:px-0 pr-3 md:pr-0 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Hide scrollbar visually (still accessible) */}
            <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
            {experiences.map((exp, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={exp.company} className="shrink-0 md:shrink md:w-full">
                  <button
                    ref={(el) => { tabRefs.current[i] = el; }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${i}`}
                    id={`tab-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={onKeyDown}
                    className={`whitespace-nowrap md:whitespace-normal md:w-full border-l md:border-l-2 pl-4 pr-6 md:pr-8 py-2 text-left font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 ${isActive ? 'border-[#64ffda] text-[#64ffda] bg-[#112240]' : 'border-[#233554] text-[#8892b0] hover:text-[#64ffda]'}`}
                  >
                    {exp.company}
                  </button>
                </li>
              );
            })}
          </ul>
          {/* Fading edges indicating scrollability on mobile */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#0a192f] to-transparent md:hidden" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0a192f] to-transparent md:hidden" />
          <span aria-hidden="true" className="hidden md:block absolute left-0 top-0 h-[var(--indicator-height)] w-[2px] bg-[#64ffda] transition-transform duration-300" style={{ transform: `translateY(${activeIndex * 40}px)` }} />
        </div>
        <div role="tabpanel" id={`panel-${activeIndex}`} aria-labelledby={`tab-${activeIndex}`} className="min-h-[220px]">
          <motion.div key={active.company} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <h3 className="mb-1 text-lg font-semibold text-[#e6f1ff]">{active.role} <span className="text-[#64ffda]">@ {active.company}</span></h3>
            <p className="mb-4 font-mono text-xs text-[#8892b0]">{active.period}</p>
            <ul className="space-y-3">
              {active.bullets.map(b => (
                <li key={b} className="flex gap-3 text-[#8892b0]"><span className="mt-1 text-[#64ffda]">▹</span><span>{b}</span></li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
