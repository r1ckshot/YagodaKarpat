'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from '@/i18n/routing';
import { coverScreen } from '@/lib/transitionBus';

const LOCALES = [
  { code: 'uk' as const, label: 'Українська' },
  { code: 'en' as const, label: 'English' },
];

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'inline';
}

export default function LanguageSwitcher({ variant = 'dropdown' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const otherLocale = LOCALES.find(l => l.code !== locale)?.code as 'uk' | 'en' | undefined;

  // Prefetch the other locale so navigation is instant when user switches.
  useEffect(() => {
    if (otherLocale) router.prefetch(pathname, { locale: otherLocale });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, otherLocale]);

  const switchLocale = async (newLocale: 'uk' | 'en') => {
    if (newLocale === locale) { setOpen(false); return; }
    setOpen(false);
    const hash = window.location.hash;
    await coverScreen();                                                      // curtain sweeps in (~0.92s)
    router.replace(pathname + hash, { locale: newLocale, scroll: false });   // navigate while covered, preserve hash
    // reveal is triggered by LocaleTransition on the new page after it mounts
  };

  // Inline variant — two buttons side by side, no dropdown
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-1">
        {LOCALES.map(({ code, label }, i) => (
          <span key={code} className="flex items-center gap-1">
            <button
              onClick={() => switchLocale(code)}
              className={`text-sm font-body transition-colors duration-200 py-1 px-2 rounded ${
                code === locale
                  ? 'text-berry font-semibold'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {label}
            </button>
            {i < LOCALES.length - 1 && (
              <span className="text-white/20 text-xs">/</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-body text-cream/70 hover:text-cream border border-cream/20 hover:border-cream/40 transition-colors duration-200"
      >
        {LOCALES.find(l => l.code === locale)?.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-dark/95 backdrop-blur-sm border border-cream/10 rounded-xl overflow-hidden min-w-[148px] shadow-lg z-10"
          >
            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => switchLocale(code)}
                className={`w-full px-4 py-2.5 text-left text-sm font-body transition-colors duration-200 ${
                  code === locale
                    ? 'text-cream bg-white/5 cursor-default'
                    : 'text-cream/60 hover:text-cream hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
