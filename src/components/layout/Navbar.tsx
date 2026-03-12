'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const NAV_LINKS = [
  { key: 'about',     href: '#about' },
  { key: 'varieties', href: '#varieties' },
  { key: 'process',   href: '#process' },
  { key: 'gallery',   href: '#gallery' },
  { key: 'contact',   href: '#contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const direction = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isHidden = direction === 'down' && !isAtTop && !menuOpen;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div
        className={`h-16 transition-colors duration-200 border-b ${
          isAtTop && !menuOpen
            ? 'bg-transparent border-transparent'
            : 'bg-dark/90 backdrop-blur-sm border-cream/10'
        }`}
      >
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3.5 shrink-0">
            <img src="/images/logo/blueberry.png" alt="" className="h-9 w-auto" />
            <img src="/images/logo/title.png" alt="Ягода Карпат" className="h-7 w-auto" />
          </a>

          {/* Desktop: nav + language + mountains */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-white/70 hover:text-white text-base font-body transition-colors duration-200"
              >
                {t(key)}
              </a>
            ))}
            <div className="w-px h-4 bg-white/20 shrink-0" />
            <LanguageSwitcher />
          </div>

          <img
            src="/images/logo/mountains.png"
            alt=""
            className="hidden lg:block h-9 w-auto opacity-75 shrink-0"
          />

          {/* Tablet/mobile: mountains + burger */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <img
              src="/images/logo/mountains.png"
              alt=""
              className="hidden sm:block h-8 w-auto opacity-75"
            />
            <button
              className="text-white/70 hover:text-white transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile/tablet dropdown — includes language switcher */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="lg:hidden bg-dark/95 backdrop-blur-sm border-b border-cream/10"
          >
            <nav className="flex flex-col px-6 py-3">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="text-white/70 hover:text-white text-base font-body transition-colors duration-200 py-3 border-b border-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(key)}
                </motion.a>
              ))}
              {/* Language switcher at bottom of menu */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.2 }}
                className="pt-3 pb-1"
              >
                <LanguageSwitcher variant="inline" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
