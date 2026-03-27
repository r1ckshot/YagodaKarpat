'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { m, useInView } from 'framer-motion';
import { EASING, THRESHOLD } from '@/lib/animations';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  y = 24,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // If element is already in viewport on mount (e.g. after locale switch),
  // skip the reveal animation and show instantly.
  const [preVisible, setPreVisible] = useState(false);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight) setPreVisible(true);
  }, []);

  const isInView = useInView(ref, { once: true, amount: THRESHOLD });
  const show = preVisible || isInView;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={preVisible ? { duration: 0 } : { duration: 0.6, delay, ease: EASING.enter }}
      className={className}
    >
      {children}
    </m.div>
  );
}
