"use client";

import { useEffect, useRef } from "react";

// Site-wide motion layer, mounted once in the root layout:
// - custom cursor (dot + trailing ring, label from [data-cursor])
// - soft spotlight that follows the pointer
// - scroll progress hairline
// - [data-reveal] elements fade up when they enter the viewport
// - [data-magnetic] elements lean toward the pointer
// - [data-parallax="n"] elements drift with the pointer by up to n px
// - [data-tilt] elements tilt in 3D under the pointer
// Pointer effects only run on fine pointers; everything is skipped when
// the user prefers reduced motion (reveals then show immediately).
export function Ambient() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // Reveal on scroll ---------------------------------------------------
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    let parallax: HTMLElement[] = [];
    const watch = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])")
        .forEach((el) => (reduce ? (el.dataset.in = "") : io.observe(el)));
      parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    };
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    // Scroll progress ----------------------------------------------------
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty("--p", String(max > 0 ? scrollY / max : 0));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    if (reduce || !fine) {
      return () => {
        io.disconnect();
        mo.disconnect();
        removeEventListener("scroll", onScroll);
      };
    }

    document.documentElement.classList.add("has-cursor");

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;
    let px = 0; // pointer offset from centre, -1..1
    let py = 0;
    let cpx = 0;
    let cpy = 0;
    let hover: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let raf = 0;
    let visible = false;

    const setHover = (t: Element | null) => {
      const interactive =
        t?.closest<HTMLElement>(
          "a, button, [role='button'], [data-cursor], summary, label",
        ) ?? null;
      if (interactive === hover) return;
      hover = interactive;
      const text =
        hover?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      ring.current?.classList.toggle("is-hover", !!hover);
      ring.current?.classList.toggle("has-label", !!text);
      if (label.current) label.current.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      px = (mx / innerWidth) * 2 - 1;
      py = (my / innerHeight) * 2 - 1;
      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        document.documentElement.classList.add("cursor-on");
      }

      setHover(e.target as Element | null);

      const t = e.target as Element | null;
      const m = t?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (mx - (r.left + r.width / 2)) * 0.25;
        const dy = (my - (r.top + r.height / 2)) * 0.35;
        magnet.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }

      const tl = t?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilt && tilt !== tl) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      }
      tilt = tl;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const nx = (mx - r.left) / r.width - 0.5;
        const ny = (my - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", `${(-ny * 6).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(nx * 8).toFixed(2)}deg`);
        tilt.style.setProperty("--gx", `${((nx + 0.5) * 100).toFixed(1)}%`);
        tilt.style.setProperty("--gy", `${((ny + 0.5) * 100).toFixed(1)}%`);
      }
    };

    const onLeave = () => {
      visible = false;
      document.documentElement.classList.remove("cursor-on");
    };
    const onDown = () => ring.current?.classList.add("is-down");
    // A click can open or close a dialog under a still pointer, so
    // re-read what is under it once the UI has settled.
    const onUp = () => {
      ring.current?.classList.remove("is-down");
      setTimeout(() => setHover(document.elementFromPoint(mx, my)), 60);
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      cpx += (px - cpx) * 0.06;
      cpy += (py - cpy) * 0.06;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (light.current) light.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      for (const el of parallax) {
        const n = Number(el.dataset.parallax) || 10;
        el.style.transform = `translate3d(${(-cpx * n).toFixed(2)}px, ${(-cpy * n).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor", "cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={bar} aria-hidden="true" className="scroll-bar" />
      <div ref={light} aria-hidden="true" className="spotlight" />
      <div ref={ring} aria-hidden="true" className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
