'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

interface LightboxImageProps {
  src: StaticImageData;
  alt: string;
}

/** Full-size lightbox photo — blurred placeholder background, fades in once loaded. */
export default function LightboxImage({ src, alt }: LightboxImageProps) {
  const [loaded, setLoaded] = useState(false);
  const { width: iw, height: ih } = src;

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-2xl"
      style={{
        width: `min(96vw, calc(90svh * ${iw / ih}))`,
        aspectRatio: `${iw} / ${ih}`,
        backgroundImage:    `url(${src.blurDataURL})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="96vw"
      />
    </div>
  );
}
