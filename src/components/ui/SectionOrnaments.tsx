// Reusable decorative ornaments shared across all sections.
// EyebrowDivider — SVG vector beside the eyebrow text row.
// IconRule       — spindle/needle rule beside the section icon.

const FOREST_GRADIENT =
  'linear-gradient(to right, rgba(0,133,73,0) 0%, rgba(0,133,73,0.3) 35%, rgba(0,133,73,0.5) 50%, rgba(0,133,73,0.3) 65%, rgba(0,133,73,0) 100%)';
const BERRY_GRADIENT =
  'linear-gradient(to right, rgba(204,46,31,0) 0%, rgba(204,46,31,0.3) 35%, rgba(204,46,31,0.5) 50%, rgba(204,46,31,0.3) 65%, rgba(204,46,31,0) 100%)';

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
      className={`object-contain shrink-0 opacity-50 ${objectPosition === 'left' ? 'object-left' : 'object-right'}`}
      style={{
        width:  large ? 'clamp(5rem, 9vw, 9rem)'    : 'clamp(4.5rem, 8vw, 7rem)',
        height: large ? 'clamp(2.25rem, 4vw, 3rem)' : 'clamp(2rem, 3.5vw, 2.5rem)',
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
