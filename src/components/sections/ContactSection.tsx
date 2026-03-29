'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone, MapPin, X } from 'lucide-react';
import { PiHandshakeFill } from 'react-icons/pi';
import { FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { m, AnimatePresence, useInView } from 'framer-motion';

import SectionReveal from '@/components/ui/SectionReveal';
import { EyebrowDivider, IconRule } from '@/components/ui/SectionOrnaments';
import { EASING } from '@/lib/animations';
import storksImg from '../../../public/images/sections/contact-storks.jpg';

function StorkLightboxPhoto() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(false); }, []);

  const { width: iw, height: ih } = storksImg;

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-2xl"
      style={{
        width: `min(96vw, calc(90svh * ${iw / ih}))`,
        aspectRatio: `${iw} / ${ih}`,
        backgroundImage:    `url(${storksImg.blurDataURL})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
      }}
    >
      <Image
        src={storksImg}
        alt="Лелеки над карпатським полем"
        fill
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="96vw"
      />
    </div>
  );
}

const PHONES = [
  { display: '098 804 07 63', tel: '+380988040763' },
  { display: '099 200 10 89', tel: '+380992001089' },
  { display: '067 673 33 00', tel: '+380676733300' },
];

// ── Reusable contact item ──────────────────────────────────────────────────────
function ContactItem({
  href, icon, label, external = false, size = 'md',
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const iconSizes = { sm: 'w-8 h-8', md: 'w-9 h-9', lg: 'w-10 h-10' };
  const Tag = href ? 'a' : 'div';
  const props = href
    ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : {};

  return (
    <Tag
      {...props}
      className={`flex items-center gap-3 ${href ? 'group' : ''}`}
    >
      <div className={`${iconSizes[size]} rounded-full bg-forest/10 flex items-center justify-center shrink-0
                       ${href ? 'group-hover:bg-forest/20 transition-colors duration-200' : ''}`}>
        {icon}
      </div>
      <span className={`font-body text-[clamp(1rem,0.875rem_+_0.65vw,1.25rem)] ${href ? 'text-dark/80 group-hover:text-forest underline decoration-transparent group-hover:decoration-forest/40 underline-offset-2 transition-all duration-200' : 'text-dark/60'}`}>
        {label}
      </span>
    </Tag>
  );
}

// ── Location — two-line display ───────────────────────────────────────────────
function LocationItem({ line1, line2, size = 'md', oneLine = false }: { line1: string; line2: string; size?: 'sm' | 'md' | 'lg'; oneLine?: boolean }) {
  const iconSizes = { sm: 'w-8 h-8', md: 'w-9 h-9', lg: 'w-10 h-10' };
  return (
    <div className="flex items-center gap-3">
      <div className={`${iconSizes[size]} rounded-full bg-forest/10 flex items-center justify-center shrink-0`}>
        <MapPin size={size === 'lg' ? 17 : size === 'sm' ? 13 : 15} className="text-forest" />
      </div>
      <span className="font-body text-[clamp(1rem,0.875rem_+_0.65vw,1.25rem)] text-dark/80 leading-snug">
        {oneLine ? `${line1} ${line2}` : <>{line1}<br />{line2}</>}
      </span>
    </div>
  );
}

// ── Photo block ───────────────────────────────────────────────────────────────
function StorkPhoto({ onOpen, sizes }: { onOpen: () => void; sizes: string }) {
  return (
    <div className="relative">
      <div aria-hidden="true"
        className="absolute inset-0 rounded-2xl border border-forest/20 translate-x-3 translate-y-3" />
      <button
        onClick={onOpen}
        className="group relative block w-full rounded-2xl overflow-hidden shadow-2xl
                   cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        aria-label="Відкрити фото"
      >
        <Image
          src={storksImg}
          alt="Лелеки над карпатським полем"
          width={640} height={480}
          placeholder="blur"
          className="w-full h-auto lg:h-[clamp(16rem,36dvh,24rem)] object-cover transition-transform duration-700 ease-out
                     group-hover:scale-[1.04]"
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/8
                        transition-colors duration-300 rounded-2xl" />
      </button>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const t = useTranslations('contact');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-cream overflow-hidden min-h-[100dvh] flex flex-col justify-center
                 py-[clamp(4rem,8dvh,7rem)]"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Centered header ── */}
        <div className="flex flex-col items-center text-center mb-[clamp(1.25rem,2.5dvh,2rem)]">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-[clamp(0.75rem,2dvh,1.25rem)]">
              <EyebrowDivider src="/images/ornaments/contact-ornament.svg" />
              <span className="font-body text-base uppercase tracking-[0.28em] pl-[0.28em] text-forest font-semibold">
                {t('title')}
              </span>
              <EyebrowDivider src="/images/ornaments/contact-ornament.svg" flip />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-heading text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] text-dark
                           leading-tight mb-[clamp(1.25rem,3dvh,2rem)]">
              {t('subtitle')}
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="flex items-center gap-4">
              <IconRule color="forest" />
              <PiHandshakeFill className="text-forest/55" size={24} />
              <IconRule color="forest" />
            </div>
          </SectionReveal>
        </div>

        {/* ── Invite text — centered, About-style with щиро highlight ── */}
        <SectionReveal delay={0.25} className="mb-[clamp(1.5rem,3dvh,2.5rem)]">
          <p className="font-body text-[clamp(1.1875rem,0.95rem_+_1vw,1.5625rem)]
                        text-dark/70 leading-relaxed text-pretty text-center max-w-2xl mx-auto">
            <span aria-hidden="true"
              className="font-heading text-[2em] text-blueberry/25 select-none"
              style={{ lineHeight: 0, display: 'inline-block', verticalAlign: '-0.15em' }}>
              "
            </span>{' '}
            {t('inviteStart')}{' '}
            <span className="whitespace-nowrap">
              <span
                className="font-semibold text-dark/90"
                style={{
                  backgroundImage: 'linear-gradient(color-mix(in srgb, var(--color-berry) 90%, transparent), color-mix(in srgb, var(--color-berry) 75%, transparent))',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: inView ? '100% 2px' : '0% 2px',
                  backgroundPosition: 'bottom 3px left 0',
                  paddingBottom: '5px',
                  transition: inView ? 'background-size 0.8s cubic-bezier(0.42,0,0.58,1) 1.4s' : 'none',
                }}
              >
                {t('invitePhrase')}
              </span>
              .
            </span>{' '}
            <span aria-hidden="true"
              className="font-heading text-[2em] text-blueberry/25 select-none"
              style={{ lineHeight: 0, display: 'inline-block', verticalAlign: '-0.15em' }}>
              "
            </span>
          </p>
        </SectionReveal>

        {/* ══ DESKTOP (lg+): photo left | contacts right ══ */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">

          {/* Photo */}
          <SectionReveal delay={0.3} className="flex justify-end">
            <div className="w-full max-w-[480px]">
              <StorkPhoto onOpen={() => setLightboxOpen(true)} sizes="(min-width: 1280px) 480px, 45vw" />
            </div>
          </SectionReveal>

          {/* Contacts */}
          <SectionReveal delay={0.4}>
            <div className="flex flex-col gap-5">
              {/* Phones + Social — side by side */}
              <div className="grid grid-cols-2 gap-x-16 gap-y-5">
                {/* Phones */}
                <div className="flex flex-col gap-3">
                  <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20">{t('phone')}</span>
                  {PHONES.map(({ display, tel }) => (
                    <ContactItem key={tel} href={`tel:${tel}`} size="lg"
                      icon={<Phone size={17} className="text-forest" />} label={display} />
                  ))}
                </div>
                {/* Social */}
                <div className="flex flex-col gap-3">
                  <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20">{t('social')}</span>
                  <ContactItem href="https://www.instagram.com/jagoda_karpat/" external size="lg"
                    icon={<FaInstagram size={18} className="text-forest" />} label="Instagram" />
                  <ContactItem href="https://www.tiktok.com/@agrorik" external size="lg"
                    icon={<SiTiktok size={16} className="text-forest" />} label="TikTok" />
                </div>
              </div>
              {/* Location — full width below */}
              <div className="flex flex-col items-center gap-3 pt-1">
                <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20 w-full text-center">{t('location')}</span>
                <LocationItem line1={t('locationLine1')} line2={t('locationLine2')} size="lg" oneLine />
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* ══ SMALL PHONE LANDSCAPE (sm–md, 640–767px): 2-col phones|social + location below ══ */}
        <div className="hidden sm:flex md:hidden flex-col gap-[clamp(1.5rem,3dvh,2.5rem)]">
          {/* 2 columns: phones | social */}
          <SectionReveal delay={0.3}>
            <div className="grid grid-cols-[1fr_1px_1fr] gap-x-8 items-start max-w-lg mx-auto w-full">
              {/* Phones */}
              <div className="flex flex-col items-start gap-3">
                <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20">{t('phone')}</span>
                {PHONES.map(({ display, tel }) => (
                  <ContactItem key={tel} href={`tel:${tel}`} size="md"
                    icon={<Phone size={15} className="text-forest" />} label={display} />
                ))}
              </div>
              {/* Divider */}
              <div className="bg-forest/15 self-stretch" />
              {/* Social */}
              <div className="flex flex-col items-start gap-3">
                <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20">{t('social')}</span>
                <ContactItem href="https://www.instagram.com/jagoda_karpat/" external size="md"
                  icon={<FaInstagram size={16} className="text-forest" />} label="Instagram" />
                <ContactItem href="https://www.tiktok.com/@agrorik" external size="md"
                  icon={<SiTiktok size={14} className="text-forest" />} label="TikTok" />
              </div>
            </div>
          </SectionReveal>
          {/* Location — full width, centered, one line */}
          <SectionReveal delay={0.35}>
            <div className="flex flex-col items-center gap-3">
              <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20 text-center w-full max-w-xs">{t('location')}</span>
              <LocationItem line1={t('locationLine1')} line2={t('locationLine2')} size="md" oneLine />
            </div>
          </SectionReveal>
          {/* Photo */}
          <SectionReveal delay={0.4} className="max-w-xl mx-auto">
            <StorkPhoto onOpen={() => setLightboxOpen(true)} sizes="80vw" />
          </SectionReveal>
        </div>

        {/* ══ TABLET + LARGER PHONE LANDSCAPE (md–lg, 768–1023px): 3-col cascade ══ */}
        <div className="hidden md:flex md:flex-col lg:hidden gap-[clamp(1.5rem,3dvh,2.5rem)]">
          {/* 3 columns: phones | social | location — descending cascade */}
          <SectionReveal delay={0.3}>
            <div className="grid grid-cols-[1fr_1px_1fr_1px_1fr] gap-x-8 items-start">
              {/* Phones */}
              <div className="flex flex-col items-start gap-3">
                <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20">{t('phone')}</span>
                {PHONES.map(({ display, tel }) => (
                  <ContactItem key={tel} href={`tel:${tel}`} size="md"
                    icon={<Phone size={15} className="text-forest" />} label={display} />
                ))}
              </div>
              {/* Divider */}
              <div className="bg-forest/15 self-stretch" />
              {/* Social */}
              <div className="flex flex-col items-start gap-3">
                <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20">{t('social')}</span>
                <ContactItem href="https://www.instagram.com/jagoda_karpat/" external size="md"
                  icon={<FaInstagram size={16} className="text-forest" />} label="Instagram" />
                <ContactItem href="https://www.tiktok.com/@agrorik" external size="md"
                  icon={<SiTiktok size={14} className="text-forest" />} label="TikTok" />
              </div>
              {/* Divider */}
              <div className="bg-forest/15 self-stretch" />
              {/* Location — centered */}
              <div className="flex flex-col items-center gap-3">
                <span className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20 text-center">{t('location')}</span>
                <LocationItem line1={t('locationLine1')} line2={t('locationLine2')} size="md" />
              </div>
            </div>
          </SectionReveal>
          {/* Photo centered */}
          <SectionReveal delay={0.4} className="max-w-xl mx-auto">
            <StorkPhoto onOpen={() => setLightboxOpen(true)} sizes="(max-width: 1024px) 80vw, 576px" />
          </SectionReveal>
        </div>

        {/* ══ PHONE PORTRAIT (< sm): [phones|social] + location + photo ══ */}
        <div className="flex flex-col gap-6 sm:hidden">
          <SectionReveal delay={0.3}>
            {/* ≥380px: side by side; <380px: stacked to avoid overflow */}
            <div className="grid grid-cols-1 gap-y-4 [@media_(min-width:380px)]:grid-cols-[1fr_1px_1fr] [@media_(min-width:380px)]:gap-y-0 [@media_(min-width:380px)]:gap-x-6 items-start">
              {/* Phones */}
              <div className="flex flex-col items-start gap-3">
                <span className="font-heading text-[clamp(1.25rem,1rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20 w-full">{t('phone')}</span>
                {PHONES.map(({ display, tel }) => (
                  <ContactItem key={tel} href={`tel:${tel}`} size="sm"
                    icon={<Phone size={13} className="text-forest" />} label={display} />
                ))}
              </div>
              {/* Divider — hidden when stacked */}
              <div className="hidden [@media_(min-width:380px)]:block bg-forest/15 self-stretch" />
              {/* Social */}
              <div className="flex flex-col items-start gap-3">
                <span className="font-heading text-[clamp(1.25rem,1rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20 w-full">{t('social')}</span>
                <ContactItem href="https://www.instagram.com/jagoda_karpat/" external size="sm"
                  icon={<FaInstagram size={14} className="text-forest" />} label="Instagram" />
                <ContactItem href="https://www.tiktok.com/@agrorik" external size="sm"
                  icon={<SiTiktok size={12} className="text-forest" />} label="TikTok" />
              </div>
            </div>
          </SectionReveal>
          {/* Location — heading + item, left-aligned like phones/social */}
          <SectionReveal delay={0.35}>
            <div className="flex flex-col items-start gap-3">
              <span className="font-heading text-[clamp(1.25rem,1rem_+_1.75vw,2rem)] text-dark leading-tight pb-1.5 border-b border-forest/20 w-full">{t('location')}</span>
              <LocationItem line1={t('locationLine1')} line2={t('locationLine2')} size="sm" oneLine />
            </div>
          </SectionReveal>
          {/* Photo */}
          <SectionReveal delay={0.4}>
            <StorkPhoto onOpen={() => setLightboxOpen(true)} sizes="100vw" />
          </SectionReveal>
        </div>

      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <m.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-dark/92 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxOpen(false)}
          >
            <button onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors duration-200 z-10"
              aria-label="Закрити"
            >
              <X size={32} />
            </button>
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              transition={{ duration: 0.2, ease: EASING.enter }}
              onClick={e => e.stopPropagation()}
            >
              <StorkLightboxPhoto />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
