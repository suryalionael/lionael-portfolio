"use client";

import { Suspense, lazy } from "react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import portrait from "@/public/portrait.jpg";

const LanyardClient = lazy(() => import("./lanyard-client"));

export function Lanyard() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative mx-auto h-[400px] w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-ink-raised md:h-[480px] md:w-[340px]">
        <Image
          src={portrait}
          alt="Lionael Surya"
          fill
          sizes="340px"
          className="object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Engineering ID
          </p>
          <p className="mt-1 text-xl font-medium text-paper">Lionael Surya</p>
          <p className="mt-1 font-mono text-xs text-neutral-400">
            Built Like Production.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className="h-[400px] w-full md:h-[480px]" />
      }
    >
      <LanyardClient />
    </Suspense>
  );
}
