// Vector navbar logo: mountains SVG + "Ягода Карпат" text
// Full logo uses PNG assets assembled in HeroSection / IntroSplash

interface LogoProps {
  className?: string;
}

// Three mountain peaks — redrawn from brand logo
function Mountains({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 56 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 31 L16 7 L26 19 L32 2 L38 19 L48 7 L54 31"
        stroke="#2E7D32"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Mountains size={44} />
      <span className="font-heading text-xl leading-none">
        <span className="text-berry">Ягода</span>{' '}
        <span className="text-forest">Карпат</span>
      </span>
    </div>
  );
}
