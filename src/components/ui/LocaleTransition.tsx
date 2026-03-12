'use client';

import { useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

export default function LocaleTransition({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locale}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
