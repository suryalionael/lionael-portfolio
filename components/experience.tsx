const chapters = [
  {
    index: "01",
    years: "Jun — Aug 2025",
    org: "CV. Veda Sakti Dharma",
    place: "Indonesia",
    role: "Student intern — payroll systems",
    context:
      "My first engineering internship: a firm where payroll ran on manual spreadsheets — including PPh 21, Indonesia's income-tax withholding calculation, recomputed by hand every cycle.",
    built:
      "A Python system for PPh 21 tax calculation, automated payroll reports, and an employee database — turning a monthly manual process into software the finance team can rerun on demand.",
    learned:
      "Payroll is unforgiving: a wrong number isn't a bug, it's someone's salary. Correctness, auditability, and boring reliability beat anything clever — a standard I've held every system to since.",
  },
  {
    index: "02",
    years: "Jul 2025 — present",
    org: "QuickRN",
    place: "Remote",
    role: "Web development & data operations",
    context:
      "A nursing-education company where I moved from managing exam-prep content data to owning the organization's software end to end.",
    built:
      "Three production websites from concept to deployment, and Aspen OS — the internal project platform the team now runs on daily: tasks, kanban boards, documentation, and collaboration in one place. It's documented as a case study above.",
    learned:
      "Ownership means the full lifecycle: requirements from non-technical stakeholders, deployment, and the maintenance that follows. Real users are the most honest code review I've had.",
  },
  {
    index: "03",
    years: "Aug 2025 — present",
    org: "PERMIKA Toronto",
    place: "Toronto, Canada",
    role: "IT & media strategy associate",
    context:
      "One of Canada's largest Indonesian student organizations, where I work across the IT and strategic-operations divisions on the systems the organization runs on.",
    built:
      "Internal workflows and automation for events and member engagement, and the Instagram campaign for League of Toronto 2026 — the organization's biggest event — where I led a team of ten from planning to delivery.",
    learned:
      "Technology is leverage for communities, not just companies. And leading peers — where nobody reports to you — is its own engineering discipline: alignment has to be earned, not assigned.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Experience
        </p>
        <h2 className="mt-4 text-4xl font-medium tracking-[-0.03em] md:text-5xl">
          The journey so far.
        </h2>
        <p className="mt-5 max-w-[34rem] leading-relaxed text-neutral-400">
          Three chapters, in order — each one raised the bar for the next.
        </p>

        <ol className="mt-16">
          {chapters.map((chapter, i) => (
            <li
              key={chapter.index}
              className={`grid gap-6 py-14 md:grid-cols-[220px_1fr] md:gap-12 ${
                i > 0 ? "border-t border-white/[0.06]" : "pt-0"
              }`}
            >
              <div className="font-mono text-xs leading-6 text-muted">
                <span className="block text-paper">{chapter.index}</span>
                <span className="mt-2 block">{chapter.years}</span>
                <span className="block">{chapter.org}</span>
                <span className="block">{chapter.place}</span>
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                  {chapter.role}
                </h3>
                <p className="mt-4 max-w-[40rem] leading-relaxed text-neutral-400">
                  {chapter.context}
                </p>
                <p className="mt-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Built
                </p>
                <p className="mt-2 max-w-[40rem] leading-relaxed text-neutral-300">
                  {chapter.built}
                </p>
                <p className="mt-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Learned
                </p>
                <p className="mt-2 max-w-[40rem] leading-relaxed text-neutral-300">
                  {chapter.learned}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
