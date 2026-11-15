import { testimonials } from "@/lib/testimonials";

// Renders only when real, approved entries exist in lib/testimonials.ts.
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-label="Testimonials" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p
          data-reveal
          data-scramble
          className="font-mono text-xs tracking-[0.18em] text-muted uppercase"
        >
          What people say
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.quote.slice(0, 32)} data-reveal>
              <blockquote className="text-xl leading-relaxed text-neutral-200 md:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-neutral-400">
                <span className="font-medium text-paper">{t.name}</span> —{" "}
                {t.role},{" "}
                {t.url ? (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link"
                  >
                    {t.org}
                  </a>
                ) : (
                  t.org
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
