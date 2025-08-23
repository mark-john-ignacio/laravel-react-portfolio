import { useEffect, useState } from 'react';

/**
 * useScrollSpy
 * Observes a list of section IDs and returns the currently active section based on scroll position.
 */
export function useScrollSpy(sectionIds: string[], offset = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Sort by y position to get the top-most intersecting element
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top));

        if (visible.length) {
          setActiveId(visible[0].target.id);
          return;
        }

        // Fallback: find the section nearest to top
        let current: HTMLElement | null = null;
        let minDistance = Number.POSITIVE_INFINITY;
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - (offset || 0));
          if (distance < minDistance) {
            minDistance = distance;
            current = el;
          }
        }
        if (current) setActiveId(current.id);
      },
      {
        rootMargin: `-${80 + offset}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [sectionIds, offset]);

  return { activeId };
}
