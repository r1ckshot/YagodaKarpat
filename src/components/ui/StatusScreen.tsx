import Image from 'next/image';

// Shared shell for the 404 and error screens — full hero logo stack + message +
// action. One component so both pages stay visually identical. Layer sizes and
// negative margins mirror the logo composition in HeroSection/IntroSplash.
export default function StatusScreen({
  badge,
  title,
  text,
  textEn,
  action,
}: {
  badge?: string;
  title: string;
  text?: string;
  textEn?: string;
  action: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-cream flex flex-col items-center justify-center px-6 py-[clamp(4rem,8dvh,6rem)] [@media_(orientation:landscape)_and_(max-width:932px)]:py-8 text-center">
      {/* Full logo — fluid width capped by vw and dvh so it never overflows short
          viewports; hidden entirely on landscape phones (same query as HeroSection)
          so the message and action fit without scrolling */}
      <div className="w-[clamp(15rem,11rem_+_16vw,22rem)] max-w-[min(80vw,40dvh)] flex flex-col items-center [@media_(orientation:landscape)_and_(max-width:932px)]:hidden">
        <Image
          src="/images/logo/mountains.webp"
          alt="" aria-hidden="true" width={527} height={225}
          className="w-[90%] h-auto"
        />
        <Image
          src="/images/logo/blueberry.webp"
          alt="Ягода Карпат" width={256} height={196}
          className="w-[35%] h-auto -mt-[7%]"
        />
        <Image
          src="/images/logo/title.webp"
          alt="" aria-hidden="true" width={757} height={107}
          className="w-full h-auto mt-[1%]"
        />
        <Image
          src="/images/logo/bottom-wave.webp"
          alt="" aria-hidden="true" width={681} height={89}
          className="w-full h-auto"
        />
        <div className="relative -mt-[7%] w-full flex justify-center">
          <Image
            src="/images/logo/bottom-title.webp"
            alt="" aria-hidden="true" width={937} height={366}
            className="w-[35%] h-auto"
          />
        </div>
      </div>

      {badge && (
        <p
          className="mt-[clamp(1rem,2.5dvh,2rem)] [@media_(orientation:landscape)_and_(max-width:932px)]:mt-0 font-heading leading-none text-[clamp(2.75rem,2rem_+_3vw,4.5rem)] text-forest"
          aria-hidden="true"
        >
          {badge}
        </p>
      )}
      <h1 className="mt-3 font-heading leading-tight text-[clamp(2rem,1.4rem_+_2.25vw,3.25rem)] text-dark">
        {title}
      </h1>
      {text && (
        <p className="mt-4 max-w-xl font-body leading-relaxed text-pretty text-[clamp(1.125rem,1rem_+_0.75vw,1.375rem)] text-dark/70">
          {text}
        </p>
      )}
      {textEn && (
        <p lang="en" className="mt-2 max-w-xl font-body text-[clamp(1.125rem,1rem_+_0.75vw,1.375rem)] text-dark/55">
          {textEn}
        </p>
      )}
      <div className="mt-[clamp(1.75rem,4dvh,2.75rem)] [@media_(orientation:landscape)_and_(max-width:932px)]:mt-5">{action}</div>
    </div>
  );
}
