import React from 'react';
import { Reveal, RevealGroup } from '@/components/reveal';
import { TechnologyBadge } from '@/components/technology-badge';
import { TECH_STACK } from '@/data/tech';
import { Section, SectionHeading } from '@/components/Section';

export const AboutSection: React.FC = () => {
  return (
    <Section aria-labelledby="about" id="about">
      <SectionHeading id="about-heading" index={1}>About Me</SectionHeading>
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="space-y-5 text-[#8892b0] leading-relaxed">
          <RevealGroup as="div" className="space-y-5" stagger={0.18} y={28} once>
            <Reveal as="p">I'm a software developer with a passion for building end-to-end web experiences—from resilient backend services to rich, interactive frontends. Currently, I work on financial applications that improve stability, usability, and performance.</Reveal>
            <Reveal as="p">I enjoy working across the stack using technologies like Laravel, PHP, and MySQL on the server, while leveraging React, TypeScript, and modern component systems on the client. I care about design systems, accessibility, and developer experience.</Reveal>
            <Reveal as="p">Here are a few technologies I’ve been working with recently:</Reveal>
            <Reveal as="ul" className="grid grid-cols-2 gap-x-4 gap-y-2" y={16}>
              {TECH_STACK.map(t => (
                <li key={t}><TechnologyBadge label={t} /></li>
              ))}
            </Reveal>
          </RevealGroup>
        </div>
        <div className="relative mx-auto max-w-xs">
          <Reveal as="div" y={40} duration={0.9} className="group relative">
            <div className="rounded bg-[#64ffda]/10 p-2 backdrop-blur">
              <div className="aspect-square w-full overflow-hidden rounded bg-[#112240] ring-1 ring-[#64ffda]/30 flex items-center justify-center">
                <img src="/images/profile-placeholder.svg" alt="Abstract placeholder silhouette representing Mark John Ignacio" className="h-full w-full object-cover mix-blend-normal opacity-95 transition duration-500 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded border border-[#64ffda] opacity-20 transition group-hover:opacity-40" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
