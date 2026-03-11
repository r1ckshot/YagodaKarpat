interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionReveal({ children, className = '' }: SectionRevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
