'use client';

import { useState, useLayoutEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { EASING } from '@/lib/animations';
import { isSplashPending, consumeSplash } from '@/lib/splashState';

// "Blueberry" text ends at 3.55 + 0.6 = 4.15s, +0.15s breathing → 4300ms
const SPLASH_DURATION = 4300;
const EXIT_DURATION   = 0.5;   // s — opacity fade-out

export default function IntroSplash() {
  // Start visible — covers the page from the very first SSR render (no flash of background).
  // useLayoutEffect decides whether to keep it (first load) or instantly hide it (locale change).
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (!isSplashPending()) {
      setVisible(false); // locale change: hide synchronously before paint
      return;
    }
    consumeSplash();
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setVisible(false), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          data-splash=""
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: EASING.exit }}
        >
          <div className="flex flex-col items-center w-[clamp(18rem,13rem_+_25vw,27.5rem)] max-w-[min(85vw,90dvh)]">

            {/* 1. Mountains — lens-focus blur reveal */}
            <m.img
              src="/images/logo/mountains.webp"
              alt=""
              aria-hidden="true"
              width={527} height={225}
              className="w-[90%] h-auto"
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.3, duration: 0.9, ease: EASING.enter }}
            />

            {/* 2. Blueberry — gentle scale pop after mountains focus */}
            <m.img
              src="/images/logo/blueberry.webp"
              alt="Ягода Карпат"
              width={256} height={196}
              className="w-[35%] h-auto -mt-[7%]"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                scale: { type: 'spring', stiffness: 250, damping: 14, delay: 1.3 },
                opacity: { delay: 1.3, duration: 0.35, ease: EASING.enter },
              }}
            />

            {/* 3. Title — blur reveal after berry settles */}
            <m.img
              src="/images/logo/title.webp"
              alt=""
              aria-hidden="true"
              width={757} height={107}
              className="w-full h-auto mt-[1%]"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 2.1, duration: 0.75, ease: EASING.enter }}
            />

            {/* 4. Wave — expands from center */}
            <m.img
              src="/images/logo/bottom-wave.webp"
              alt=""
              aria-hidden="true"
              width={681} height={89}
              className="w-full h-auto"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              style={{ transformOrigin: 'center' }}
              transition={{ delay: 2.85, duration: 0.7, ease: EASING.enter }}
            />

            {/* 5. "Blueberry" text — rises gently after wave settles */}
            <div className="relative -mt-[7%] w-full flex justify-center">
              <m.img
                src="/images/logo/bottom-title.webp"
                alt=""
                aria-hidden="true"
                width={937} height={366}
                className="w-[35%] h-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.55, duration: 0.6, ease: EASING.enter }}
              />
            </div>

          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
