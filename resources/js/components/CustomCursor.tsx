import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useState } from 'react';

/**
 * Custom cursor that follows the mouse with a smooth glowing effect
 * Shows a teal glow orb that tracks cursor movement
 */
export const CustomCursor: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    // Motion values for smooth cursor tracking
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for smooth following effect
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const updateCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Check if hovering over interactive element
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(!!isInteractive);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Add event listeners
        window.addEventListener('mousemove', updateCursor);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    // Don't render on mobile or if reduced motion is preferred
    if (typeof window === 'undefined' || 'ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return null;
    }

    return (
        <>
            {/* Main cursor glow */}
            <motion.div
                className="pointer-events-none fixed z-[9999] hidden lg:block"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                }}
            >
                {/* Outer glow */}
                <div className="relative h-32 w-32">
                    <div className="absolute inset-0 rounded-full bg-[#64ffda] opacity-20 blur-2xl" />
                </div>
            </motion.div>

            {/* Inner dot cursor */}
            <motion.div
                className="pointer-events-none fixed z-[9999] hidden lg:block"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isPointer ? 0 : 1,
                }}
                transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.15 },
                }}
            >
                {/* Small dot */}
                <div className="h-1.5 w-1.5 rounded-full bg-[#64ffda]" />
            </motion.div>

            {/* Larger ring on hover */}
            <motion.div
                className="pointer-events-none fixed z-[9999] hidden lg:block"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={{
                    opacity: isVisible && isPointer ? 0.5 : 0,
                    scale: isPointer ? 1 : 0.8,
                }}
                transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                }}
            >
                {/* Ring for interactive elements */}
                <div className="h-10 w-10 rounded-full border border-[#64ffda]" />
            </motion.div>
        </>
    );
};
