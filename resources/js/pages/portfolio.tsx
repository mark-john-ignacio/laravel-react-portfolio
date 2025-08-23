import { Head } from '@inertiajs/react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Hero } from '@/components/portfolio/hero';
import { Section } from '@/components/portfolio/section';

export default function Portfolio() {
  return (
    <>
      <Head title="Portfolio">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <PortfolioLayout sectionIds={['about','experience','work','contact']}>
        <Hero />
        <Section id="about" number="01" title="About">
          <p>
            I'm a full-stack developer with a passion for building modern, performant applications. I enjoy working across
            the stack and crafting polished user interfaces with great developer experience toolchains.
          </p>
          <p>
            My current toolbox includes Laravel, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and modern build
            tools like Vite. I love exploring architecture patterns, design systems, and micro-interactions that make
            products feel delightful.
          </p>
        </Section>
        <Section id="experience" number="02" title="Experience">
          <ul className="list-disc pl-6 space-y-2">
            <li>Built internal dashboards and workflow automation tools reducing manual ops time by 40%.</li>
            <li>Developed reusable component libraries accelerating feature delivery.</li>
            <li>Implemented CI pipelines and performance budgets to keep regressions in check.</li>
          </ul>
        </Section>
        <Section id="work" number="03" title="Highlighted Work">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-navy-light/40 rounded border border-navy-light/50 hover:border-mint transition-colors">
              <h3 className="text-slate-100 font-semibold mb-2">Project One</h3>
              <p className="text-sm text-slate-400">A modern dashboard application with real-time metrics and collaboration features.</p>
            </div>
            <div className="p-6 bg-navy-light/40 rounded border border-navy-light/50 hover:border-mint transition-colors">
              <h3 className="text-slate-100 font-semibold mb-2">Project Two</h3>
              <p className="text-sm text-slate-400">Design system + component toolkit powering multiple internal web apps.</p>
            </div>
          </div>
        </Section>
        <Section id="contact" number="04" title="Get In Touch">
          <p>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is
            always open.
          </p>
          <div>
            <a href="mailto:hello@example.com" className="inline-block border border-mint text-mint px-6 py-3 rounded hover:bg-mint/10 font-mono text-sm tracking-wider">
              Say Hello
            </a>
          </div>
        </Section>
      </PortfolioLayout>
    </>
  );
}
