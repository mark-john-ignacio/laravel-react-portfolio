import { useEffect, useRef, useState } from 'react';

export interface UseRevealOptions {
  margin?: string;
  once?: boolean;
  threshold?: number | number[];
}

interface RevealReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  inView: boolean;
  hasAnimated: boolean;
}

/**
 * useReveal - A lightweight intersection observer hook for triggering entrance animations.
 */
export function useReveal<T extends HTMLElement>(options: UseRevealOptions = {}): RevealReturn<T> {
  const { margin = '-80px', once = true, threshold = 0.2 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      setHasAnimated(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            setHasAnimated(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { root: null, rootMargin: margin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, once, threshold]);

  return { ref, inView, hasAnimated } as RevealReturn<T>;
}
