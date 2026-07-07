interface HighlightProps {
  children: React.ReactNode;
  /** Whether the underline should be drawn (typically tied to a useInView result). */
  inView: boolean;
  color?: 'blueberry' | 'berry';
  /** Seconds to wait after inView before the underline starts drawing. */
  delay?: number;
  className?: string;
  as?: 'span' | 'strong';
}

/** Text with an animated gradient underline that draws in once its section scrolls into view. */
export default function Highlight({
  children,
  inView,
  color = 'blueberry',
  delay = 1.4,
  className = 'font-semibold text-dark/90',
  as: Tag = 'span',
}: HighlightProps) {
  return (
    <Tag
      className={className}
      style={{
        backgroundImage: `linear-gradient(color-mix(in srgb, var(--color-${color}) 90%, transparent), color-mix(in srgb, var(--color-${color}) 75%, transparent))`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: inView ? '100% 2px' : '0% 2px',
        backgroundPosition: 'bottom 3px left 0',
        paddingBottom: '5px',
        transition: inView ? `background-size 0.8s cubic-bezier(0.42,0,0.58,1) ${delay}s` : 'none',
      }}
    >
      {children}
    </Tag>
  );
}
