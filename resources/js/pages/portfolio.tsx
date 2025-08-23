import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Reveal, RevealGroup } from '@/components/reveal';
import { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { TechnologyBadge } from '@/components/technology-badge';
import React, { Suspense, lazy } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SocialSidebar } from '@/components/SocialSidebar';
import { EmailSidebar } from '@/components/EmailSidebar';

// Section ids for navigation
const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function PortfolioPage() {
  const reduceMotion = typeof window !== 'undefined' ? usePrefersReducedMotion() : false;
  // Variants adjusted based on reduced motion
  const adaptiveContainer = reduceMotion ? {} : containerVariants;
  const adaptiveFadeUp = reduceMotion ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // Removed theme handling; enforce dark theme classes directly
  const rootClasses = 'bg-[#0a192f] text-[#ccd6f6]';
  return (
    <>
      <Head title="Mark John Ignacio | Portfolio">
        <meta name="description" content="Mark John Ignacio – Laravel & React developer building performant, accessible, and elegant web applications." />
        <meta name="author" content="Mark John Ignacio" />
        <meta name="theme-color" content="#0a192f" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mark John Ignacio | Portfolio" />
        <meta property="og:description" content="Laravel & React developer building performant, accessible, and elegant web applications." />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:image" content="/images/og-cover.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mark John Ignacio | Portfolio" />
        <meta name="twitter:description" content="Laravel & React developer building performant, accessible, and elegant web applications." />
        <meta name="twitter:image" content="/images/og-cover.png" />
        <link rel="canonical" href="https://example.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mark John Ignacio",
            "url": "https://example.com",
            "email": "mailto:Markme44.mm@gmail.com",
            "jobTitle": "Full Stack Developer",
            "sameAs": [
              "https://github.com/mark-john-ignacio",
              "https://www.linkedin.com"
            ],
            "knowsAbout": ["Laravel", "React", "TypeScript", "Tailwind CSS", "AWS", "PHP"]
          }
        `}</script>
      </Head>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] rounded bg-[#64ffda] px-4 py-2 font-mono text-xs text-[#0a192f]">Skip to content</a>
      <div className={`min-h-screen font-inter selection:bg-[#64ffda]/20 ${rootClasses}`}>
        {!reduceMotion && (
          <motion.div aria-hidden="true" style={{ scaleX }} className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-[#64ffda]" />
        )}
        <SocialSidebar />
        <EmailSidebar />
        <Header />
        <main id="main" className="pt-20" role="main">
          <HeroSection motionVariants={{ container: adaptiveContainer, item: adaptiveFadeUp }} />
          <AboutSection />
          <ExperienceSection />
          <Suspense fallback={<div className="px-6 py-24 md:px-24" aria-busy="true">Loading projects…</div>}>
            <LazyProjects />
          </Suspense>
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
function Header() {
  const active = useScrollSpy(sections.map((s) => s.id));
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScroll.current;
      // Show if near top
      if (current < 80) {
        setHidden(false);
      } else {
        if (delta > 6 && !open) {
          // scrolling down
            setHidden(true);
        } else if (delta < -6) {
          // scrolling up
          setHidden(false);
        }
      }
      lastScroll.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur bg-[#0a192f]/80 border-b border-[#112240]"
      >
        <div className="text-[#64ffda] font-mono text-sm tracking-wider">MJ</div>
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`group font-mono text-[13px] tracking-wide transition-colors ${
                  isActive ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'
                }`}
              >
                <span className="text-[#64ffda] mr-1">{String(i + 1).padStart(2, '0')}.</span>
                <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-[#64ffda] after:transition-all after:w-0 group-hover:after:w-full" aria-current={isActive ? 'true' : undefined}>
                  {s.label}
                </span>
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
            {sections.map((s, i) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-sm transition-colors ${
                    isActive ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'
                  }`}
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
}

import { useReveal } from '@/hooks/useReveal';

function SectionHeading({ index, children, id }: { index: number; children: React.ReactNode; id: string }) {
  const { ref, inView, hasAnimated } = useReveal<HTMLHeadingElement>({ margin: '-120px', threshold: 0.25 });
  return (
    <motion.h2
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={inView || hasAnimated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group mb-8 flex items-center gap-4 font-semibold tracking-tight text-[#e6f1ff] text-2xl md:text-3xl scroll-mt-24"
    >
      <span className="font-mono text-base text-[#64ffda]">{String(index).padStart(2, '0')}.</span>
      {children}
      <span className="h-px flex-1 bg-[#233554] group-hover:bg-[#64ffda]/50 transition-colors" />
    </motion.h2>
  );
}

function HeroSection({ motionVariants }: { motionVariants: { container: any; item: any } }) {
  // Parallax layers: use scroll progress + mouse movement (Framer Motion v10: useTransform instead of .to)
  const { scrollYProgress } = useScroll();
  const spring1 = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const spring2 = useSpring(scrollYProgress, { stiffness: 70, damping: 25 });
  const spring3 = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const layer1Y = useTransform(spring1, (v) => v * -40);
  const layer2Y = useTransform(spring2, (v) => v * -70);
  const layer3Y = useTransform(spring3, (v) => v * -110);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const reduceMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduceMotion]);

  // Only apply a subtle horizontal mouse shift; vertical parallax handled by y motion value
  const motionStyle = (depth: number) => (reduceMotion ? {} : { x: mouse.x * depth });

  return (
    <section
      ref={heroRef}
  className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-12 pt-28 md:px-48 xl:px-64"
      aria-label="Hero"
    >
      {/* Decorative parallax layers */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            style={{ y: layer1Y, ...motionStyle(12) }}
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#64ffda]/5 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            style={{ y: layer2Y, ...motionStyle(24) }}
            className="pointer-events-none absolute top-1/3 -left-40 h-[34rem] w-[34rem] rounded-full bg-[#233554]/40 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            style={{ y: layer3Y, ...motionStyle(40) }}
            className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#64ffda]/10 blur-2xl"
          />
          {/* Grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04] [background:radial-gradient(circle_at_center,rgba(100,255,218,0.25)_0,transparent_60%)]"
          />
        </>
      )}
      <motion.div variants={motionVariants.container} initial="hidden" animate="show" className="relative z-10 max-w-3xl">
        <motion.p variants={motionVariants.item} className="mb-4 font-mono text-sm text-[#64ffda]">
          Hi, my name is
        </motion.p>
        <motion.h1
          variants={motionVariants.item}
          className="mb-2 text-5xl font-extrabold leading-tight text-[#e6f1ff] sm:text-6xl md:text-7xl"
        >
          Mark John Ignacio.
        </motion.h1>
        <motion.h2 variants={motionVariants.item} className="mb-6 text-4xl font-semibold text-[#8892b0] sm:text-5xl">
          I build things for the web.
        </motion.h2>
        <motion.p variants={motionVariants.item} className="mb-10 max-w-xl text-[#8892b0]">
          I'm a Laravel + React developer focused on crafting performant, accessible, and visually polished web
          applications. I love bridging elegant frontend experiences with robust backend architecture—shipping features
          that are maintainable and delightful to use.
        </motion.p>
        <motion.div variants={motionVariants.item}>
          <a
            href="#work"
            className="inline-block rounded border border-[#64ffda] px-6 py-3 font-mono text-sm text-[#64ffda] transition hover:bg-[#64ffda]/10 focus:outline-none focus:ring-2 focus:ring-[#64ffda]/50"
          >
            Check out my work!
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const tech = [
    'Laravel',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Inertia.js',
    'shadcn/ui',
    'PHP',
    'MySQL',
    'AWS',
    'JavaScript',
    'Vite',
    'Docker',
    'Git',
  ];
  return (
  <section className="px-12 py-24 md:px-48 xl:px-64" aria-labelledby="about">
      <SectionHeading id="about" index={1}>
        About Me
      </SectionHeading>
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="space-y-5 text-[#8892b0] leading-relaxed">
          <RevealGroup as="div" className="space-y-5" stagger={0.18} y={28} once>
            <Reveal as="p">
              I'm a software developer with a passion for building end-to-end web experiences—from resilient backend
              services to rich, interactive frontends. Currently, I work on financial applications that improve stability,
              usability, and performance.
            </Reveal>
            <Reveal as="p">
              I enjoy working across the stack using technologies like Laravel, PHP, and MySQL on the server, while
              leveraging React, TypeScript, and modern component systems on the client. I care about design systems,
              accessibility, and developer experience.
            </Reveal>
            <Reveal as="p">Here are a few technologies I’ve been working with recently:</Reveal>
            <Reveal as="ul" className="grid grid-cols-2 gap-x-4 gap-y-2" y={16}>
              {tech.map((t) => (
                <li key={t}>
                  <TechnologyBadge label={t} />
                </li>
              ))}
            </Reveal>
          </RevealGroup>
        </div>
        <div className="relative mx-auto max-w-xs">
          <Reveal as="div" y={40} duration={0.9} className="group relative">
            <div className="rounded bg-[#64ffda]/10 p-2 backdrop-blur">
              <div className="aspect-square w-full rounded bg-[#112240] ring-1 ring-[#64ffda]/30" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded border border-[#64ffda] opacity-20 transition group-hover:opacity-40" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'HRWEB Inc.',
    role: 'Junior Programmer',
    period: 'March 2024 – Present',
    bullets: [
      'Designed financial applications using Laravel, React, Tailwind, shadcn UI, and Inertia.js.',
      'Implemented secure authentication and real‑time data visualization modules.',
      'Improved platform stability by 30% and reduced user-reported bugs.',
    ],
  },
  {
    company: 'AWS (via Edukasyon.ph)',
    role: 'Cloud Engineering Intern',
    period: 'Sept 2023 – Jan 2024',
    bullets: [
      'Deployed scalable infrastructure with EC2, RDS, and S3 following AWS best practices.',
      'Automated operational tasks with Python scripts and Linux tooling.',
      'Implemented monitoring and logging with CloudWatch and IAM governance.',
    ],
  },
  {
    company: 'Dei Gratia School Inc.',
    role: 'IT Support Intern',
    period: 'Mar 2023 – Jul 2023',
    bullets: [
      'Maintained hardware and software assets and resolved technical issues.',
      'Supported students and staff with troubleshooting and connectivity.',
      'Improved workstation setup efficiency through documented procedures.',
    ],
  },
];

function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
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

  const active = experiences[activeIndex];

  return (
  <section className="px-12 py-24 md:px-48 xl:px-64" aria-labelledby="experience">
      <SectionHeading id="experience" index={2}>
        Where I've Worked
      </SectionHeading>
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <div role="tablist" aria-label="Job history" className="relative">
          <ul className="flex md:flex-col overflow-x-auto md:overflow-visible -mx-2 md:mx-0 pb-2 md:pb-0 pr-4 md:pr-0">
            {experiences.map((exp, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={exp.company} className="px-2 md:px-0">
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
                    className={`w-full border-l md:border-l-2 pl-4 pr-8 py-2 text-left font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 ${
                      isActive
                        ? 'border-[#64ffda] text-[#64ffda] bg-[#112240]'
                        : 'border-[#233554] text-[#8892b0] hover:text-[#64ffda]'
                    }`}
                  >
                    {exp.company}
                  </button>
                </li>
              );
            })}
          </ul>
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-0 top-0 h-[var(--indicator-height)] w-[2px] bg-[#64ffda] transition-transform duration-300"
            style={{
              transform: `translateY(${activeIndex * 40}px)`,
            }}
          />
        </div>
        <div role="tabpanel" id={`panel-${activeIndex}`} aria-labelledby={`tab-${activeIndex}`} className="min-h-[220px]">
          <motion.div
            key={active.company}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h3 className="mb-1 text-lg font-semibold text-[#e6f1ff]">
              {active.role} <span className="text-[#64ffda]">@ {active.company}</span>
            </h3>
            <p className="mb-4 font-mono text-xs text-[#8892b0]">{active.period}</p>
            <ul className="space-y-3">
              {active.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[#8892b0]">
                  <span className="mt-1 text-[#64ffda]">▹</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const LazyProjects = lazy(() => import('../sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, usePage } from '@inertiajs/react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message should be at least 10 characters').max(5000),
});

type ContactValues = z.infer<typeof contactSchema>;

function ContactSection() {
  return (
    <section className="px-12 py-24 md:px-48 xl:px-64" aria-labelledby="contact">
      <div className="text-center">
        <SectionHeading id="contact" index={4}>
          What's Next?
        </SectionHeading>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="space-y-8 text-center">
          <h3 id="contact-heading" tabIndex={-1} className="text-4xl font-bold text-[#e6f1ff] focus:outline-none">
            Get In Touch
          </h3>
          <p className="text-[#8892b0] max-w-xl mx-auto">
            I'm currently open to new opportunities and collaborations. If you just want to say hello or discuss a project,
            feel free to reach out — I read every message.
          </p>
          <div>
            <a
              href="mailto:Markme44.mm@gmail.com?subject=Say%20Hello%20From%20Your%20Portfolio&body=Hi%20Mark,%20"
              className="inline-block rounded border border-[#64ffda] px-8 py-4 font-mono text-sm text-[#64ffda] transition hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
              aria-describedby="contact-note"
            >
              Say Hello
            </a>
          </div>
          <p id="contact-note" className="text-xs text-[#8892b0]">
            This opens your default email client.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 pb-10 pt-12 md:px-24 text-center text-xs text-[#8892b0]">
      <p>&copy; {new Date().getFullYear()} Mark John Ignacio. Built with Laravel, React, TypeScript & Tailwind.</p>
    </footer>
  );
}

export default PortfolioPage;
