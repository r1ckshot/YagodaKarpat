'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BsFillCameraFill } from 'react-icons/bs';

import SectionReveal from '@/components/ui/SectionReveal';
import { EyebrowDivider, IconRule } from '@/components/ui/SectionOrnaments';
import { EASING } from '@/lib/animations';
import { type StaticImageData } from 'next/image';

import blueberryCollageImg  from '../../../public/images/gallery/blueberry-collage.webp';
import blueberryBloomingImg from '../../../public/images/gallery/blueberry-blooming.webp';
import kidGatheringImg      from '../../../public/images/gallery/kid-gathering.webp';
import blueberryAutumnImg   from '../../../public/images/gallery/blueberry-autumn.webp';
import beginningCollageImg  from '../../../public/images/gallery/beginning-collage.webp';

// ── Photos ─────────────────────────────────────────────────────────────────────
const PHOTOS: { src: StaticImageData; alt: string }[] = [
  { src: blueberryCollageImg,  alt: 'Спіла лохина — колаж'           },
  { src: blueberryBloomingImg, alt: 'Цвітіння лохини навесні'        },
  { src: kidGatheringImg,      alt: 'Дитина збирає ягоди'            },
  { src: blueberryAutumnImg,   alt: 'Поле лохини восени'             },
  { src: beginningCollageImg,  alt: 'Початок — висадка перших кущів' },
];

// ── Desktop: fan / card-pyramid spread ────────────────────────────────────────
//
//  5 cards fanned like a poker hand held up to the light.
//  Centre card (idx 2): 0° rotation, highest z — clearly "on top".
//  Adjacent pairs tilt ±5° / ±10°, stepping 10 rem apart.
//
//  WHY Framer Motion for ALL transforms (x, rotate) and not style.transform:
//  When whileHover adds y/scale it would REPLACE a CSS style.transform entirely,
//  causing cards to jump to wrong positions. FM motion values compose correctly:
//  final transform = translateX(x) translateY(y) scale() rotate()
//
const CARD_W   = '20rem';
const CARD_H   = '27rem';
const STEP_REM = 14;   // step ≈ 70% of card width for natural fan spread
const HOVER_Z  = 20;

// Horizontal offset: left: 50% + translateX(calc(-50% + stepMult * STEP_REM rem))
// → element is centred at (container 50% + stepMult * STEP_REM rem)
const FAN_ITEMS = [
  { photoIdx: 0, stepMult: -2, rotateDeg: -10, baseZ: 1  },
  { photoIdx: 1, stepMult: -1, rotateDeg:  -5, baseZ: 3  },
  { photoIdx: 2, stepMult:  0, rotateDeg:   0, baseZ: 10 },
  { photoIdx: 3, stepMult:  1, rotateDeg:   5, baseZ: 3  },
  { photoIdx: 4, stepMult:  2, rotateDeg:  10, baseZ: 1  },
] as const;

// Asymmetric timing: fast hover-in (200ms), slower hover-out (350ms)
// boxShadow lives here (not in animate) so hover doesn't re-evaluate animate for all 5 cards
const cardHoverVariants = {
  rest:  { y: 0,   scale: 1,    boxShadow: '0  8px 40px 2px rgba(248,245,240,0.18)', transition: { duration: 0.35, ease: [0.4, 0, 1,   1] as const } },
  hover: { y: -14, scale: 1.03, boxShadow: '0 20px 64px 6px rgba(248,245,240,0.40)', transition: { duration: 0.2,  ease: [0,   0, 0.2, 1] as const } },
};

function FanGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative overflow-visible" style={{ height: CARD_H }}>
      {FAN_ITEMS.map(({ photoIdx, stepMult, rotateDeg, baseZ }) => {
        const isHov = hovered === photoIdx;
        const offsetX = `calc(-50% + ${stepMult * STEP_REM}rem)`;

        return (
          <m.button
            key={photoIdx}
            onClick={() => onOpen(photoIdx)}
            onHoverStart={() => setHovered(photoIdx)}
            onHoverEnd={() => setHovered(null)}
            className="group absolute overflow-hidden rounded-2xl cursor-zoom-in
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/60"
            style={{
              width:  CARD_W,
              height: CARD_H,
              left:   '50%',
              top:    0,
              zIndex: isHov ? HOVER_Z : baseZ,
            }}
            // x + rotate set once on mount; y + scale + boxShadow handled by variant
            initial={false}
            animate={{ x: offsetX, rotate: rotateDeg }}
            variants={cardHoverVariants}
            whileHover="hover"
            aria-label={PHOTOS[photoIdx].alt}
          >
            <Image
              src={PHOTOS[photoIdx].src}
              alt={PHOTOS[photoIdx].alt}
              fill
              placeholder="blur"
              className="object-cover transition-transform duration-700 ease-out
                         group-hover:scale-[1.04]"
              sizes="(min-width: 1024px) 20vw"
            />
            {/* subtle dark tint on hover */}
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/8
                            transition-colors duration-300 rounded-2xl" />
          </m.button>
        );
      })}
    </div>
  );
}

