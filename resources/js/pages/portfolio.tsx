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
  <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] rounded bg-[#64ffda] px-4 py-2 font-mono text-xs text-[#0a192f]">Skip to content</a>
      <div className={`min-h-screen font-inter selection:bg-[#64ffda]/20 ${rootClasses}`}>
        {!reduceMotion && (
          <motion.div aria-hidden="true" style={{ scaleX }} className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-[#64ffda]" />
        )}
        <SocialSidebar />
        <EmailSidebar />
        <Header />
  <main id="content" className="pt-20" role="main">
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

const LazyProjects = lazy(() => import('../sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));

export default PortfolioPage;
