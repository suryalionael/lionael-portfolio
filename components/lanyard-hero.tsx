"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const Lanyard = dynamic(() => import("./LanyardReactBits"), {
  ssr: false,
  loading: () => null,
});

type Mode = "pending" | "3d" | "static" | "none";

const DESKTOP = "(min-width: 768px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(DESKTOP), window.matchMedia(REDUCED)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () =>
    queries.forEach((q) => q.removeEventListener("change", onChange));
}

function getSnapshot(): Mode {
  if (!window.matchMedia(DESKTOP).matches) return "none";
  if (window.matchMedia(REDUCED).matches) return "static";
  return "3d";
}

function getServerSnapshot(): Mode {
  return "pending";
}

function StaticCard() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-[420px] w-[300px] rotate-2 overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/assets/lanyard/front.png"
          alt=""
          fill
          sizes="300px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function LanyardHero() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [contextLost, setContextLost] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const is3d = mode === "3d" && !contextLost;

  // If the GPU ever drops the WebGL context (background tab reclaim,
  // driver reset), swap to the static card instead of a dead canvas.
  // Attached at the DOM level: webglcontextlost does not bubble, and the
  // canvas mounts later via dynamic import, so observe until it appears.
  useEffect(() => {
    if (!is3d) return;
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    let canvas = el.querySelector("canvas");
    let observer: MutationObserver | undefined;
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handler);
    } else {
      observer = new MutationObserver(() => {
        canvas = el.querySelector("canvas");
        if (canvas) {
          canvas.addEventListener("webglcontextlost", handler);
          observer?.disconnect();
        }
      });
      observer.observe(el, { childList: true, subtree: true });
    }
    return () => {
      canvas?.removeEventListener("webglcontextlost", handler);
      observer?.disconnect();
    };
  }, [is3d]);

  if (mode === "pending" || mode === "none") return null;

  if (!is3d) return <StaticCard />;

  return (
    <div
      ref={wrapRef}
      className="anim-fade h-full"
      style={{ "--d": "0.6s" } as React.CSSProperties}
    >
      <span className="sr-only">
        An interactive ID card of Lionael Surya hanging from a lanyard.
      </span>
      <Lanyard
        position={[0, 0, 30]}
        gravity={[0, -40, 0]}
        fov={20}
        transparent
        frontImage="/assets/lanyard/front.png"
        backImage="/assets/lanyard/back.png"
        lanyardImage="/assets/lanyard/lanyard-band.png"
        lanyardWidth={1}
      />
    </div>
  );
}