// ── Mobile: book-flip card + always-visible side arrows + counter ─────────────
//
//  • Arrows always on image sides, always visible — no opacity-0 at boundaries
//  • Infinite loop: last → first, first → last
//  • Counter "2 з 5" below for users who may not notice dots
//  • Book-flip: rotateY with full perspective — direction determines which side
//
// Rotate 65° (not 90°) so the flip reads as page-turn without becoming invisible
const bookVariants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 65 : -65,
    opacity: 0,
    scale:   0.92,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale:   1,
    transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -65 : 65,
    opacity: 0,
    scale:   0.92,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  }),
};

function MobileGallery({
  active, direction, onPrev, onNext, onOpen,
}: {
  active: number; direction: number;
  onPrev: () => void; onNext: () => void;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4">

      {/* Card + side arrows — arrows always visible, infinite loop */}
      <div className="relative w-full" style={{ perspective: 1200 }}>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <m.button
            key={active}
            custom={direction}
            variants={bookVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden
                       cursor-zoom-in focus:outline-none block"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => onOpen(active)}
            aria-label={PHOTOS[active].alt}
          >
            <Image src={PHOTOS[active].src} alt={PHOTOS[active].alt} fill
              placeholder="blur" className="object-cover" sizes="90vw" />
          </m.button>
        </AnimatePresence>

        {/* Side arrows — always visible, always tappable (infinite loop) */}
        <button
          onClick={onPrev}
          aria-label="Попереднє фото"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 rounded-full bg-dark/70 backdrop-blur-sm border border-cream/20
                     flex items-center justify-center text-cream/80
                     active:scale-95 transition-transform duration-150"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onNext}
          aria-label="Наступне фото"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 rounded-full bg-dark/70 backdrop-blur-sm border border-cream/20
                     flex items-center justify-center text-cream/80
                     active:scale-95 transition-transform duration-150"
        >
          <ChevronRight size={24} />
        </button>

      </div>

      {/* Counter + dots — sized like step numbers in ProcessSection */}
      <div className="flex flex-col items-center gap-3">
        {/* Current number large, total smaller — like "01 / 05" in editorial design */}
        <div className="flex items-baseline gap-1.5">
          <span className="font-heading text-3xl leading-none text-cream/60">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="font-body text-base text-cream/30">/</span>
          <span className="font-heading text-xl leading-none text-cream/30">
            {String(PHOTOS.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center gap-[6px]">
          {Array.from({ length: PHOTOS.length }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-5 h-[5px] bg-cream/65'
                  : 'w-[5px] h-[5px] bg-cream/25'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Lightbox ───────────────────────────────────────────────────────────────────
function LightboxImage({ idx }: { idx: number }) {
  const [loaded, setLoaded] = useState(false);
  const photo = PHOTOS[idx];

  useEffect(() => { setLoaded(false); }, [idx]);

  const { width: iw, height: ih } = photo.src;

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-2xl"
      style={{
        width: `min(96vw, calc(90svh * ${iw / ih}))`,
        aspectRatio: `${iw} / ${ih}`,
        backgroundImage:    `url(${photo.src.blurDataURL})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="96vw"
      />
    </div>
  );
}

function Lightbox({ idx, onClose, onPrev, onNext }: {
  idx: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <m.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-dark/92 flex items-center justify-center
                 p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-4 right-4 text-cream/70 hover:text-cream
                   transition-colors duration-200 z-10"
        aria-label="Закрити"
      >
        <X size={32} />
      </button>

      {/* key={idx} remounts with fade on every photo change */}
      <m.div
        key={idx}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        transition={{ duration: 0.2, ease: EASING.enter }}
        onClick={e => e.stopPropagation()}
      >
        <LightboxImage idx={idx} />
      </m.div>

      {idx > 0 && (
        <button onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
                     bg-dark/65 backdrop-blur-sm border border-cream/20
                     flex items-center justify-center text-cream/75
                     hover:text-cream hover:bg-dark/85 transition-colors"
          aria-label="Попереднє фото"
        ><ChevronLeft size={22} /></button>
      )}
      {idx < PHOTOS.length - 1 && (
        <button onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
                     bg-dark/65 backdrop-blur-sm border border-cream/20
                     flex items-center justify-center text-cream/75
                     hover:text-cream hover:bg-dark/85 transition-colors"
          aria-label="Наступне фото"
        ><ChevronRight size={22} /></button>
      )}
    </m.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function GallerySection() {
  const t = useTranslations('gallery');
  const [active,      setActive]      = useState(0);
  const [direction,   setDirection]   = useState(1);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Infinite loop — last photo wraps to first and vice versa
  const goNext = useCallback(() => { setDirection(1);  setActive(a => (a + 1) % PHOTOS.length); }, []);
  const goPrev = useCallback(() => { setDirection(-1); setActive(a => (a - 1 + PHOTOS.length) % PHOTOS.length); }, []);
  const lbPrev = useCallback(() => setLightboxIdx(i => (i !== null && i > 0) ? i - 1 : i), []);
  const lbNext = useCallback(() => setLightboxIdx(i => (i !== null && i < PHOTOS.length - 1) ? i + 1 : i), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx !== null) {
        if (e.key === 'ArrowRight') lbNext();
        if (e.key === 'ArrowLeft')  lbPrev();
        if (e.key === 'Escape')     setLightboxIdx(null);
      } else {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft')  goPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, lbNext, lbPrev, lightboxIdx]);

  return (
    <section
      id="gallery"
      className="relative bg-dark min-h-[100dvh] flex flex-col justify-center [overflow-x:clip]
                 py-[clamp(4rem,8dvh,7rem)]
                 [@media_(orientation:landscape)_and_(min-height:501px)_and_(max-width:1023px)]:py-[clamp(2rem,4dvh,3rem)]"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-[clamp(3.5rem,7dvh,5rem)]
                        [@media_(orientation:landscape)_and_(max-height:500px)]:mb-[clamp(2rem,4dvh,3rem)]
                        [@media_(orientation:landscape)_and_(min-height:501px)_and_(max-width:1023px)]:mb-[clamp(1.5rem,3dvh,2.5rem)]
                        [@media_(orientation:landscape)_and_(max-height:380px)]:mb-2">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-[clamp(0.75rem,2dvh,1.25rem)] [@media_(orientation:landscape)_and_(max-height:380px)]:mb-1">
              <EyebrowDivider src="/images/ornaments/gallery-ornament.svg" flip objectPosition="left" />
              <span className="font-body text-base uppercase tracking-[0.28em] pl-[0.28em] text-berry/80 font-semibold">
                {t('title')}
              </span>
              <EyebrowDivider src="/images/ornaments/gallery-ornament.svg" objectPosition="left" />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-heading text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] text-cream
                           leading-tight mb-[clamp(1.25rem,3dvh,2rem)] [@media_(orientation:landscape)_and_(max-height:380px)]:mb-1">
              {t('subtitle')}
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="flex items-center gap-4">
              <IconRule color="berry" />
              <BsFillCameraFill className="text-berry/65" size={24} />
              <IconRule color="berry" />
            </div>
          </SectionReveal>
        </div>

        {/* Fan: desktop lg+ OR phone landscape (<640px)
            Scale wrapper prevents layout shift from scaled content */}
        <div className="hidden lg:block
                        [@media_(orientation:landscape)_and_(max-height:500px)]:block
                        [@media_(orientation:landscape)_and_(min-height:501px)_and_(max-width:1023px)]:block
                        overflow-visible">
          {/* Outer: sets layout height — landscape small 13.5rem (×0.5), landscape tablet lg 22rem (×0.8) */}
          <div className="h-[27rem] overflow-visible
                          [@media_(orientation:landscape)_and_(max-height:380px)]:h-[11rem]
                          [@media_(orientation:landscape)_and_(min-height:381px)_and_(max-height:500px)]:h-[13.5rem]
                          [@media_(orientation:landscape)_and_(min-height:501px)_and_(max-width:1023px)]:h-[13.5rem]
                          [@media_(orientation:landscape)_and_(min-width:1024px)_and_(max-width:1199px)]:h-[20rem]">
            {/* Inner: scale — ≤380px 0.4, 381-500px 0.5, lg-tablet 0.74 */}
            <div className="origin-top overflow-visible
                            [@media_(orientation:landscape)_and_(max-height:380px)]:scale-[0.4]
                            [@media_(orientation:landscape)_and_(min-height:381px)_and_(max-height:500px)]:scale-[0.5]
                            [@media_(orientation:landscape)_and_(min-height:501px)_and_(max-width:1023px)]:scale-[0.5]
                            [@media_(orientation:landscape)_and_(min-width:1024px)_and_(max-width:1199px)]:scale-[0.74]">
              <SectionReveal delay={0.25}>
                <FanGrid onOpen={setLightboxIdx} />
              </SectionReveal>
            </div>
          </div>
        </div>

        {/* Carousel: portrait < 1024px only */}
        <div className="lg:hidden
                        [@media_(orientation:landscape)_and_(max-height:500px)]:hidden
                        [@media_(orientation:landscape)_and_(min-height:501px)_and_(max-width:1023px)]:hidden">
          <SectionReveal delay={0.2}>
            <MobileGallery
              active={active} direction={direction}
              onPrev={goPrev} onNext={goNext} onOpen={setLightboxIdx}
            />
          </SectionReveal>
        </div>

      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox idx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={lbPrev} onNext={lbNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
