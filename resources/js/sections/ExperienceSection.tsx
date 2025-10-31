import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
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
    const hasMountedRef = useRef(false);
    const active = experiences[activeIndex];

    // Ensure active tab is scrolled into view on mobile when index changes
    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }

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
            <SectionHeading id="experience-heading" index={headingIndex}>
                Where I've Worked
            </SectionHeading>
            <div className="grid gap-10 overflow-hidden md:grid-cols-[auto_1fr]">
                {/* Tab list column */}
                <div role="tablist" aria-label="Job history" className="relative overflow-hidden">
                    {/* Horizontal scroll area for mobile tabs */}
                    <ul
                        ref={listRef}
                        className="group hide-scrollbar flex gap-0 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:overflow-visible md:pb-0"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {/* Hide scrollbar visually (still accessible) */}
                        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
                        {experiences.map((exp, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <li key={exp.company} className="shrink-0 md:w-full md:shrink">
                                    <button
                                        ref={(el) => {
                                            tabRefs.current[i] = el;
                                        }}
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls={`panel-${i}`}
                                        id={`tab-${i}`}
                                        tabIndex={isActive ? 0 : -1}
                                        onClick={() => setActiveIndex(i)}
                                        onKeyDown={onKeyDown}
                                        className={`relative px-5 py-3 font-mono text-[13px] whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 md:w-full md:text-left md:whitespace-normal ${isActive ? 'bg-[#172a45] text-[#64ffda]' : 'text-[#8892b0] hover:bg-[#172a45] hover:text-[#64ffda]'}`}
                                    >
                                        {exp.company}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {/* Active indicator */}
                    <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 hidden h-[2px] w-full bg-[#64ffda] transition-transform duration-250 md:top-0 md:block md:h-[42px] md:w-[2px]"
                        style={{ transform: `translate(${activeIndex * 0}px, ${activeIndex * 42}px)` }}
                    />
                </div>
                <div role="tabpanel" id={`panel-${activeIndex}`} aria-labelledby={`tab-${activeIndex}`} className="min-h-[250px]">
                    <motion.div key={active.company} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                        <h3 className="mb-2 text-[22px] font-medium text-[#ccd6f6]">
                            {active.role}{' '}
                            <span className="text-[#64ffda]">
                                @{' '}
                                {active.url ? (
                                    <a href={active.url} target="_blank" rel="noreferrer" className="hover:underline">
                                        {active.company}
                                    </a>
                                ) : (
                                    active.company
                                )}
                            </span>
                        </h3>
                        <p className="mb-6 font-mono text-[13px] text-[#a8b2d1]">{active.period}</p>
                        <ul className="space-y-4">
                            {active.bullets.map((b) => (
                                <li key={b} className="flex gap-3 text-[17px] leading-relaxed text-[#a8b2d1]">
                                    <span className="mt-1.5 text-sm text-[#64ffda]">▹</span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};
