'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const SHOW_AFTER_PX = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-4 right-4 z-50 w-11 h-11 md:w-12 md:h-12 lg:w-13 lg:h-13 rounded-full bg-forest text-white flex items-center justify-center shadow-lg hover:bg-forest/80 transition-colors duration-200"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </m.button>
      )}
    </AnimatePresence>
  );
}
