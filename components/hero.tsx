import { RolePitch, RoleSwitch, ResumeCta } from "@/components/role-lens";

const DISCIPLINES = ["Data Science", "Data Engineering", "Software Engineering"];

// Static lines: the hero heading is the LCP element, so it must paint
// immediately rather than animate in from outside its box.
function Line({ text }: { text: string }) {
  return <span className="block">{text}</span>;
}

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1120px] gap-x-14 px-6 pt-28 pb-20 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:pt-36 md:pb-28 lg:grid-cols-[minmax(0,1fr)_380px]"
    >
      <div className="md:col-start-1">
        <p
          className="anim-fade-up flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-neutral-400 uppercase"
          style={{ "--d": "0.05s" } as React.CSSProperties}
        >
          <span className="relative flex size-2">
            <span className="dot-ping absolute inline-flex size-full rounded-full bg-accent/70" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Open to Summer 2027 co-op
        </p>

        <h1
          aria-label="Lionael Surya"
          className="mt-8 text-[clamp(4rem,10vw,8.25rem)] leading-[0.86] font-medium tracking-[-0.055em]"
        >
          <span aria-hidden="true">
            <Line text="Lionael" />
            <Line text="Surya" />
          </span>
        </h1>

        <RolePitch
          className="anim-fade-up mt-10"
          style={{ "--d": "0.7s" } as React.CSSProperties}
        />
        <p
          className="anim-fade-up mt-5 max-w-[34rem] text-lg leading-8 text-neutral-400"
          style={{ "--d": "0.8s" } as React.CSSProperties}
        >
          Data Science &amp; Analytics student at Seneca Polytechnic, shipping
          production data platforms, internal software, and ML systems — with
          tests, documentation, and decisions you can trace back.
        </p>

        <div
          className="anim-fade-up mt-10 flex flex-wrap items-center gap-x-9 gap-y-4"
          style={{ "--d": "0.9s" } as React.CSSProperties}
        >
          <a
            href="#work"
            data-magnetic
            className="group inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white"
          >
            Explore my work
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
          {/* Keep the two text links together so neither orphan-wraps. */}
          <span className="flex items-center gap-x-9">
            <ResumeCta variant="hero" />
            <a
              href="https://github.com/suryalionael"
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-[15px] text-neutral-400 transition-colors hover:text-paper"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </span>
        </div>

        <div
          className="anim-fade-up"
          style={{ "--d": "0.95s" } as React.CSSProperties}
        >
          <RoleSwitch />
        </div>

        <dl
          className="anim-fade-up mt-12 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-white/[0.08] pt-6 lg:grid-cols-[auto_auto_auto] lg:justify-start lg:gap-x-14"
          style={{ "--d": "1s" } as React.CSSProperties}
        >
          <div>
            <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Focus
            </dt>
            <dd className="mt-2 text-sm leading-6 text-neutral-300">
              <ul>
                {DISCIPLINES.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Currently
            </dt>
            <dd className="mt-2 text-sm leading-6 text-neutral-300">
              QuickRN — Web Dev &amp; Data Ops
              <br />
              Seneca Works — Career Peer
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Based in
            </dt>
            <dd className="mt-2 text-sm leading-6 text-neutral-300">
              Toronto, Canada
            </dd>
          </div>
        </dl>
      </div>

      {/* Portrait: a tall editorial frame. Grayscale at rest, colour on
          hover; the image drifts slightly with the cursor and scroll. */}
      {/* Fade, not clip: a clipped entrance hides the LCP element and
          inflates LCP by seconds on slow devices. */}
      <figure
        className="anim-portrait group mt-16 self-start md:col-start-2 md:row-start-1 md:mt-2"
        style={{ "--d": "0.1s" } as React.CSSProperties}
      >
        <div
          data-cursor="Hello"
          className="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-neutral-200"
        >
          <div data-parallax="14" className="absolute -inset-6">
            <picture>
              <source
                type="image/webp"
                srcSet="/portrait-hero-480.webp 480w, /portrait-hero-960.webp 960w"
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 340px, 100vw"
              />
              <img
                src="/portrait-hero-960.jpg"
                alt="Lionael Surya seated on a stool in a black shirt"
                width={960}
                height={1280}
                fetchPriority="high"
                className="portrait-breathe size-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </picture>
          </div>
        </div>
        <figcaption className="mt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <span>Seneca · Class of 2028</span>
          <span>Toronto</span>
        </figcaption>
      </figure>
    </section>
  );
}
