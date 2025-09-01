import { motion, useScroll, useSpring } from 'framer-motion';
import React, { Suspense, lazy } from 'react';
import { Head } from '@inertiajs/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SocialSidebar } from '@/components/SocialSidebar';
import { EmailSidebar } from '@/components/EmailSidebar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface PortfolioPageProps {
  personalInfo: any;
  socialLinks: any[];
  experiences: any[];
  projects: { featured: any[]; secondary: any[] };
  meta: { description: string; canonical: string; og_image?: string | null };
  tech: string[];
  tech_items?: { name: string; category?: string; featured?: boolean }[];
}

function PortfolioPage(props: PortfolioPageProps) {
  const { personalInfo, socialLinks, experiences, projects, meta, tech, tech_items } = props as PortfolioPageProps;
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
      <Head title={`${personalInfo?.name ?? 'Portfolio'} | Portfolio`}>
        <meta name="description" content={meta?.description || personalInfo?.tagline || personalInfo?.bio_short || ''} />
        {personalInfo?.name && <meta name="author" content={personalInfo.name} />}
        <meta name="theme-color" content="#0a192f" />
        <meta property="og:type" content="website" />
    <meta property="og:title" content={`${personalInfo?.name ?? 'Portfolio'} | Portfolio`} />
        <meta property="og:description" content={meta?.description || ''} />
        <meta property="og:url" content={meta?.canonical || ''} />
        {meta?.og_image && <meta property="og:image" content={meta.og_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${personalInfo?.name ?? 'Portfolio'} | Portfolio`} />
        <meta name="twitter:description" content={meta?.description || ''} />
        {meta?.og_image && <meta name="twitter:image" content={meta.og_image} />}
        <link rel="canonical" href={meta?.canonical || ''} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": ${JSON.stringify(personalInfo?.name || '')},
            "url": ${JSON.stringify(meta?.canonical || '')},
            "email": ${JSON.stringify(personalInfo?.email ? `mailto:${personalInfo.email}` : '')},
            "jobTitle": ${JSON.stringify(personalInfo?.title || personalInfo?.tagline || '')},
            "sameAs": [
              ${socialLinks.map(s => JSON.stringify(s.url)).join(',')}
            ],
            "knowsAbout": ${JSON.stringify(tech)}
          }
        `}</script>
      </Head>
  <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] rounded bg-[#64ffda] px-4 py-2 font-mono text-xs text-[#0a192f]">Skip to content</a>
      <div className={`min-h-screen w-full overflow-x-hidden font-inter selection:bg-[#64ffda]/20 ${rootClasses}`}>
        {!reduceMotion && (
          <motion.div aria-hidden="true" style={{ scaleX }} className="fixed left-0 top-0 z-50 hidden h-1 w-full origin-left bg-[#64ffda] sm:block" />
        )}
        <div className="hidden lg:block">
          <SocialSidebar links={socialLinks} />
        </div>
        {personalInfo?.email && (
          <div className="hidden lg:block">
            <EmailSidebar email={personalInfo.email} />
          </div>
        )}
        <Header />
  <main id="content" className="pt-20 w-full" role="main">
          <HeroSection
            motionVariants={{ container: adaptiveContainer, item: adaptiveFadeUp }}
            greeting={personalInfo?.hero_greeting}
            name={personalInfo?.name}
            tagline={personalInfo?.hero_tagline || personalInfo?.tagline}
            blurb={personalInfo?.bio_short}
          />
          <AboutSection
            bioShort={personalInfo?.bio_short}
            bioLong={personalInfo?.bio_long}
            tech={(tech_items?.length ? tech_items.filter(t => t.featured).map(t => t.name) : tech) || []}
            profileImage={personalInfo?.profile_image_url}
          />
          {experiences?.length > 0 && <ExperienceSection experiences={experiences} />}
          <Suspense fallback={<div className="px-6 py-24 md:px-24" aria-busy="true">Loading projects…</div>}>
             <LazyProjects projects={projects} />
          </Suspense>
          <ContactSection email={personalInfo?.email} blurb={personalInfo?.contact_blurb} />
          <Footer />
        </main>
      </div>
    </>
  );
}

const LazyProjects = lazy(() => import('../sections/ProjectsSection').then(m => ({ default: (p: any) => <m.ProjectsSection {...p} featured={p?.projects?.featured || []} secondary={p?.projects?.secondary || []} /> })));

export default PortfolioPage;
