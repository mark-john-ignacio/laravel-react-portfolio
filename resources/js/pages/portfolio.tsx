import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import { useScrollSpy } from '@/hooks/useScrollSpy';

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

export default function PortfolioPage() {
  return (
    <>
      <Head title="Portfolio">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      </Head>
      <div className="min-h-screen bg-[#0a192f] text-[#ccd6f6] font-inter selection:bg-[#64ffda]/20">
        <Sidebar />
        <main className="pl-0 md:pl-64 transition-[padding]">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
}

function Sidebar() {
  const active = useScrollSpy(sections.map((s) => s.id));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between p-8 md:flex">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <div className="text-[#64ffda] font-mono text-sm mb-4">MJ</div>
          <nav className="space-y-3">
            {sections.map((s, i) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group flex items-center gap-2 font-mono text-xs tracking-wide transition-colors ${
                    isActive ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'
                  }`}
                >
                  <span className="text-[#64ffda]">{String(i + 1).padStart(2, '0')}.</span>
                  <span className={`relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-[#64ffda] after:transition-all ${isActive ? 'after:w-full' : 'after:w-0 group-hover:after:w-full'}`}>
                    {s.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col gap-5 text-[#8892b0]"
        >
          <li>
            <a href="https://github.com/mark-john-ignacio" target="_blank" rel="noreferrer" className="hover:text-[#64ffda] transition-colors">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#64ffda] transition-colors">LinkedIn</a>
          </li>
          <li>
            <a href="mailto:Markme44.mm@gmail.com" className="hover:text-[#64ffda] transition-colors">Email</a>
          </li>
        </motion.ul>
      </aside>

      {/* Mobile nav trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed top-5 right-5 z-50 rounded border border-[#64ffda] px-3 py-2 font-mono text-xs text-[#64ffda] md:hidden"
      >
        Menu
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/95 backdrop-blur-sm md:hidden">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="absolute top-5 right-5 rounded border border-[#64ffda] px-3 py-2 font-mono text-xs text-[#64ffda]"
          >
            Close
          </button>
          <nav className="mt-32 flex flex-col items-center gap-6">
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
          <div className="mt-16 flex justify-center gap-8 text-[#8892b0]">
            <a href="https://github.com/mark-john-ignacio" target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">GitHub</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">LinkedIn</a>
            <a href="mailto:Markme44.mm@gmail.com" className="hover:text-[#64ffda]">Email</a>
          </div>
        </div>
      )}
    </>
  );
}

function SectionHeading({ index, children, id }: { index: number; children: React.ReactNode; id: string }) {
  return (
    <h2
      id={id}
      className="group mb-8 flex items-center gap-4 font-semibold tracking-tight text-[#e6f1ff] text-2xl md:text-3xl"
    >
      <span className="font-mono text-base text-[#64ffda]">{String(index).padStart(2, '0')}.</span>
      {children}
      <span className="h-px flex-1 bg-[#233554] group-hover:bg-[#64ffda]/50 transition-colors" />
    </h2>
  );
}

function HeroSection() {
  return (
    <section className="flex min-h-[90vh] flex-col justify-center px-6 pt-24 md:px-24" aria-label="Hero">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-3xl">
        <motion.p variants={fadeUp} className="mb-4 font-mono text-sm text-[#64ffda]">
          Hi, my name is
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mb-2 text-4xl font-extrabold leading-tight text-[#e6f1ff] sm:text-5xl md:text-6xl"
        >
          Mark John Ignacio.
        </motion.h1>
        <motion.h2 variants={fadeUp} className="mb-6 text-3xl font-semibold text-[#8892b0] sm:text-4xl">
          I build things for the web.
        </motion.h2>
        <motion.p variants={fadeUp} className="mb-10 max-w-xl text-[#8892b0]">
          I'm a Laravel + React developer focused on crafting performant, accessible, and visually polished web
          applications. I love bridging elegant frontend experiences with robust backend architecture—shipping features
          that are maintainable and delightful to use.
        </motion.p>
        <motion.div variants={fadeUp}>
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
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
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
    <section ref={ref} className="px-6 py-24 md:px-24" aria-labelledby="about">
      <SectionHeading id="about" index={1}>
        About Me
      </SectionHeading>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid gap-12 md:grid-cols-[3fr_2fr]"
      >
        <div className="space-y-5 text-[#8892b0] leading-relaxed">
          <p>
            I'm a software developer with a passion for building end-to-end web experiences—from resilient backend
            services to rich, interactive frontends. Currently, I work on financial applications that improve stability,
            usability, and performance.
          </p>
          <p>
            I enjoy working across the stack using technologies like Laravel, PHP, and MySQL on the server, while
            leveraging React, TypeScript, and modern component systems on the client. I care about design systems,
            accessibility, and developer experience.
          </p>
          <p>Here are a few technologies I’ve been working with recently:</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
            {tech.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-[#64ffda]">▹</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto max-w-xs">
          <div className="group relative">
            <div className="rounded bg-[#64ffda]/10 p-2 backdrop-blur">
              <div className="aspect-square w-full rounded bg-[#112240] ring-1 ring-[#64ffda]/30" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded border border-[#64ffda] opacity-20 transition group-hover:opacity-40" />
          </div>
        </div>
      </motion.div>
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
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="px-6 py-24 md:px-24" aria-labelledby="experience">
      <SectionHeading id="experience" index={2}>
        Where I've Worked
      </SectionHeading>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid gap-10 md:grid-cols-[200px_1fr]"
      >
        <ul className="flex md:flex-col overflow-x-auto md:overflow-visible -mx-2 md:mx-0 pb-2 md:pb-0">
          {experiences.map((exp, i) => (
            <li key={exp.company} className="px-2 md:px-0">
              <button
                className={`w-full border-l md:border-l-2 pl-4 pr-8 py-2 text-left font-mono text-xs transition-colors hover:text-[#64ffda] text-[#8892b0] ${
                  i === 0 ? 'border-[#64ffda] text-[#64ffda]' : 'border-[#233554]'
                }`}
              >
                {exp.company}
              </button>
            </li>
          ))}
        </ul>
        <div>
          {experiences.slice(0, 1).map((exp) => (
            <div key={exp.company}>
              <h3 className="mb-1 text-lg font-semibold text-[#e6f1ff]">
                {exp.role} <span className="text-[#64ffda]">@ {exp.company}</span>
              </h3>
              <p className="mb-4 font-mono text-xs text-[#8892b0]">{exp.period}</p>
              <ul className="space-y-3">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[#8892b0]">
                    <span className="mt-1 text-[#64ffda]">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  links?: { github?: string; demo?: string };
  featured?: boolean;
}

const projects: ProjectItem[] = [
  {
    title: 'AWS Cloud Resume Challenge',
    description: 'A serverless resume built with AWS Lambda, API Gateway, DynamoDB, and CloudFront.',
    tech: ['AWS', 'Lambda', 'API Gateway', 'DynamoDB', 'CloudFront'],
    featured: true,
  },
  {
    title: 'Online Thesis Archiving System',
    description: 'A secure platform for managing and accessing academic research documents.',
    tech: ['PHP', 'MySQL', 'Tailwind'],
    featured: true,
  },
  {
    title: 'HRWEB Financial Applications',
    description: 'Modern financial applications built with Laravel and React improving stability and UX.',
    tech: ['Laravel', 'React', 'Tailwind', 'Inertia.js'],
    featured: true,
  },
  {
    title: 'Portfolio Website',
    description: 'This portfolio project showcasing my work and experience with refined UI/UX.',
    tech: ['Laravel', 'React', 'TypeScript', 'Framer Motion'],
  },
];

function ProjectsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="px-6 py-24 md:px-24" aria-labelledby="work">
      <SectionHeading id="work" index={3}>
        Some Things I've Built
      </SectionHeading>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="space-y-24"
      >
        {projects
          .filter((p) => p.featured)
          .map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15 + 0.2, duration: 0.6 }}
              className="grid items-center gap-10 md:grid-cols-2"
            >
              <div className={`order-2 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'} relative group`}> 
                <div className="aspect-video w-full rounded bg-[#112240] ring-1 ring-[#64ffda]/30" />
                <div className="pointer-events-none absolute inset-0 rounded border border-[#64ffda]/30 opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className={`order-1 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative`}> 
                <p className="mb-2 font-mono text-sm text-[#64ffda]">Featured Project</p>
                <h3 className="mb-4 text-2xl font-semibold text-[#e6f1ff]">{p.title}</h3>
                <div className="mb-4 rounded bg-[#112240] p-6 text-[#8892b0] shadow-lg ring-1 ring-[#1d2d50]">
                  {p.description}
                </div>
                <ul className="mb-4 flex flex-wrap gap-4 font-mono text-xs text-[#8892b0]">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p) => !p.featured)
            .map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="group relative rounded-lg bg-[#112240] p-6 ring-1 ring-[#233554] hover:-translate-y-1 hover:ring-[#64ffda] transition"
              >
                <h4 className="mb-2 text-lg font-semibold text-[#e6f1ff] group-hover:text-[#64ffda] transition-colors">
                  {p.title}
                </h4>
                <p className="mb-4 text-sm text-[#8892b0]">{p.description}</p>
                <ul className="flex flex-wrap gap-3 font-mono text-[11px] text-[#8892b0]">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="px-6 py-24 md:px-24 text-center" aria-labelledby="contact">
      <SectionHeading id="contact" index={4}>
        What's Next?
      </SectionHeading>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto max-w-2xl"
      >
        <h3 className="mb-6 text-4xl font-bold text-[#e6f1ff]">Get In Touch</h3>
        <p className="mb-10 text-[#8892b0]">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say
          hi, my inbox is always open.
        </p>
        <a
          href="mailto:Markme44.mm@gmail.com"
          className="inline-block rounded border border-[#64ffda] px-8 py-4 font-mono text-sm text-[#64ffda] transition hover:bg-[#64ffda]/10 focus:outline-none focus:ring-2 focus:ring-[#64ffda]/50"
        >
          Say Hello
        </a>
      </motion.div>
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
