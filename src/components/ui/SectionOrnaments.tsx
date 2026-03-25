// Reusable decorative ornaments shared across all sections.
// EyebrowDivider — SVG vector beside the eyebrow text row.
// IconRule       — spindle/needle rule beside the section icon.

const FOREST_GRADIENT =
  'linear-gradient(to right, color-mix(in srgb, var(--color-forest) 0%, transparent) 0%, color-mix(in srgb, var(--color-forest) 30%, transparent) 35%, color-mix(in srgb, var(--color-forest) 50%, transparent) 50%, color-mix(in srgb, var(--color-forest) 30%, transparent) 65%, color-mix(in srgb, var(--color-forest) 0%, transparent) 100%)';
const BERRY_GRADIENT =
  'linear-gradient(to right, color-mix(in srgb, var(--color-berry) 0%, transparent) 0%, color-mix(in srgb, var(--color-berry) 30%, transparent) 35%, color-mix(in srgb, var(--color-berry) 50%, transparent) 50%, color-mix(in srgb, var(--color-berry) 30%, transparent) 65%, color-mix(in srgb, var(--color-berry) 0%, transparent) 100%)';

interface EyebrowDividerProps {
  src: string;
  /** Mirror horizontally (right-side dividers). */
  flip?: boolean;
  /** Which edge of the box the SVG content aligns to — matches text side. */
  objectPosition?: 'left' | 'right';
  /** Larger variant for sections whose SVG is naturally smaller (e.g. Process). */
  large?: boolean;
}

/** Decorative SVG ornament for the eyebrow row — scales with clamp(). */
export function EyebrowDivider({
  src,
  flip = false,
  objectPosition = 'right',
  large = false,
}: EyebrowDividerProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`object-contain shrink-0 opacity-50 [@media_(max-width:380px)]:!w-12 ${objectPosition === 'left' ? 'object-left' : 'object-right'}`}
      style={{
        width:  large ? 'clamp(4rem, 9vw, 9rem)'    : 'clamp(4.5rem, 8vw, 7rem)',
        height: large ? 'clamp(1.75rem, 4vw, 3rem)'   : 'clamp(2rem, 3.5vw, 2.5rem)',
        ...(flip ? { transform: 'scaleX(-1)' } : {}),
      }}
    />
  );
}

interface IconRuleProps {
  color: 'forest' | 'berry';
}

/** Spindle/needle rule for the icon row — thin, convex, barely-there. */
export function IconRule({ color }: IconRuleProps) {
  return (
    <div
      className="shrink-0"
      style={{
        width: 'clamp(3rem, 5vw, 6rem)',
        height: '1.5px',
        borderRadius: '50%',
        background: color === 'forest' ? FOREST_GRADIENT : BERRY_GRADIENT,
      }}
    />
  );
}
