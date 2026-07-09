import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down';

interface ScrollPosition {
  y: number;
  direction: ScrollDirection;
}

/**
 * Tracks scroll position and direction with a single shared listener per consumer,
 * throttled to one state update per animation frame (instead of one per scroll event).
 */
export function useScrollPosition(): ScrollPosition {
  const [state, setState] = useState<ScrollPosition>({ y: 0, direction: 'up' });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const readScroll = () => {
      const currentY = window.scrollY;
      setState({
        y: currentY,
        direction: currentY > lastY.current ? 'down' : 'up',
      });
      lastY.current = currentY;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        readScroll();
        ticking.current = false;
      });
    };

    readScroll(); // sync state immediately in case the page loads already scrolled
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return state;
}
