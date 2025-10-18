import { Section } from '@/components/Section';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import React from 'react';

interface ContactSectionProps {
    email?: string | null;
    blurb?: string | null; // contact_blurb from personal info
    heading?: string; // allow override if ever needed
}

export const ContactSection: React.FC<ContactSectionProps> = ({ email, blurb, heading = 'Get In Touch' }) => {
    const safeEmail = email || '';
    const subject = encodeURIComponent('Say Hello From Your Portfolio');
    const body = encodeURIComponent(`Hi${safeEmail ? ' ' + safeEmail.split('@')[0] : ''}, `);
    return (
        <Section id="contact" aria-labelledby="contact-heading" className="py-24">
            <div className="mx-auto max-w-[600px] text-center">
                <p className="mb-5 font-mono text-base text-[#64ffda]">
                    <span className="mr-2">04.</span>
                    What's Next?
                </p>
                <h2 id="contact-heading" className="mb-5 text-[clamp(40px,5vw,60px)] font-semibold text-[#ccd6f6]">
                    {heading}
                </h2>
                <p className="mb-12 leading-relaxed text-[#a8b2d1]">
                    {blurb ||
                        "I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
                </p>
                {safeEmail && (
                    <AnimatedButton
                        onClick={() => (window.location.href = `mailto:${safeEmail}?subject=${subject}&body=${body}`)}
                        variant="outline"
                        size="lg"
                        aria-describedby="contact-note"
                    >
                        Say Hello
                    </AnimatedButton>
                )}
            </div>
        </Section>
    );
};
