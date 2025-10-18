import { Reveal, RevealGroup } from '@/components/reveal';
import React from 'react';
// Tech stack now passed via props instead of static import
import { Section, SectionHeading } from '@/components/Section';

interface AboutSectionProps {
    bioShort?: string | null;
    bioLong?: string | null;
    tech?: string[];
    profileImage?: string | null;
    headingIndex?: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ bioShort, bioLong, tech = [], profileImage, headingIndex = 1 }) => {
    return (
        <Section aria-labelledby="about" id="about">
            <SectionHeading id="about-heading" index={headingIndex}>
                About Me
            </SectionHeading>
            <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
                <div className="space-y-4 text-base leading-relaxed text-[#a8b2d1]">
                    <RevealGroup as="div" className="space-y-4" stagger={0.18} y={28} once>
                        {/* {bioShort && <Reveal as="p">{bioShort}</Reveal>} */}
                        {bioLong && <Reveal as="p">{bioLong}</Reveal>}
                        {tech.length > 0 && <Reveal as="p">Here are a few technologies I've been working with recently:</Reveal>}
                        <Reveal as="ul" className="grid grid-cols-2 gap-x-2 gap-y-2.5 font-mono text-[13px]" y={16}>
                            {tech.map((t) => (
                                <li key={t} className="flex items-center gap-2 text-[#a8b2d1]">
                                    <span className="text-[#64ffda]">▹</span>
                                    {t}
                                </li>
                            ))}
                        </Reveal>
                    </RevealGroup>
                </div>
                <div className="relative mx-auto mt-4 w-full max-w-[220px] sm:max-w-xs md:mt-0">
                    {/* <Reveal as="div" y={40} duration={0.9} className="group relative">
            <div className="rounded bg-[#64ffda]/10 p-2 backdrop-blur">
              <div className="aspect-square w-full overflow-hidden rounded bg-[#112240] ring-1 ring-[#64ffda]/30 flex items-center justify-center">
                <img src={profileImage || '/images/profile-placeholder.svg'} alt="Profile image" className="h-full w-full object-cover mix-blend-normal opacity-95 transition duration-500 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded border border-[#64ffda] opacity-20 transition group-hover:opacity-40" />
          </Reveal> */}
                </div>
            </div>
        </Section>
    );
};
