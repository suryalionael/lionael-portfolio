"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore } from "react";

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

export function LanyardHero() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (mode === "pending" || mode === "none") return null;

  if (mode === "static") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="relative h-[420px] w-[300px] overflow-hidden rounded-2xl border border-white/10 rotate-2">
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

  return (
    <div className="anim-fade h-full" style={{ "--d": "0.6s" } as React.CSSProperties}>
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
