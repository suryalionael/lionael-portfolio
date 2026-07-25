const chapters = [
  {
    index: "01",
    years: "Jun — Aug 2025",
    org: "CV. Veda Sakti Dharma",
    place: "Indonesia",
    role: "Software Engineering Intern",
    context:
      "My first internship. I built internal software for payroll automation at a small firm in Indonesia.",
    built:
      "Developed a Python application that automated PPh 21 income tax calculations and generated employee payslips. I also helped organize employee and payroll data to make reporting more efficient.",
    learned:
      "Payroll software needs to be correct every time. That was a good standard to learn early.",
  },
  {
    index: "02",
    years: "Jul 2025 — present",
    org: "QuickRN",
    place: "Remote",
    role: "Web development & data operations",
    context:
      "Started at a nursing-education company managing exam-prep content data, then moved into building software for the organization.",
    built:
      "Three production websites from concept to deployment. Also built Aspen OS, an internal platform for tasks, documentation, and collaboration that the team uses daily.",
    learned:
      "Building for real users meant working with non-technical stakeholders, figuring out what they actually need, and maintaining things after launch. That full cycle was valuable.",
  },
  {
    index: "03",
    years: "Aug 2025 — present",
    org: "PERMIKA Toronto",
    place: "Toronto, Canada",
    role: "IT & media strategy associate",
    context:
      "Working across IT and strategy at PERMIKA Toronto, an Indonesian student organization in Canada. I build and maintain systems that support the organization's operations and events.",
    built:
      "Internal tools for event management and member engagement. Led the social media campaign for League of Toronto 2026, the organization's annual event, coordinating a team of ten from planning through delivery.",
    learned:
      "Working with volunteers taught me that leading without authority requires earning trust rather than relying on hierarchy.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Experience
        </p>
        <h2 className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl">
          The journey so far.
        </h2>
        <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
          Three roles, in order.
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
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {chapter.role}
                </h3>
                <p className="mt-4 max-w-[40rem] text-lg leading-8 text-neutral-400">
                  {chapter.context}
                </p>
                <p className="mt-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Built
                </p>
                <p className="mt-2 max-w-[40rem] text-lg leading-8 text-neutral-300">
                  {chapter.built}
                </p>
                <p className="mt-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Learned
                </p>
                <p className="mt-2 max-w-[40rem] text-lg leading-8 text-neutral-300">
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
