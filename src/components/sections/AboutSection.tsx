'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PiFarmFill } from 'react-icons/pi';
import { X } from 'lucide-react';
import Image from 'next/image';
import SectionReveal from '@/components/ui/SectionReveal';
import { EyebrowDivider, IconRule } from '@/components/ui/SectionOrnaments';
import { EASING } from '@/lib/animations';

export default function AboutSection() {
  const t = useTranslations();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-cream overflow-hidden min-h-[100dvh] flex flex-col justify-center py-[clamp(5rem,8dvh,7rem)]"
    >

      {/* Decorative blueberry — bottom-right corner, partially cropped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden="true"
        src="/images/blueberries.svg"
        alt=""
        className="absolute bottom-[-3rem] right-[-2rem] w-[158px] md:w-[240px] lg:w-[250px] [@media_(orientation:landscape)_and_(max-width:1180px)]:hidden pointer-events-none select-none"
        style={{ opacity: 0.14, filter: 'blur(1.5px)', mixBlendMode: 'multiply' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-24 items-center">

          {/* ── Text column ── */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto lg:mx-0 mb-14 lg:mb-0">

            {/* Eyebrow */}
            <SectionReveal>
              <div className="flex items-center gap-4 mb-[clamp(0.75rem,2dvh,1.25rem)]">
                <EyebrowDivider src="/images/about-divider.svg" />
                <span className="font-body text-base uppercase tracking-[0.28em] pl-[0.28em] text-forest font-semibold">
                  {t('about.title')}
                </span>
                <EyebrowDivider src="/images/about-divider.svg" flip />
              </div>
            </SectionReveal>

            {/* Title */}
            <SectionReveal delay={0.1}>
              <h2 className="font-heading text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] text-dark leading-tight mb-[clamp(1.25rem,3dvh,2rem)]">
                {t('about.subtitle')}
              </h2>
            </SectionReveal>

            {/* Divider */}
            <SectionReveal delay={0.2}>
              <div className="flex items-center gap-4 mb-[clamp(1.75rem,4.5dvh,2.75rem)]">
                <IconRule color="forest" />
                <PiFarmFill className="text-forest/55" size={24} />
                <IconRule color="forest" />
              </div>
            </SectionReveal>

            {/* Paragraph 1 */}
            <SectionReveal delay={0.3} className="mb-[clamp(1rem,2.5dvh,1.75rem)]">
              <p className="font-body text-[clamp(1.1875rem,0.95rem_+_1vw,1.5625rem)] text-dark/70 leading-relaxed text-pretty">
                <span aria-hidden="true" className="font-heading text-[2em] text-blueberry/25 select-none" style={{ lineHeight: 0, display: 'inline-block', verticalAlign: '-0.15em' }}>"</span>{' '}
                {t('about.description1')}
                <span
                  className="text-dark/90 font-medium"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(58,89,140,0.5), rgba(58,89,140,0.5))',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: inView ? '100% 2px' : '0% 2px',
                    backgroundPosition: 'bottom 3px left 0',
                    paddingBottom: '5px',
                    transition: inView ? 'background-size 0.8s cubic-bezier(0.42,0,0.58,1) 1.4s' : 'none',
                  }}
                >
                  {t('about.descriptionHighlight')}
                </span>
                {t('about.description2')}
              </p>
            </SectionReveal>

            {/* Paragraph 2 */}
            <SectionReveal delay={0.4}>
              <p className="font-body text-[clamp(1.1875rem,0.95rem_+_1vw,1.5625rem)] text-dark/70 leading-relaxed text-pretty">
                {t('about.description3')}
                <strong
                  className="font-semibold text-dark/90"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(58,89,140,0.5), rgba(58,89,140,0.5))',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: inView ? '100% 2px' : '0% 2px',
                    backgroundPosition: 'bottom 3px left 0',
                    paddingBottom: '5px',
                    transition: inView ? 'background-size 0.8s cubic-bezier(0.42,0,0.58,1) 2.0s' : 'none',
                  }}
                >
                  {t('about.description3Help')}
                </strong>
                {' '}<span aria-hidden="true" className="font-heading text-[2em] text-blueberry/25 select-none" style={{ lineHeight: 0, display: 'inline-block', verticalAlign: '-0.15em' }}>"</span>
              </p>
            </SectionReveal>

          </div>

          {/* ── Photo column ── */}
          <SectionReveal delay={0.35} className="flex-shrink-0">
            <div className="relative">

              {/* Decorative offset frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl border border-forest/25 translate-x-4 translate-y-4"
              />

              {/* Photo wrapper — hover zoom + click lightbox */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="group relative block w-[min(72vw,300px)] md:w-[300px] lg:w-[320px] xl:w-[380px] rounded-2xl overflow-hidden shadow-2xl -rotate-1 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                aria-label={t('about.photoCaption')}
              >
                <Image
                  src="/images/beginning.png"
                  alt={t('about.photoCaption')}
                  width={480}
                  height={640}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 72vw, (max-width: 1280px) 320px, 380px"
                />
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300 rounded-2xl" />
              </button>

              {/* Caption */}
              <p className="mt-4 text-center font-body text-base text-dark/55 italic tracking-wide">
                {t('about.photoCaption')}
              </p>

            </div>
          </SectionReveal>

        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-dark/92 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors duration-200 z-10"
              aria-label="Закрити"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASING.enter }}
              className="relative flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src="/images/beginning.png"
                alt={t('about.photoCaption')}
                width={480}
                height={640}
                className="max-h-[85dvh] w-auto rounded-xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <p className="mt-3 text-center font-body text-base text-cream/60 italic">
                {t('about.photoCaption')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
