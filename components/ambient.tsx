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
    // The layout's inline script drops the html.js class (showing all
    // reveal-hidden content) unless this flag appears in time.
    (window as Window & { __ambient?: boolean }).__ambient = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // Mono label scramble ------------------------------------------------
    const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const scramble = (el: HTMLElement) => {
      if (reduce || "scrambling" in el.dataset) return;
      const original = (el.dataset.scrambleText ??= el.textContent ?? "");
      if (!original.trim()) return;
      if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", original);
      el.dataset.scrambling = "";
      const start = performance.now();
      const duration = 360;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const keep = Math.floor(p * original.length);
        el.textContent =
          original.slice(0, keep) +
          [...original.slice(keep)]
            .map((c) =>
              c === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0],
            )
            .join("");
        if (p < 1) requestAnimationFrame(step);
        else {
          el.textContent = original;
          delete el.dataset.scrambling;
        }
      };
      requestAnimationFrame(step);
    };

    // Reveal on scroll ---------------------------------------------------
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.dataset.in = "";
            if (el.matches("[data-scramble]")) scramble(el);
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
      if (!raf) raf = requestAnimationFrame(tick);
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
      const sc = t?.closest<HTMLElement>("[data-scramble]");
      if (sc) scramble(sc);
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

    const releaseTargets = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
      if (tilt) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      }
      tilt = null;
      setHover(null);
    };
    const onLeave = () => {
      visible = false;
      document.documentElement.classList.remove("cursor-on");
      releaseTargets();
    };
    const onDown = () => ring.current?.classList.add("is-down");
    // A click can open or close a dialog under a still pointer, so
    // re-read what is under it once the UI has settled.
    let upTimer = 0;
    const onUp = () => {
      ring.current?.classList.remove("is-down");
      upTimer = window.setTimeout(
        () => setHover(document.elementFromPoint(mx, my)),
        60,
      );
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
      // Park the loop once everything has eased into place; pointermove
      // restarts it. Saves constant wakeups on idle laptops.
      const settled =
        Math.abs(mx - rx) < 0.1 &&
        Math.abs(my - ry) < 0.1 &&
        Math.abs(px - cpx) < 0.002 &&
        Math.abs(py - cpy) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    addEventListener("pointercancel", onLeave);
    addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(upTimer);
      io.disconnect();
      mo.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      removeEventListener("pointercancel", onLeave);
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
