'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SEASON_CONFIG } from '@/config/season';
import { EASING } from '@/lib/animations';

// Word-by-word blur reveal variants
const titleContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
  },
};

const titleWord = {
  initial: { opacity: 0, filter: 'blur(10px)', y: 10 },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.9, ease: EASING.smooth },
  },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASING.enter },
});

// Words that get blueberry accent underline (lowercase for matching)
const ACCENT_WORDS = new Set(['лохина', 'blueberries']);

export default function HeroSection() {
  const t = useTranslations('hero');
  const words = t('tagline').split(' ');

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Portrait video — mobile only */}
      <video
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster-portrait.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-portrait.mov" />
      </video>

      {/* Landscape video — tablet and desktop */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster-landscape.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-landscape.mov" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/85" />

      {/* Main content — centered in viewport */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto">

        {/* Full logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASING.enter }}
          className="mb-3 sm:mb-4 lg:mb-5 w-72 sm:w-[22rem] md:w-[22rem] lg:w-96 xl:w-[26rem] flex flex-col items-center"
        >
          {/* Logo assembled from individual parts — each has layoutId for IntroSplash */}
          <div className="flex flex-col items-center w-full">
            {/* Mountains */}
            {/* layoutId added when IntroSplash is built */}
            <img
              src="/images/logo/mountains.png"
              alt=""
              aria-hidden="true"
              className="w-[90%] h-auto"
            />
            <img
              src="/images/logo/blueberry.png"
              alt="Ягода Карпат"
              className="w-[35%] h-auto -mt-[7%]"
            />
            <img
              src="/images/logo/title.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto mt-[1%]"
            />
          </div>

          {/* Wave */}
          <img
            src="/images/logo/bottom wave.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto"
          />

          {/* "Blueberry" text with cream glow background */}
          <div className="relative -mt-[7%] w-full flex justify-center">
            <div className="absolute inset-x-[34%] inset-y-1 bg-cream/80 rounded-full blur-md" />
            <div className="absolute inset-x-[9%] inset-y-5 bg-cream/50 rounded-full blur-xl" />
            <img
              src="/images/logo/bottom tittle.png"
              alt=""
              aria-hidden="true"
              className="relative w-[35%] h-auto"
            />
          </div>
        </motion.div>

        {/* Tagline — word by word blur reveal */}
        <motion.h1
          variants={titleContainer}
          initial="initial"
          animate="animate"
          className="font-heading text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-cream leading-tight mb-3 sm:mb-4 lg:whitespace-nowrap"
        >
          {words.map((word, i) => {
            const isAccent = ACCENT_WORDS.has(word.toLowerCase());

            return isAccent ? (
              <motion.span
                key={i}
                variants={titleWord}
                className="inline-block mr-[0.3em] last:mr-0 relative"
              >
                {word}
                {/* Calligraphic wave — draws itself right after the word settles */}
                <motion.svg
                  viewBox="0 0 100 18"
                  className="absolute left-0 bottom-[-14px] w-full h-[18px]"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  overflow="visible"
                >
                  <motion.path
                    d="M 2,9 C 16,3 32,15 50,9 C 66,3 84,15 94,8 C 96,7 98,5, 99,4"
                    stroke="var(--color-blueberry)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { delay: 1.35, duration: 0.85, ease: EASING.enter },
                      opacity: { delay: 1.35, duration: 0.2 },
                    }}
                  />
                </motion.svg>
              </motion.span>
            ) : (
              <motion.span
                key={i}
                variants={titleWord}
                className="inline-block mr-[0.3em] last:mr-0"
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(1.7)}
          className="font-body text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-cream/80 mb-3 sm:mb-4"
        >
          {t('subtitle')}
        </motion.p>

        {/* Season status */}
        <motion.div {...fadeUp(2.15)} className="flex items-center gap-2.5 mb-6">
          {SEASON_CONFIG.isOpen ? (
            <>
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-forest" />
              </span>
              <span className="font-body text-base sm:text-lg xl:text-xl text-cream/80 tracking-wide">
                {t('seasonOpen')}
              </span>
            </>
          ) : (
            <>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cream/30" />
              <span className="font-body text-base sm:text-lg text-cream/50 tracking-wide">
                {t('seasonClosed')}
              </span>
            </>
          )}
        </motion.div>

        {/* CTA — pulsing ring */}
        <motion.div {...fadeUp(2.55)} className="relative">
          <motion.span
            className="absolute inset-0 rounded-full bg-forest"
            animate={{ scale: [1, 1, 1.6], opacity: [0, 0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.1, 1], ease: 'easeOut' }}
          />
          <a
            href="#about"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream font-body font-semibold rounded-full hover:bg-forest/80 transition-colors duration-200"
          >
            {t('cta')}
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator — clickable, absolute bottom */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.1 }}
        className="absolute bottom-8 sm:bottom-6 md:bottom-6 lg:bottom-2 xl:bottom-4 left-1/2 -translate-x-1/2 z-10"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-cream/40 hover:text-cream/70 transition-colors duration-200" size={28} />
        </motion.div>
      </motion.a>

    </section>
  );
}
