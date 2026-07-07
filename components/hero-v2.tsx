import Image from "next/image";
import type { CSSProperties } from "react";
import portrait from "@/public/portrait.jpg";
import dynamic from "next/dynamic";

const ParticleTypography = dynamic(
  () => import("./particle-typography").then((mod) => mod.ParticleTypography),
  { ssr: false }
);

const Lanyard = dynamic(
  () => import("./lanyard").then((mod) => mod.Lanyard),
  { ssr: false, loading: () => <div className="h-[400px] w-full md:h-[480px]" /> }
);

const STAGES = ["source", "ingest", "transform", "model", "ship"];

function delay(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

export function HeroV2() {
  return (
    <section id="top" className="flex min-h-svh flex-col justify-end">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-36 pb-12">
        <div className="grid gap-12 md:grid-cols-[1fr_0.9fr] md:gap-16 lg:gap-20">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <div className="anim-fade-up mb-8 flex items-center gap-4" style={delay(0.15)}>
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-white/10">
                <Image
                  src={portrait}
                  alt="Portrait of Lionael Surya"
                  fill
                  sizes="48px"
                  priority
                  className="object-cover object-[50%_16%] grayscale"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-paper">
                  Lionael Surya
                </p>
                <p className="mt-0.5 font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Data &amp; software engineering · Toronto
                </p>
              </div>
            </div>

            <div className="mb-10 h-[200px] md:h-[180px]">
              <ParticleTypography 
                text="Built like production."
                className="w-full h-full"
              />
            </div>

            <p
              className="anim-fade-up mb-10 max-w-[34rem] text-lg leading-8 text-neutral-400"
              style={delay(0.5)}
            >
              I&apos;m a data science student at Seneca Polytechnic who builds data
              systems the way real teams do — tested, documented, reproducible,
              and shipped. Looking for data &amp; software engineering internships.
            </p>

            <div
              className="anim-fade-up flex items-center gap-6"
              style={delay(0.8)}
            >
              <a href="#work" className="u-link text-sm font-medium text-paper">
                Explore the systems ↓
              </a>
              <a
                href="https://github.com/suryalionael"
                target="_blank"
                rel="noopener noreferrer"
                className="u-link text-sm text-neutral-400 transition-colors hover:text-paper"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div 
            className="anim-fade-up flex items-center justify-center md:justify-end"
            style={delay(1.1)}
          >
            <Lanyard />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-28 flex items-center gap-3 md:gap-6"
        >
          {STAGES.map((stage, i) => (
            <div key={stage} className="contents">
              {i > 0 && (
                <span
                  className="anim-grow-x h-px flex-1 bg-white/[0.08]"
                  style={delay(1.45 + i * 0.15)}
                />
              )}
              <span
                className="anim-fade stage-label flex items-center gap-2 font-mono text-xs text-muted"
                style={delay(1.4 + i * 0.15)}
              >
                {stage === "ship" && (
                  <span className="dot-live size-1.5 rounded-full bg-accent" />
                )}
                {stage}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
