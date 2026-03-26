'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GiBerriesBowl } from 'react-icons/gi';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionReveal from '@/components/ui/SectionReveal';
import { EyebrowDivider, IconRule } from '@/components/ui/SectionOrnaments';

const VARIETIES = [
  { key: 'duke',     image: '/images/varieties/duke.jpg'     },
  { key: 'chandler', image: '/images/varieties/chandler.jpg' },
  { key: 'elliott',  image: '/images/varieties/elliott.jpg'  },
] as const;

const CARD_DELAYS = [0.3, 0.45, 0.6] as const;

interface CardData {
  key: string;
  image: string;
  name: string;
  period: string;
  description: string;
}

function VarietyCard({ card }: { card: CardData }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-cream/[0.08] hover:border-cream/[0.18] transition-colors duration-300">

      {/* Image + overlays */}
      <div className="relative aspect-[4/5] xl:aspect-auto xl:h-[clamp(22rem,48dvh,32rem)] overflow-hidden">
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 82vw, 33vw"
        />

        {/* Season badge */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-dark/65 backdrop-blur-sm border border-cream/20">
          <span className="font-body text-sm font-semibold text-cream tracking-wide">
            {card.period}
          </span>
        </div>

        {/* Desktop only (≥1024px): bottom gradient + always-visible name */}
        <div className="hidden xl:block absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent pointer-events-none" />
        <div className="hidden xl:block absolute bottom-0 inset-x-0 px-5 pb-4 pointer-events-none">
          <h3 className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-cream leading-tight">
            {card.name}
          </h3>
        </div>

        {/* Desktop only (≥1024px): hover description panel — slides up from bottom */}
        <div className="hidden xl:block absolute inset-x-0 bottom-0 bg-dark/85 backdrop-blur-sm px-5 pt-4 pb-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <h3 className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-cream leading-tight mb-3">
            {card.name}
          </h3>
          <p className="font-body text-[clamp(1.0625rem,0.9375rem_+_0.625vw,1.1875rem)] text-cream/80 leading-relaxed text-pretty">
            {card.description}
          </p>
        </div>
      </div>

      {/* Mobile + tablet (<1024px): text below image */}
      <div className="xl:hidden bg-white/[0.04] px-5 py-5 [@media_(orientation:landscape)_and_(max-height:380px)]:px-3 [@media_(orientation:landscape)_and_(max-height:380px)]:py-2">
        <h3 className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-cream leading-tight mb-3 [@media_(orientation:landscape)_and_(max-height:380px)]:mb-1 [@media_(orientation:landscape)_and_(max-height:380px)]:text-lg">
          {card.name}
        </h3>
        <p className="font-body text-[clamp(1.125rem,1rem_+_0.75vw,1.375rem)] text-cream/55 leading-relaxed text-pretty [@media_(orientation:landscape)_and_(max-height:380px)]:text-xs [@media_(orientation:landscape)_and_(max-height:380px)]:leading-snug">
          {card.description}
        </p>
      </div>

    </div>
  );
}

