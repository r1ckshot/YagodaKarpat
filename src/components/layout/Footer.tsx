'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('hero');

  const Logo = () => (
    <div className="flex items-center gap-3.5 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo/blueberry.png" alt="" aria-hidden="true" className="h-9 w-auto [@media_(max-width:400px)_and_(orientation:portrait)]:hidden"
        style={{ filter: 'drop-shadow(0 0 14px color-mix(in srgb, var(--color-blueberry) 75%, transparent)) drop-shadow(0 0 5px color-mix(in srgb, var(--color-blueberry) 40%, transparent))' }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo/title.png" alt="Ягода Карпат" className="h-7 w-auto opacity-60 [@media_(max-width:400px)_and_(orientation:portrait)]:h-6" />
    </div>
  );

  const Mountains = () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/logo/mountains.png" alt="" aria-hidden="true"
      className="h-9 w-auto opacity-60 shrink-0" />
  );

  const CenterText = ({ translate, subtitle }: { translate?: boolean; subtitle?: boolean }) => (
    <div className={`flex items-center gap-3 ${translate ? 'translate-x-20' : ''}`}>
      <p className="font-body text-base italic text-cream/50 whitespace-nowrap">
        {t('tagline')}
      </p>
      <div className="w-px h-4 bg-white/15 shrink-0" />
      <p className="font-body text-base text-cream/50 tracking-widest uppercase whitespace-nowrap">
        © 2026
      </p>
      {subtitle && (
        <>
          <div className="w-px h-4 bg-white/15 shrink-0" />
          <p className="font-body text-base italic text-cream/35 whitespace-nowrap">
            {t('subtitle')}
          </p>
        </>
      )}
    </div>
  );

  return (
    <footer className="bg-dark border-t border-cream/10">

      {/* ── PHONE PORTRAIT (<640px portrait) ── */}
      <div className="[@media_(orientation:landscape)]:hidden sm:hidden h-16 max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Logo />
        <p className="font-body text-base text-cream/50 tracking-widest uppercase">© 2026</p>
      </div>

      {/* ── TABLET PORTRAIT (≥640px portrait): logo left · text center · mountains right ── */}
      <div className="hidden [@media_(min-width:640px)_and_(orientation:portrait)]:grid
                      grid-cols-[auto_1fr_auto] h-16 max-w-6xl mx-auto px-6 items-center gap-4">
        <Logo />
        <div className="flex justify-center items-center">
          <CenterText />
        </div>
        <Mountains />
      </div>

      {/* ── LANDSCAPE small (≤420px height): logo · year · mountains ── */}
      <div className="hidden [@media_(orientation:landscape)_and_(max-height:420px)]:flex
                      h-16 max-w-6xl mx-auto px-6 items-center justify-between">
        <Logo />
        <p className="font-body text-base text-cream/50 tracking-widest uppercase">© 2026</p>
        <Mountains />
      </div>

      {/* ── LANDSCAPE regular (>420px height): logo left · text center+translate · mountains right ── */}
      <div className="hidden [@media_(orientation:landscape)_and_(min-height:421px)]:flex
                      h-16 max-w-6xl mx-auto px-6 relative items-center justify-center">
        <div className="absolute left-6"><Logo /></div>
        <div className="hidden lg:block"><CenterText translate subtitle /></div>
        <div className="lg:hidden"><CenterText translate /></div>
        <div className="absolute right-6"><Mountains /></div>
      </div>

    </footer>
  );
}
