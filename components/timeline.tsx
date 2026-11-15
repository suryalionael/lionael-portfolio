"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

// Wraps the experience list: a hairline on the left fills as the reader
// scrolls through the roles. Scroll-linked, so it communicates progress;
// reduced motion gets the full static line.
export function Timeline({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.35"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={`relative md:pl-10 ${className}`}>
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 hidden w-px bg-white/[0.08] md:block"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : fill }}
        className="absolute top-0 bottom-0 left-0 hidden w-px origin-top bg-white/45 md:block"
      />
      {children}
    </div>
  );
}
