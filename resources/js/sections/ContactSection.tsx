import React from 'react';
import { Section, SectionHeading } from '@/components/Section';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

interface ContactSectionProps {
  email?: string | null;
  blurb?: string | null; // contact_blurb from personal info
  heading?: string; // allow override if ever needed
}

export const ContactSection: React.FC<ContactSectionProps> = ({ email, blurb, heading = "Get In Touch" }) => {
  const safeEmail = email || '';
  const subject = encodeURIComponent('Say Hello From Your Portfolio');
  const body = encodeURIComponent(`Hi${safeEmail ? ' ' + (safeEmail.split('@')[0]) : ''}, `);
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <div className="text-center">
        <SectionHeading id="contact-heading" index={4}>What's Next?</SectionHeading>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="space-y-8 text-center">
          <h3 tabIndex={-1} className="text-4xl font-bold text-[#e6f1ff] focus:outline-none">{heading}</h3>
          <p className="text-[#8892b0] max-w-xl mx-auto">{blurb || "I'm currently open to new opportunities and collaborations. If you just want to say hello or discuss a project, feel free to reach out — I read every message."}</p>
          {safeEmail && (
            <div>
              <AnimatedButton
                onClick={() => window.location.href = `mailto:${safeEmail}?subject=${subject}&body=${body}`}
                variant="outline"
                size="lg"
                aria-describedby="contact-note"
              >
                Say Hello
              </AnimatedButton>
            </div>
          )}
          <p id="contact-note" className="text-xs text-[#8892b0]">This opens your default email client.</p>
        </div>
      </div>
    </Section>
  );
};
