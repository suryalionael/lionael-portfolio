const DISCIPLINES = ["Data Science", "Data Engineering", "Software Engineering"];

// Editorial spread: type on the dark "page", the portrait as a full-height
// plate bleeding off the right edge. Text block edges align to the plate.
// Columns: gutter | text (616) | plate (456) | gutter — the two middle
// tracks add up to the 1072px content width used by every other section.
export function Hero() {
  return (
    <section
      id="top"
      className="grid grid-cols-[24px_minmax(0,1fr)_24px] pt-24 md:grid-cols-[minmax(24px,1fr)_minmax(0,616px)_minmax(0,456px)_minmax(24px,1fr)] md:grid-rows-[auto_1fr] md:pt-28 md:pb-20 lg:min-h-svh lg:pt-28 lg:pb-14"
    >
      <h1
        className="anim-fade-up col-start-2 font-medium tracking-[-0.055em] md:pr-12 lg:pr-16"
        style={{ "--d": "0.05s" } as React.CSSProperties}
      >
        <span className="block text-lg font-normal tracking-normal text-muted md:text-xl">
          Hi, I&apos;m
        </span>
        <span className="mt-3 block text-[clamp(4.25rem,10.5vw,8.75rem)] leading-[0.86]">
          Lionael
          <br />
          Surya
        </span>
      </h1>

      <figure
        className="anim-fade relative col-span-2 col-start-2 mt-12 aspect-[4/5] overflow-hidden bg-neutral-200 md:col-span-2 md:col-start-3 md:row-span-2 md:row-start-1 md:mt-0 md:aspect-auto md:min-h-[36rem]"
        style={{ "--d": "0.15s" } as React.CSSProperties}
      >
        <picture>
          <source
            type="image/webp"
            srcSet="/portrait-800.webp 800w, /portrait-1400.webp 1400w"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
          <img
            src="/portrait.jpg"
            alt="Studio portrait of Lionael Surya in a black shirt, seated on a stool against a white wall"
            width={1400}
            height={2487}
            fetchPriority="high"
            className="absolute inset-0 size-full origin-[55%_30%] scale-[1.28] object-cover object-[50%_40%] md:scale-100"
          />
        </picture>
      </figure>

      <div
        className="anim-fade-up col-start-2 mt-12 md:row-start-2 md:mt-0 md:self-end md:pt-16 md:pr-12 lg:pr-16"
        style={{ "--d": "0.25s" } as React.CSSProperties}
      >
        <p className="max-w-[34rem] text-lg leading-8 text-neutral-400 md:text-[1.1875rem] md:leading-[1.7]">
          <span className="text-paper">Welcome to my portfolio.</span>{" "}
          I&apos;m a Data Science student at Seneca Polytechnic building
          production-ready data platforms, internal software, and AI-powered
          systems. My focus is reliable architecture, reproducible pipelines,
          and software people can actually trust.
        </p>

        <div className="mt-9 flex items-center gap-9">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-base font-medium text-paper"
          >
            <span className="underline decoration-white/30 decoration-1 underline-offset-[7px] transition-[text-decoration-color] duration-300 group-hover:decoration-white">
              Explore my work
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
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

        <dl className="mt-12 grid grid-cols-[auto_auto] justify-start gap-x-14 gap-y-2 border-t border-white/[0.08] pt-6 pb-16 md:mt-14 md:pb-0">
          <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Focus
          </dt>
          <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Based in
          </dt>
          <dd className="text-sm leading-6 text-neutral-300">
            <ul>
              {DISCIPLINES.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </dd>
          <dd className="text-sm leading-6 text-neutral-300">
            Toronto, Canada
          </dd>
        </dl>
      </div>
    </section>
  );
}
