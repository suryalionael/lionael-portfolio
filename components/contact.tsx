import { SplitHeading } from "@/components/split-heading";
import { ResumeCta } from "@/components/role-lens";

export function Contact() {
  return (
    <section id="contact" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-32 md:py-44">
        <p
          data-reveal
          data-scramble
          className="font-mono text-xs tracking-[0.18em] text-muted uppercase"
        >
          Contact &amp; resume
        </p>
        <SplitHeading
          className="mt-6 max-w-[16ch] text-5xl leading-[1.04] font-medium tracking-[-0.04em] md:text-8xl"
          text="Let’s build something that holds up."
        />
        <p
          data-reveal
          className="mt-8 max-w-[38rem] text-lg leading-relaxed text-neutral-400"
        >
          I&apos;m looking for a Summer 2027 co-op in data engineering,
          analytics, machine learning, or software. My resume comes in versions
          tailored to each of those tracks — take the one that fits your role,
          or just write to me.
        </p>

        <div
          data-reveal
          className="mt-14 flex flex-col items-start gap-8 border-t border-white/[0.08] pt-10 md:flex-row md:items-center md:justify-between"
        >
          <a
            href="mailto:suryalionael@gmail.com"
            className="u-link text-2xl font-medium tracking-tight text-paper md:text-4xl"
          >
            suryalionael@gmail.com
          </a>
          <ResumeCta variant="contact" />
        </div>

        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <a
            href="https://www.linkedin.com/in/lionael-dwitama/"
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-base text-neutral-400 transition-colors hover:text-paper"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/suryalionael"
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-base text-neutral-400 transition-colors hover:text-paper"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
