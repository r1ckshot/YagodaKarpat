interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export default function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  return (
    <span className="font-heading text-4xl font-bold text-forest">
      {value}{suffix}
    </span>
  );
}
