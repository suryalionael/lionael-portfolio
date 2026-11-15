"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Gentle inertial scrolling on fine pointers only. Native scrollbar stays,
// anchors and keyboard keep working (Lenis listens to wheel only here).
// Touch devices and reduced-motion users keep native scrolling.
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });
    // CSS scroll-behavior would fight Lenis's anchor handling.
    document.documentElement.classList.add("lenis-on");

    let raf = requestAnimationFrame(function tick(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);

  return null;
}
