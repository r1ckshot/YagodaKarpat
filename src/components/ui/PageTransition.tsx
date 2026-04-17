'use client';

import { useRef, useEffect } from 'react';
import { registerCoverHandler, registerRevealHandler } from '@/lib/transitionBus';

const STRIPES = ['#3A598C', '#355A91', '#1A1A2E', '#C0392B', '#008549'];

// Smooth professional easing (used by Locomotive, Linear, Vercel)
const EASE_IN  = 'cubic-bezier(0.65, 0, 0.35, 1)';
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

const DUR_IN_MS  = 480;
const DUR_OUT_MS = 240;
const STAGGER_MS = 110;
const HOLD_MS    = 200;

export default function PageTransition() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stripes = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!stripes.length) return;

    const set = (el: HTMLDivElement, tx: string, tr = '') => {
      el.style.transition = tr;
      el.style.transform  = `translateX(${tx})`;
    };

    registerCoverHandler(() => new Promise<void>(resolve => {
      // Stripes enter from right, top-to-bottom stagger
      stripes.forEach((el, i) =>
        set(el, '0%', `transform ${DUR_IN_MS}ms ${EASE_IN} ${i * STAGGER_MS}ms`)
      );
      setTimeout(resolve, DUR_IN_MS + (stripes.length - 1) * STAGGER_MS);
    }));

    registerRevealHandler(() => {
      setTimeout(() => {
        // All stripes exit simultaneously — clean single-plate flip
        stripes.forEach(el =>
          set(el, '-100%', `transform ${DUR_OUT_MS}ms ${EASE_OUT}`)
        );
        const totalOut = DUR_OUT_MS;
        setTimeout(() => stripes.forEach(el => set(el, '100%')), totalOut);
      }, HOLD_MS);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[101] pointer-events-none">
      {STRIPES.map((color, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          style={{
            position:        'absolute',
            inset:           0,
            backgroundColor: color,
            transform:       'translateX(100%)',
            willChange:      'transform',
          }}
        />
      ))}
    </div>
  );
}
