import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number; // px from top to always show
  delta?: number; // minimal scroll difference to trigger
  disabled?: boolean;
}

export function useHideOnScroll({ threshold = 80, delta = 6, disabled = false }: Options = {}) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    if (disabled) return;
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - last.current;
      if (y < threshold) {
        setHidden(false);
      } else if (diff > delta) {
        setHidden(true);
      } else if (diff < -delta) {
        setHidden(false);
      }
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, delta, disabled]);

  return hidden;
}
