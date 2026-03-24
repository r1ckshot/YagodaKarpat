'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Shovel, Sprout, Droplets, FlaskConical, Hand } from 'lucide-react';
import { GiFarmTractor } from 'react-icons/gi';

import SectionReveal from '@/components/ui/SectionReveal';
import { EyebrowDivider, IconRule } from '@/components/ui/SectionOrnaments';
import { EASING } from '@/lib/animations';

type LucideIcon = typeof Shovel;

const STEPS: { key: string; Icon: LucideIcon }[] = [
  { key: 'soil',     Icon: Shovel       },
  { key: 'planting', Icon: Sprout       },
  { key: 'care',     Icon: Droplets     },
  { key: 'feeding',  Icon: FlaskConical },
  { key: 'harvest',  Icon: Hand         },
];

interface StepData {
  key:         string;
  Icon:        LucideIcon;
  title:       string;
  description: string;
}

// ── Desktop animation: circle[i] → path[i] → circle[i+1] → ... ────────────────
const BASE_DELAY  = 0.3;
const CIRCLE_DUR  = 0.5;
const PATH_DUR    = 0.8;
const circleDelay = (i: number) => BASE_DELAY + i * (CIRCLE_DUR + PATH_DUR);
const pathDelay   = (i: number) => circleDelay(i) + CIRCLE_DUR;

// ── Wavy W-path SVG ──────────────────────────────────────────────────────────
// Container: h-[28rem] = 448px  →  viewBox "0 0 1000 448"
// All circles: w-16 h-16 (64px), radius = 32px
// Top circles (i=0,2,4): center y = TOP_Y = 32 (right at container top)
// Bottom circles (i=1,3): center y = BOT_Y = 200
//   → paddingTop = BOT_Y − 32 = 168px so circle sits exactly at y=200
//   → text ALWAYS below circle
const TOP_Y   = 32;
const BOT_Y   = 200;
const BOT_PAD = BOT_Y - TOP_Y; // 168px

const SVG_SEGMENTS = [
  `M 100,${TOP_Y} C 200,${TOP_Y} 200,${BOT_Y} 300,${BOT_Y}`,
  `M 300,${BOT_Y} C 400,${BOT_Y} 400,${TOP_Y} 500,${TOP_Y}`,
  `M 500,${TOP_Y} C 600,${TOP_Y} 600,${BOT_Y} 700,${BOT_Y}`,
  `M 700,${BOT_Y} C 800,${BOT_Y} 800,${TOP_Y} 900,${TOP_Y}`,
];

// ── Step content block ────────────────────────────────────────────────────────
function StepContent({ step, index }: { step: StepData; index: number }) {
  return (
    <div className="text-center px-1">
      {/* Large decorative number — text-3xl like Stripe / Linear */}
      <span className="font-heading text-3xl text-forest/35 mb-1 block leading-none">
        0{index + 1}
      </span>
      <h3 className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight mb-2">
        {step.title}
      </h3>
      <p className="font-body text-[clamp(1.125rem,1rem_+_0.75vw,1.375rem)] text-dark/60 leading-relaxed text-pretty">
        {step.description}
      </p>
    </div>
  );
}

