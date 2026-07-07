// Shared eyebrow + title + icon-rule header used at the top of every section.
// Each section's own outer wrapper (spacing, max-width) stays in the section file —
// this only covers the three SectionReveal rows that were identical everywhere.

import SectionReveal from '@/components/ui/SectionReveal';
import { EyebrowDivider, IconRule } from '@/components/ui/SectionOrnaments';

const ACCENT_TEXT = {
  forest: 'text-forest',
  berry:  'text-berry/80',
} as const;

const TITLE_TEXT = {
  cream: 'text-cream',
  dark:  'text-dark',
} as const;

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  ornamentSrc: string;
  accentColor: 'forest' | 'berry';
  titleColor?: 'cream' | 'dark';
  ornamentLarge?: boolean;
  /** Gallery mirrors the ornament flip/position order vs. every other section. */
  reversedOrnaments?: boolean;
  eyebrowRowClassName?: string;
  /** Replaces the default title margin-bottom (Varieties' mobile carousel uses a tighter value). */
  titleMarginClassName?: string;
  /** Appended alongside the title margin — for responsive-variant overrides (e.g. Gallery). */
  titleClassName?: string;
  iconRowClassName?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  icon,
  ornamentSrc,
  accentColor,
  titleColor = 'dark',
  ornamentLarge = false,
  reversedOrnaments = false,
  eyebrowRowClassName = '',
  titleMarginClassName = 'mb-[clamp(1.25rem,3dvh,2rem)]',
  titleClassName = '',
  iconRowClassName = '',
}: SectionHeaderProps) {
  return (
    <>
      <SectionReveal>
        <div className={`flex items-center gap-4 mb-[clamp(0.75rem,2dvh,1.25rem)] ${eyebrowRowClassName}`}>
          <EyebrowDivider
            src={ornamentSrc}
            large={ornamentLarge}
            flip={reversedOrnaments}
            objectPosition={reversedOrnaments ? 'left' : undefined}
          />
          <span className={`font-body text-base uppercase tracking-[0.28em] pl-[0.28em] ${ACCENT_TEXT[accentColor]} font-semibold`}>
            {eyebrow}
          </span>
          <EyebrowDivider
            src={ornamentSrc}
            large={ornamentLarge}
            flip={!reversedOrnaments}
            objectPosition={reversedOrnaments ? 'left' : undefined}
          />
        </div>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <h2 className={`font-heading text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] ${TITLE_TEXT[titleColor]} leading-tight ${titleMarginClassName} ${titleClassName}`}>
          {title}
        </h2>
      </SectionReveal>
      <SectionReveal delay={0.2}>
        <div className={`flex items-center gap-4 ${iconRowClassName}`}>
          <IconRule color={accentColor} />
          {icon}
          <IconRule color={accentColor} />
        </div>
      </SectionReveal>
    </>
  );
}
