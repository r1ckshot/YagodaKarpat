'use client';

import { m } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { EASING } from '@/lib/animations';

interface LightboxProps {
  onClose: () => void;
  children: React.ReactNode;
  /** Remounts the animated content wrapper — Gallery keys this by photo index so each photo fades in fresh. */
  contentKey?: string | number;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

/** Full-screen photo overlay — dark backdrop, close button, optional prev/next nav arrows. */
export default function Lightbox({
  onClose,
  children,
  contentKey,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}: LightboxProps) {
  return (
    <m.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-dark/92 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-4 right-4 text-cream/70 hover:text-cream
                   transition-colors duration-200 z-10"
        aria-label="Закрити"
      >
        <X size={32} />
      </button>

      <m.div
        key={contentKey}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        transition={{ duration: 0.2, ease: EASING.enter }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </m.div>

      {onPrev && hasPrev && (
        <button onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
                     bg-dark/65 backdrop-blur-sm border border-cream/20
                     flex items-center justify-center text-cream/75
                     hover:text-cream hover:bg-dark/85 transition-colors"
          aria-label="Попереднє фото"
        ><ChevronLeft size={22} /></button>
      )}
      {onNext && hasNext && (
        <button onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
                     bg-dark/65 backdrop-blur-sm border border-cream/20
                     flex items-center justify-center text-cream/75
                     hover:text-cream hover:bg-dark/85 transition-colors"
          aria-label="Наступне фото"
        ><ChevronRight size={22} /></button>
      )}
    </m.div>
  );
}
