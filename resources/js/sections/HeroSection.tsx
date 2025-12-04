import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { HERO_PADDING } from '@/data/layout';

interface HeroSectionProps {
  motionVariants: { container: any; item: any };
  greeting?: string | null;
  name?: string | null;
  tagline?: string | null; // hero tagline line 2
  blurb?: string | null; // short bio paragraph
  ctaHref?: string;
  ctaLabel?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ motionVariants, greeting, name, tagline, blurb, ctaHref = '#work', ctaLabel = 'Check out my work!' }) => {
  const { scrollYProgress } = useScroll();
  const spring1 = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const spring2 = useSpring(scrollYProgress, { stiffness: 70, damping: 25 });
  const spring3 = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const layer1Y = useTransform(spring1, v => v * -40);
  const layer2Y = useTransform(spring2, v => v * -70);
  const layer3Y = useTransform(spring3, v => v * -110);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const reduceMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduceMotion]);
  const motionStyle = (depth: number) => (reduceMotion ? {} : { x: mouse.x * depth });
  return (
    <section ref={heroRef} className={`relative flex min-h-[90vh] flex-col justify-center overflow-hidden ${HERO_PADDING}`} aria-label="Hero">
      {!reduceMotion && (
        <>
          <motion.div aria-hidden="true" style={{ y: layer1Y, ...motionStyle(12) }} className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#64ffda]/5 blur-3xl" />
          <motion.div aria-hidden="true" style={{ y: layer2Y, ...motionStyle(24) }} className="pointer-events-none absolute top-1/3 -left-40 h-[34rem] w-[34rem] rounded-full bg-[#233554]/40 blur-3xl" />
          <motion.div aria-hidden="true" style={{ y: layer3Y, ...motionStyle(40) }} className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#64ffda]/10 blur-2xl" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04] [background:radial-gradient(circle_at_center,rgba(100,255,218,0.25)_0,transparent_60%)]" />
        </>
      )}
      <motion.div variants={motionVariants.container} initial="hidden" animate="show" className="relative z-10 max-w-3xl">
        <motion.p variants={motionVariants.item} className="mb-4 font-mono text-sm text-[#64ffda]">{greeting || 'Hi, my name is'}</motion.p>
        <motion.h1 variants={motionVariants.item} className="mb-2 text-5xl font-extrabold leading-tight text-[#e6f1ff] sm:text-6xl md:text-7xl">{name || 'Your Name'}.</motion.h1>
        { (tagline || 'I build things for the web.') && (
          <motion.h2 variants={motionVariants.item} className="mb-6 text-4xl font-semibold text-[#8892b0] sm:text-5xl">{tagline || 'I build things for the web.'}</motion.h2>
        ) }
        { (blurb || "I'm a full stack developer focused on crafting performant, accessible, and visually polished web applications.") && (
          <motion.p variants={motionVariants.item} className="mb-10 max-w-xl text-[#8892b0]">{blurb || "I'm a full stack developer focused on crafting performant, accessible, and visually polished web applications."}</motion.p>
        ) }
        <motion.div variants={motionVariants.item}>
          <a href={ctaHref} className="inline-block rounded border border-[#64ffda] px-6 py-3 font-mono text-sm text-[#64ffda] transition hover:bg-[#64ffda]/10 focus:outline-none focus:ring-2 focus:ring-[#64ffda]/50">{ctaLabel}</a>
        </motion.div>
      </motion.div>
    </section>
  );
};
