"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const LanyardReactBits = dynamic(() => import("./LanyardReactBits"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full md:h-[500px]" />
});

export function LanyardHero() {
  return (
    <div className="h-[400px] w-full md:h-[500px]">
      <Suspense fallback={<div className="h-full w-full" />}>
        <LanyardReactBits
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          frontImage="/assets/lanyard/front.png"
          backImage="/assets/lanyard/back.png"
          lanyardImage="/assets/lanyard/lanyard-band.png"
          lanyardWidth={1}
          fov={20}
          transparent={true}
        />
      </Suspense>
    </div>
  );
}
