import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { HERO_PADDING } from '@/data/layout';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
    motionVariants: { container: any; item: any };
    greeting?: string | null;
    name?: string | null;
    tagline?: string | null; // hero tagline line 2
    blurb?: string | null; // short bio paragraph
    ctaHref?: string;
    ctaLabel?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    motionVariants,
    greeting,
    name,
    tagline,
    blurb,
    ctaHref = '#work',
    ctaLabel = 'Check out my work!',
}) => {
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
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setMouse({ x, y });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [reduceMotion]);
    const motionStyle = (depth: number) => (reduceMotion ? {} : { x: mouse.x * depth });
    return (
        <section ref={heroRef} className={`relative flex min-h-screen flex-col justify-center overflow-hidden ${HERO_PADDING}`} aria-label="Hero">
            {!reduceMotion && (
                <>
                    <motion.div
                        aria-hidden="true"
                        style={{ y: layer1Y, ...motionStyle(12) }}
                        className="pointer-events-none absolute -top-24 -right-12 h-72 w-72 rounded-full bg-[#64ffda]/5 blur-3xl sm:-right-24 sm:h-96 sm:w-96"
                    />
                    <motion.div
                        aria-hidden="true"
                        style={{ y: layer2Y, ...motionStyle(24) }}
                        className="pointer-events-none absolute top-1/3 -left-20 h-[20rem] w-[20rem] rounded-full bg-[#233554]/40 blur-3xl sm:-left-40 sm:h-[34rem] sm:w-[34rem]"
                    />
                    <motion.div
                        aria-hidden="true"
                        style={{ y: layer3Y, ...motionStyle(40) }}
                        className="pointer-events-none absolute bottom-0 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-[#64ffda]/10 blur-2xl sm:h-[26rem] sm:w-[26rem]"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.04] [background:radial-gradient(circle_at_center,rgba(100,255,218,0.25)_0,transparent_60%)]"
                    />
                </>
            )}
            <motion.div variants={motionVariants.container} initial="hidden" animate="show" className="relative z-10 w-full max-w-[1000px]">
                <motion.p variants={motionVariants.item} className="mb-5 font-mono text-base text-[#64ffda]">
                    {greeting || 'Hi, my name is'}
                </motion.p>
                <motion.h1 variants={motionVariants.item} className="mb-3 text-[clamp(40px,8vw,80px)] leading-[1.1] font-semibold text-[#ccd6f6]">
                    {name || 'Your Name'}.
                </motion.h1>
                {(tagline || 'I build things for the web.') && (
                    <motion.h2 variants={motionVariants.item} className="mb-5 text-[clamp(40px,8vw,80px)] leading-[1.1] font-semibold text-[#8892b0]">
                        {tagline || 'I build things for the web.'}
                    </motion.h2>
                )}
                {(blurb || "I'm a full stack developer focused on crafting performant, accessible, and visually polished web applications.") && (
                    <motion.p variants={motionVariants.item} className="mb-12 max-w-[540px] text-base leading-relaxed text-[#8892b0]">
                        {blurb || "I'm a full stack developer focused on crafting performant, accessible, and visually polished web applications."}
                    </motion.p>
                )}
                <motion.div variants={motionVariants.item}>
                    <AnimatedButton onClick={() => (window.location.href = ctaHref)} variant="outline" size="lg">
                        {ctaLabel}
                    </AnimatedButton>
                </motion.div>
            </motion.div>
        </section>
    );
};