// Mobile carousel — centered snap with arrows and dots
function MobileCarousel({ title, subtitle, cards }: { title: string; subtitle: string; cards: CardData[] }) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= cards.length) return;
    const el = scrollRef.current?.children[idx] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActive(idx);
  };

  // Detect active card by finding which card center is closest to the scroll viewport center
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActive(closest);
  };

  return (
    <div className="py-[clamp(4rem,8dvh,7rem)] [@media_(orientation:landscape)_and_(max-height:380px)]:py-3">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8 px-6">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-[clamp(0.75rem,2dvh,1.25rem)]">
            <EyebrowDivider src="/images/ornaments/varieties-ornament.svg" />
            <span className="font-body text-base uppercase tracking-[0.28em] pl-[0.28em] text-berry/80 font-semibold">
              {title}
            </span>
            <EyebrowDivider src="/images/ornaments/varieties-ornament.svg" flip />
          </div>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="font-heading text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] text-cream leading-tight mb-[clamp(1rem,2.5dvh,1.5rem)]">
            {subtitle}
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <div className="flex items-center gap-4">
            <IconRule color="berry" />
            <GiBerriesBowl className="text-berry/65" size={24} />
            <IconRule color="berry" />
          </div>
        </SectionReveal>
      </div>

      {/* Carousel */}
      <SectionReveal delay={0.3}>
        <div className="relative">
          {/* Scroll track — cards centered via snap-center + first/last margins */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card, i) => (
              <div
                key={card.key}
                className={[
                  'snap-center flex-none w-[78vw]',
                  i === 0 ? 'ml-[11vw]' : '',
                  i === cards.length - 1 ? 'mr-[11vw]' : '',
                ].join(' ')}
              >
                <VarietyCard card={card} />
              </div>
            ))}
          </div>

          {/* Left arrow — hidden on first card */}
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Попередній сорт"
            className={[
              'absolute left-2 top-[33%] -translate-y-1/2 z-10',
              'w-11 h-11 rounded-full bg-dark/80 backdrop-blur-sm border border-cream/25',
              'flex items-center justify-center text-cream/85 hover:text-cream hover:bg-dark/95',
              'transition-all duration-200',
              active === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100',
            ].join(' ')}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right arrow — hidden on last card */}
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Наступний сорт"
            className={[
              'absolute right-2 top-[33%] -translate-y-1/2 z-10',
              'w-11 h-11 rounded-full bg-dark/80 backdrop-blur-sm border border-cream/25',
              'flex items-center justify-center text-cream/85 hover:text-cream hover:bg-dark/95',
              'transition-all duration-200',
              active === cards.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100',
            ].join(' ')}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </SectionReveal>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Сорт ${i + 1}`}
            className={[
              'rounded-full transition-all duration-300',
              i === active
                ? 'w-5 h-[6px] bg-cream/70'
                : 'w-[6px] h-[6px] bg-cream/25 hover:bg-cream/40',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}

export default function VarietiesSection() {
  const t = useTranslations('varieties');

  const cards: CardData[] = VARIETIES.map(({ key, image }) => ({
    key,
    image,
    name:        t(`${key}.name`),
    period:      t(`${key}.period`),
    description: t(`${key}.description`),
  }));

  return (
    <section
      id="varieties"
      className="relative bg-dark min-h-[100dvh]"
    >
      {/* Mobile portrait: centered carousel with arrows + dots */}
      <div className="md:hidden [@media_(orientation:landscape)_and_(max-height:380px)]:hidden">
        <MobileCarousel title={t('title')} subtitle={t('subtitle')} cards={cards} />
      </div>

      {/* Tablet + desktop + landscape phone: centred header + 3-column grid */}
      <div className="hidden md:flex [@media_(orientation:landscape)_and_(max-height:380px)]:flex flex-col justify-center min-h-[100dvh] py-[clamp(4rem,8dvh,7rem)]">
        <div className="relative max-w-6xl mx-auto px-6 w-full">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-[clamp(2.5rem,6dvh,4rem)]">
            <SectionReveal>
              <div className="flex items-center gap-4 mb-[clamp(0.75rem,2dvh,1.25rem)]">
                <EyebrowDivider src="/images/ornaments/varieties-ornament.svg" />
                <span className="font-body text-base uppercase tracking-[0.28em] pl-[0.28em] text-berry/80 font-semibold">
                  {t('title')}
                </span>
                <EyebrowDivider src="/images/ornaments/varieties-ornament.svg" flip />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-heading text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] text-cream leading-tight mb-[clamp(1.25rem,3dvh,2rem)]">
                {t('subtitle')}
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="flex items-center gap-4">
                <IconRule color="berry" />
                <GiBerriesBowl className="text-berry/65" size={24} />
                <IconRule color="berry" />
              </div>
            </SectionReveal>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 [@media_(orientation:landscape)_and_(max-height:380px)]:grid-cols-3 gap-6 lg:gap-8 [@media_(orientation:landscape)_and_(max-height:380px)]:gap-3">
            {cards.map((card, i) => (
              <SectionReveal key={card.key} delay={CARD_DELAYS[i]}>
                <VarietyCard card={card} />
              </SectionReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
