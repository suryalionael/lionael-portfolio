"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./LanyardReactBits"), {
  ssr: false,
  loading: () => null
});

export function LanyardHero() {
  return (
    <Lanyard
      position={[0, 0, 30]}
      gravity={[0, -40, 0]}
      frontImage="/assets/lanyard/front.png"
      backImage="/assets/lanyard/back.png"
      lanyardImage="/assets/lanyard/lanyard-band.png"
      lanyardWidth={1}
      fov={20}
      transparent={true}
    />
  );
}
