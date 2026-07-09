export function WhyIBuild() {
  return (
    <section id="about" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[44rem] px-6 py-28 md:py-36">
        <p className="text-center font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Why I build
        </p>
        <h2 className="mt-4 text-center text-5xl font-medium tracking-[-0.03em] md:text-6xl">
          Details nobody sees.
        </h2>

        <div className="mt-12 space-y-8 text-xl leading-9 text-neutral-300">
          <p>
            I grew up in Bekasi, Indonesia, and moved to Toronto to study data
            science. The first thing I ever led wasn&apos;t a system — it was
            people: a student council, then a seven-day school festival. I
            learned early that things go well when someone cares about the
            details nobody sees. That instinct never left; it just found
            software.
          </p>
          <p>
            I build because software is honest leverage. A pipeline that runs
            every morning without me, a dashboard a stranger can audit, an
            internal tool a team quietly depends on — each one is a small
            process rescued from spreadsheets and memory. Most of my projects
            start the same way: noticing something messy that deserves better.
          </p>
          <p>
            Production quality matters to me because unverified work quietly
            becomes someone else&apos;s problem. So I hold my projects to the
            standard of a real team: real data only, tests before anything is
            published, and decisions documented — including the time a simpler
            model beat the sophisticated one and shipped instead. If a claim
            can&apos;t survive an audit, it isn&apos;t finished.
          </p>
          <p>
            What motivates me isn&apos;t the tools. It&apos;s the moment a
            thing I made becomes something a person can trust.
          </p>
        </div>
      </div>
    </section>
  );
}
