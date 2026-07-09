export function Contact() {
  return (
    <section id="contact" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-32 md:py-44">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Contact
        </p>
        <h2 className="mt-6 max-w-[24ch] text-5xl leading-[1.08] font-medium tracking-[-0.03em] md:text-7xl">
          The pipeline ends here. Let&apos;s build the next one together.
        </h2>
        <a
          href="mailto:suryalionael@gmail.com"
          className="u-link mt-12 inline-block text-2xl font-medium text-paper md:text-4xl"
        >
          suryalionael@gmail.com
        </a>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="https://github.com/suryalionael"
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-base text-neutral-400 transition-colors hover:text-paper"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/lionael-dwitama/"
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-base text-neutral-400 transition-colors hover:text-paper"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
