'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { isSeasonOpen } from '@/config/season';
import { EASING } from '@/lib/animations';
import { isSplashPending, SPLASH_DURATION_OFFSET } from '@/lib/splashState';

const ACCENT_WORDS = new Set(['лохина', 'blueberries']);

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const words = t('tagline').split(' ');

  const firstLoad = useRef(
    typeof window !== 'undefined' && isSplashPending()
  ).current;
  const portraitPosterRef  = useRef<HTMLImageElement>(null);
  const landscapePosterRef = useRef<HTMLImageElement>(null);
  const splashOffset = firstLoad ? SPLASH_DURATION_OFFSET : 0;

  const titleWord = {
    initial: { opacity: 0, filter: 'blur(10px)', y: 10 },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: firstLoad
        ? { duration: 0.9, ease: EASING.smooth }
        : { duration: 0 },
    },
  };

  const titleContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: firstLoad ? 0.08 : 0,
        delayChildren:   firstLoad ? 0.5 + splashOffset : 0,
      },
    },
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 14 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: firstLoad
      ? { duration: 0.5, delay: delay + splashOffset, ease: EASING.enter }
      : { duration: 0 },
  });

  const logoReveal = (delay = 0, duration = 0.4) => ({
    initial: { opacity: 0 } as const,
    animate: { opacity: 1 } as const,
    transition: firstLoad
      ? { delay: delay + splashOffset, duration }
      : { duration: 0 },
  });

  return (
    <section id="hero" className="relative h-[100dvh] flex flex-col overflow-hidden">

      {/* Portrait video — mobile only */}
      <div className="absolute inset-0 block md:hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline aria-hidden="true"
          onPlay={() => { if (portraitPosterRef.current) portraitPosterRef.current.style.opacity = '0'; }}
        >
          <source src="/videos/hero-portrait.mp4" />
        </video>
        <img ref={portraitPosterRef} src="/images/hero-poster-portrait.webp" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </div>

      {/* Landscape video — tablet and desktop */}
      <div className="absolute inset-0 hidden md:block">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline aria-hidden="true"
          onPlay={() => { if (landscapePosterRef.current) landscapePosterRef.current.style.opacity = '0'; }}
        >
          <source src="/videos/hero-landscape.mp4" />
        </video>
        <img ref={landscapePosterRef} src="/images/hero-poster-landscape.webp" alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </div>

      {/* Gradient overlay — shared */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/85" />
      {/* Extra overlay — mobile portrait only, slightly darker */}
      <div className="absolute inset-0 bg-dark/25 md:hidden" />

      {/* Navbar spacer — small phones portrait (<640px) and all phones in landscape (<1024px) */}
      <div className="flex-none h-16 sm:h-0 [@media_(orientation:landscape)_and_(max-width:1023px)]:h-16" aria-hidden="true" />

      {/* Main content — fills available height, centres children */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto"
        style={{
          paddingLeft:  'max(1.5rem, env(safe-area-inset-left, 0px))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right, 0px))',
        }}
      >

        {/* Logo — fluid width capped by both vw and dvh so it never overflows short viewports */}
        <div className="w-[clamp(18rem,13rem_+_25vw,26rem)] max-w-[min(85vw,50dvh)] [@media_(min-height:680px)]:max-w-[85vw] flex flex-col items-center mb-[clamp(0.5rem,1.5dvh,1.25rem)] [@media_(orientation:landscape)_and_(max-width:932px)]:hidden">
          <div className="flex flex-col items-center w-full">
            <m.img
              src="/images/logo/mountains.webp"
              alt="" aria-hidden="true" width={527} height={225}
              className="w-[90%] h-auto"
              {...logoReveal()}
            />
            <m.img
              src="/images/logo/blueberry.webp"
              alt="Ягода Карпат" width={256} height={196}
              className="w-[35%] h-auto -mt-[7%]"
              {...logoReveal()}
            />
            <m.img
              src="/images/logo/title.webp"
              alt="" aria-hidden="true" width={757} height={107}
              className="w-full h-auto mt-[1%]"
              {...logoReveal()}
            />
          </div>

          <m.img
            src="/images/logo/bottom-wave.webp"
            alt="" aria-hidden="true" width={681} height={89}
            className="w-full h-auto"
            {...logoReveal()}
          />

          {/* "Blueberry" text + glow */}
          <div className="relative -mt-[7%] w-full flex justify-center">
            <m.div
              className="absolute inset-x-[34%] inset-y-1 bg-cream/80 rounded-full"
              style={{ filter: 'blur(clamp(0.6rem, 1.2vw, 0.9rem))' }}
              {...logoReveal(0.3, 0.5)}
            />
            <m.div
              className="absolute inset-x-[9%] inset-y-3 bg-cream/30 rounded-full"
              style={{ filter: 'blur(clamp(1.2rem, 2.2vw, 1.7rem))' }}
              {...logoReveal(0.3, 0.6)}
            />
            <m.img
              src="/images/logo/bottom-title.webp"
              alt="" aria-hidden="true" width={937} height={366}
              className="relative w-[35%] h-auto"
              {...logoReveal(0.3, 0.5)}
            />
          </div>
        </div>

        {/* Tagline */}
        <m.h1
          variants={titleContainer}
          initial="initial"
          animate="animate"
          className="font-heading text-[clamp(2.375rem,1.775rem_+_2.475vw,3.75rem)] [@media_(max-width:380px)]:text-[1.625rem] text-cream leading-tight mb-[clamp(0.375rem,1dvh,0.75rem)] lg:whitespace-nowrap"
        >
          {words.map((word, i) => {
            const isAccent = ACCENT_WORDS.has(word.toLowerCase());
            return isAccent ? (
              <m.span key={`${i}-${locale}`} variants={titleWord} className="inline-block mr-[0.3em] last:mr-0 relative">
                {word}
                <m.svg
                  viewBox="0 0 100 18"
                  className="absolute left-0 bottom-[-14px] w-full h-[18px]"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  overflow="visible"
                >
                  <m.path
                    d="M 2,9 C 16,3 32,15 50,9 C 66,3 84,15 94,8 C 96,7 98,5, 99,4"
                    stroke="color-mix(in srgb, var(--color-blueberry) 85%, transparent)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={firstLoad ? {
                      pathLength: { delay: 1.35 + splashOffset, duration: 1.1, ease: EASING.enter },
                      opacity:    { delay: 1.35 + splashOffset, duration: 0.2 },
                    } : {
                      pathLength: { delay: 1.0, duration: 1.1, ease: EASING.enter },
                      opacity:    { delay: 1.0, duration: 0.2 },
                    }}
                  />
                </m.svg>
              </m.span>
            ) : (
              <m.span key={i} variants={titleWord} className="inline-block mr-[0.3em] last:mr-0">
                {word}
              </m.span>
            );
          })}
        </m.h1>

        {/* Subtitle */}
        <m.p
          {...fadeUp(1.7)}
          className="font-body text-[clamp(1.25rem,1.1rem_+_0.9vw,1.75rem)] text-cream/80 mb-[clamp(0.375rem,1dvh,0.75rem)]"
        >
          {t('subtitle')}
        </m.p>

        {/* Season status */}
        <m.div {...fadeUp(2.15)} className="flex items-center gap-2.5 mb-[clamp(0.75rem,2.5dvh,1.75rem)]">
          {isSeasonOpen() ? (
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
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-berry opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-berry" />
              </span>
              <span className="font-body text-base sm:text-lg xl:text-xl text-cream/80 tracking-wide">
                {t('seasonClosed')}
              </span>
            </>
          )}
        </m.div>

        {/* CTA */}
        <m.div {...fadeUp(2.55)} className="relative">
          <span className="absolute inset-0 rounded-full bg-forest animate-cta-pulse" />
          <a
            href="#about"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-cream font-body font-semibold rounded-full hover:bg-forest/80 transition-colors duration-200"
          >
            {t('cta')}
          </a>
        </m.div>

      </div>

      {/* Scroll indicator — absolute so it never pushes content up */}
      <m.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={firstLoad
          ? { duration: 0.5, delay: 3.1 + splashOffset }
          : { duration: 0 }}
        className="absolute bottom-[clamp(1rem,2dvh,2rem)] left-0 right-0 z-10 flex justify-center [@media_(max-height:720px)]:hidden"
        aria-label="Scroll down"
      >
        <div className="animate-bounce">
          <ChevronDown className="text-cream/40 hover:text-cream/70 transition-colors duration-200" size={28} />
        </div>
      </m.a>

    </section>
  );
}
