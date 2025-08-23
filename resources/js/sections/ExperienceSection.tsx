import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/data/experiences';
import { Section, SectionHeading } from '@/components/Section';

export const ExperienceSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = EXPERIENCES[activeIndex];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (activeIndex + 1) % EXPERIENCES.length;
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (activeIndex - 1 + EXPERIENCES.length) % EXPERIENCES.length;
      setActiveIndex(prev);
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading" index={2}>Where I've Worked</SectionHeading>
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <div role="tablist" aria-label="Job history" className="relative">
          <ul className="flex md:flex-col overflow-x-auto md:overflow-visible -mx-2 md:mx-0 pb-2 md:pb-0 pr-4 md:pr-0">
            {EXPERIENCES.map((exp, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={exp.company} className="px-2 md:px-0">
                  <button
                    ref={(el) => { tabRefs.current[i] = el; }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${i}`}
                    id={`tab-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={onKeyDown}
                    className={`w-full border-l md:border-l-2 pl-4 pr-8 py-2 text-left font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 ${isActive ? 'border-[#64ffda] text-[#64ffda] bg-[#112240]' : 'border-[#233554] text-[#8892b0] hover:text-[#64ffda]'}`}
                  >
                    {exp.company}
                  </button>
                </li>
              );
            })}
          </ul>
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
