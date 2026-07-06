const chapters = [
  {
    index: "01",
    years: "2023 — 2024",
    org: "SMAK Penabur Summarecon Bekasi",
    place: "Bekasi, Indonesia",
    role: "Student council president & event chief",
    context:
      "Before any software, I led people. As student council president I ran a year of initiatives, and as chief committee of SUBSCRIBE 6 — our seven-day sport-and-art festival — I led the team that pulled it off, from the opening speech to closing night.",
    built:
      "A council that earned its Golden Flag certification with a near-perfect score (248 of 251), and a festival an entire school remembers.",
    learned:
      "Logistics, stakeholders, and staying calm when the schedule slips. Organizations run on unglamorous details — a lesson that transferred directly to engineering.",
  },
  {
    index: "02",
    years: "2024 — 2025",
    org: "Aux Merveilleux de Fred",
    place: "Toronto, Canada",
    role: "Sales support",
    context:
      "My first job after moving to Canada: a French pâtisserie where I oversaw inventory and stock movement and kept the daily and weekly documentation accurate.",
    built:
      "Reliable records under real-world constraints — daily counts, cash precision, no room for roughly right.",
    learned:
      "How much of a business lives in spreadsheets and memory. I started noticing every process that deserved to be automated — and wanting to be the one to build it.",
  },
  {
    index: "03",
    years: "2025 — present",
    org: "QuickRN",
    place: "Remote",
    role: "Web development & data operations",
    context:
      "A nursing-education company where I moved from managing exam-prep content data to building the organization's software.",
    built:
      "Three production websites from concept to deployment, and Aspen OS — the internal project-management platform the team now runs on: tasks, kanban boards, documentation, and collaboration in one place.",
    learned:
      "What shipping actually means: turning requirements from non-technical stakeholders into a product, deploying it, and maintaining it. Real users are the most honest code review.",
  },
  {
    index: "04",
    years: "2025 — present",
    org: "PERMIKA Toronto",
    place: "Toronto, Canada",
    role: "IT & media strategy associate",
    context:
      "One of Canada's largest Indonesian student organizations, where I work across the IT and strategic-operations divisions on internal systems, workflows, and automation.",
    built:
      "Better tooling for events and member engagement — and an Instagram campaign for League of Toronto 2026, the organization's biggest event, where I led a team of ten.",
    learned:
      "Technology is leverage for communities, not just companies. And leading peers — where nobody reports to you — is its own engineering discipline.",
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
          Four chapters, in order — each one changed how I build.
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
