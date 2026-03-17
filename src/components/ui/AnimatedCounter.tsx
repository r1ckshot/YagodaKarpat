'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { DURATION, THRESHOLD } from '@/lib/animations';

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: `-${(1 - THRESHOLD) * 100}% 0px` });

  useEffect(() => {
    if (!isInView) return;

    const duration = DURATION.counter * 1000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref} className={className}>{count}</span>;
}
