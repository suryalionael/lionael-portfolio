import type { CSSProperties } from "react";
import { PhotoCard } from "@/components/photo-card";

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
    <section id="top" className="relative flex min-h-svh flex-col">
      <div className="mx-auto grid w-full max-w-[1120px] flex-1 items-center gap-16 px-6 pt-28 pb-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 lg:pt-16 lg:pb-0">
        <div>
          <div className="anim-fade-up mb-10" style={delay(0.15)}>
            <p className="text-base font-medium text-paper">Lionael Surya</p>
            <p className="mt-1 font-mono text-xs tracking-[0.18em] text-muted uppercase leading-6">
              Data Science <span className="mx-1.5">•</span> Data Engineering <span className="mx-1.5">•</span> Software Engineering<br />
              Toronto, Canada
            </p>
          </div>

          <h1 className="text-[clamp(3rem,9vw,7rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            <Line at={0.35}>Building systems</Line>
            <Line at={0.5}>people can depend on.</Line>
          </h1>

          <p
            className="anim-fade-up mt-10 max-w-[36rem] text-xl leading-9 text-neutral-400"
            style={delay(0.95)}
          >
            I build production-ready data platforms, internal software,
            and AI-powered systems while studying Data Science at Seneca
            Polytechnic. My focus is reliable architecture, reproducible
            pipelines, and software people can actually trust.
          </p>

          <div
            className="anim-fade-up mt-10 flex items-center gap-10"
            style={delay(1.15)}
          >
            <a href="#work" className="u-link text-base font-medium text-paper">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a
              href="https://github.com/suryalionael"
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-base text-neutral-400 transition-colors hover:text-paper"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="anim-fade-up pb-8 lg:pb-0" style={delay(0.6)}>
          <PhotoCard />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-6 pb-12">
        <div
          aria-hidden="true"
          className="flex items-center gap-3 pt-8 md:gap-6"
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