// ── Desktop xl+: wavy W-layout ────────────────────────────────────────────────
function DesktopTimeline({ steps }: { steps: StepData[] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative grid grid-cols-5 h-[28rem]">

      {/* Wavy W SVG — 4 segments drawn sequentially */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 448"
        preserveAspectRatio="none"
      >
        {SVG_SEGMENTS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(0,133,73,0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: PATH_DUR, delay: pathDelay(i), ease: EASING.enter }}
          />
        ))}
      </svg>

      {steps.map((step, i) => {
        const isTop = i % 2 === 0;
        return (
          <div
            key={step.key}
            className="flex flex-col items-center justify-start px-2"
            style={!isTop ? { paddingTop: `${BOT_PAD}px` } : undefined}
          >
            {/* Circle */}
            <motion.div
              className="w-16 h-16 rounded-full bg-cream border-2 border-forest/45 flex items-center justify-center z-10 flex-none"
              style={{ boxShadow: '0 2px 14px rgba(0,133,73,0.13)' }}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: CIRCLE_DUR, delay: circleDelay(i), ease: EASING.bounce }}
            >
              <step.Icon size={28} className="text-forest" />
            </motion.div>

            {/* Content always below circle */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: circleDelay(i) + 0.1, ease: EASING.enter }}
            >
              <StepContent step={step} index={i} />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// ── Mobile step: own useInView — threshold 0.3 (professional standard for mobile)
function MobileStep({ step, index, isLast }: { step: StepData; index: number; isLast: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="flex gap-5 items-stretch">

      {/* Left: circle + connector — no mt to avoid white gap at scaleY:0 */}
      <div className="flex flex-col items-center flex-none w-12">
        <motion.div
          className="w-12 h-12 rounded-full bg-cream border-2 border-forest/40 flex items-center justify-center flex-none"
          style={{ boxShadow: '0 2px 8px rgba(0,133,73,0.10)' }}
          initial={{ opacity: 0, scale: 0.55 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, ease: EASING.bounce }}
        >
          <step.Icon size={22} className="text-forest" />
        </motion.div>

        {!isLast && (
          <motion.div
            className="flex-1 w-px bg-forest/25"
            style={{ minHeight: '2.5rem' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: EASING.enter }}
          />
        )}
      </div>

      {/* Right: content */}
      <motion.div
        className={['flex-1 pt-1', !isLast ? 'pb-10' : ''].join(' ')}
        initial={{ opacity: 0, x: 14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.12, ease: EASING.enter }}
      >
        {/* text-2xl on mobile — decorative but not overwhelming */}
        <span className="font-heading text-2xl text-forest/35 mb-1 block leading-none">
          0{index + 1}
        </span>
        <h3 className="font-heading text-[clamp(1.625rem,1.25rem_+_1.75vw,2rem)] text-dark leading-tight mb-2">
          {step.title}
        </h3>
        <p className="font-body text-[clamp(1.125rem,1rem_+_0.75vw,1.375rem)] text-dark/60 leading-relaxed text-pretty">
          {step.description}
        </p>
      </motion.div>

    </div>
  );
}

// ── Mobile / tablet <xl: vertical timeline ────────────────────────────────────
function MobileTimeline({ steps }: { steps: StepData[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <MobileStep
          key={step.key}
          step={step}
          index={i}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function ProcessSection() {
  const t = useTranslations('process');

  const steps: StepData[] = STEPS.map(({ key, Icon }) => ({
    key,
    Icon,
    title:       t(`steps.${key}.title`),
    description: t(`steps.${key}.description`),
  }));

  return (
    <section
      id="process"
      className="relative bg-cream overflow-hidden min-h-[100dvh] flex flex-col justify-center py-[clamp(5rem,8dvh,7rem)]"
    >
      <div className="relative max-w-6xl mx-auto px-6 w-full">

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-[clamp(2.5rem,5dvh,4rem)]">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-[clamp(0.75rem,2dvh,1.25rem)]">
              <EyebrowDivider src="/images/process-divider.svg" large />
              <span className="font-body text-base uppercase tracking-[0.28em] pl-[0.28em] text-forest font-semibold">
                {t('title')}
              </span>
              <EyebrowDivider src="/images/process-divider.svg" large flip />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-heading text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] text-dark leading-tight mb-[clamp(1.25rem,3dvh,2rem)]">
              {t('subtitle')}
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="flex items-center gap-4">
              <IconRule color="forest" />
              <GiFarmTractor className="text-forest/55" size={24} />
              <IconRule color="forest" />
            </div>
          </SectionReveal>
        </div>

        {/* Desktop (xl+): wavy W-layout */}
        <div className="hidden xl:block">
          <DesktopTimeline steps={steps} />
        </div>

        {/* Mobile + tablet (<xl): vertical timeline */}
        <div className="xl:hidden">
          <MobileTimeline steps={steps} />
        </div>

      </div>
    </section>
  );
}
