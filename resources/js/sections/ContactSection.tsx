import React from 'react';
import { Section, SectionHeading } from '@/components/Section';

export const ContactSection: React.FC = () => {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <div className="text-center">
        <SectionHeading id="contact-heading" index={4}>What's Next?</SectionHeading>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="space-y-8 text-center">
          <h3 tabIndex={-1} className="text-4xl font-bold text-[#e6f1ff] focus:outline-none">Get In Touch</h3>
          <p className="text-[#8892b0] max-w-xl mx-auto">I'm currently open to new opportunities and collaborations. If you just want to say hello or discuss a project, feel free to reach out — I read every message.</p>
          <div>
            <a href="mailto:Markme44.mm@gmail.com?subject=Say%20Hello%20From%20Your%20Portfolio&body=Hi%20Mark,%20" className="inline-block rounded border border-[#64ffda] px-8 py-4 font-mono text-sm text-[#64ffda] transition hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50" aria-describedby="contact-note">Say Hello</a>
          </div>
          <p id="contact-note" className="text-xs text-[#8892b0]">This opens your default email client.</p>
        </div>
      </div>
    </Section>
  );
};
