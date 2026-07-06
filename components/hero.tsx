import type { CSSProperties } from "react";

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
      <div className="mx-auto w-full max-w-[1120px] px-6 pt-36 pb-10">
        <p
          className="anim-fade-up mb-8 font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase"
          style={delay(0.1)}
        >
          Lionael Surya · Toronto, Canada
        </p>

        <h1 className="text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.98] font-medium tracking-[-0.04em]">
          <Line at={0.2}>Built like</Line>
          <Line at={0.3}>production.</Line>
        </h1>

        <p
          className="anim-fade-up mt-10 max-w-xl text-lg leading-relaxed text-neutral-400"
          style={delay(0.55)}
        >
          I&apos;m a data science student at Seneca Polytechnic who builds data
          systems the way real teams do — tested, documented, reproducible,
          and shipped. Looking for data &amp; software engineering internships.
        </p>

        <div
          className="anim-fade-up mt-10 flex items-center gap-8"
          style={delay(0.7)}
        >
          <a
            href="#work"
            className="text-sm font-medium text-paper underline-offset-4 hover:underline"
          >
            View selected work ↓
          </a>
          <a
            href="https://github.com/suryalionael"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 underline-offset-4 transition-colors hover:text-paper hover:underline"
          >
            GitHub ↗
          </a>
        </div>

        <div
          aria-hidden="true"
          className="mt-24 flex items-center gap-3 md:gap-6"
        >
          {STAGES.map((stage, i) => (
            <div key={stage} className="contents">
              {i > 0 && (
                <span
                  className="anim-grow-x h-px flex-1 bg-white/10"
                  style={delay(0.9 + i * 0.12)}
                />
              )}
              <span
                className="anim-fade flex items-center gap-2 font-mono text-xs text-neutral-500"
                style={delay(0.85 + i * 0.12)}
              >
                {stage === "ship" && (
                  <span className="size-1.5 rounded-full bg-accent" />
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
