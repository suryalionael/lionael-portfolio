import Image from "next/image";
import type { CSSProperties } from "react";
import portrait from "@/public/portrait.png";

const STAGES = ["source", "ingest", "transform", "model", "ship"];

function delay(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

function Line({ children, at }: { children: string; at: number }) {
  return (
    <span className="block overflow-hidden">
      <span className="anim-rise block" style={delay(at)}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="flex min-h-svh flex-col justify-end">
      <div className="mx-auto w-full max-w-[1120px] px-6 pt-36 pb-12">
        <div className="anim-fade-up mb-12 flex items-center gap-4" style={delay(0.15)}>
          <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-white/10">
            <Image
              src={portrait}
              alt="Portrait of Lionael Surya"
              fill
              sizes="48px"
              priority
              className="object-cover object-[50%_16%] grayscale"
            />
          </span>
          <span>
            <span className="block text-sm font-medium text-paper">
              Lionael Surya
            </span>
            <span className="mt-0.5 block font-mono text-xs tracking-[0.18em] text-neutral-500 uppercase">
              Data &amp; software engineering · Toronto
            </span>
          </span>
        </div>

        <h1 className="text-[clamp(3.5rem,9.5vw,8rem)] leading-[0.95] font-medium tracking-[-0.045em]">
          <Line at={0.35}>Built like</Line>
          <Line at={0.5}>production.</Line>
        </h1>

        <p
          className="anim-fade-up mt-12 max-w-[34rem] text-lg leading-8 text-neutral-400"
          style={delay(0.95)}
        >
          I&apos;m a data science student at Seneca Polytechnic who builds data
          systems the way real teams do — tested, documented, reproducible,
          and shipped. Looking for data &amp; software engineering internships.
        </p>

        <div
          className="anim-fade-up mt-12 flex items-center gap-10"
          style={delay(1.15)}
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
                className="anim-fade stage-label flex items-center gap-2 font-mono text-xs text-neutral-500"
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
