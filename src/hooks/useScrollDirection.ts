import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down';

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up');

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setDirection(currentY > lastY ? 'down' : 'up');
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return direction;
}
