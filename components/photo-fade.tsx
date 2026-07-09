"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type FadePhoto = {
  src: string;
  alt: string;
};

export function PhotoFade({
  photos,
  sizes,
  className = "",
  interval = 5200,
}: {
  photos: FadePhoto[];
  sizes: string;
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      interval,
    );
    return () => clearInterval(id);
  }, [photos.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          aria-hidden={i !== index}
          className={`object-cover transition-opacity duration-[1800ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
