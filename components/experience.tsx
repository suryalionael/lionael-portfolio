// Source of truth: the role-specific resumes in /public/resumes.
// Most recent first.
const roles = [
  {
    years: "Sep 2026 — present",
    org: "Seneca Works, Seneca Polytechnic",
    place: "Toronto, Canada",
    role: "Career Peer",
    summary:
      "A part-time role in Seneca's career centre, helping students and alumni get their applications ready.",
    points: [
      "Review resumes and cover letters and give written feedback on clarity and accuracy.",
      "Direct students and alumni to job-board access and career resources; support Career Threads workshops and events.",
      "Keep student-support records up to date in SharePoint.",
    ],
    stack: [],
  },
  {
    years: "Jul 2025 — present",
    org: "QuickRN Canada",
    place: "Remote",
    role: "Web Development and Data Operations",
    summary:
      "QuickRN is a nursing-education company. I started on exam-prep content data and website support, then moved into building the team's software.",
    points: [
      "Built Aspen OS solo — the tasks, kanban, and documentation platform the team uses daily — with Supabase row-level security, versioned migrations, and Playwright end-to-end tests.",
      "Delivered three production websites from concept to deployment, turning non-technical stakeholders' needs into requirements and maintaining each site after launch.",
      "Maintain WordPress content, troubleshoot website and online-course access issues, and document each fix for customer inquiries.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Playwright", "Vercel", "WordPress"],
    learned:
      "Building for real users meant working with non-technical stakeholders, figuring out what they actually need, and maintaining things after launch. That full cycle was valuable.",
  },
  {
    years: "Aug 2025 — Sep 2026",
    org: "PERMIKA Toronto",
    place: "Toronto, Canada",
    role: "IT & Media Strategy Associate",
    summary:
      "IT and media work for PERMIKA Toronto, a volunteer-run Indonesian student organization.",
    points: [
      "Built and maintained internal tools for event management and member engagement.",
      "Led the social media campaign for League of Toronto 2026, the organization's annual event, coordinating a team of ten from planning through delivery.",
    ],
    stack: [],
    learned:
      "Working with volunteers taught me that leading without authority requires earning trust rather than relying on hierarchy.",
  },
  {
    years: "Jun — Aug 2025",
    org: "CV. Veda Sakti Dharma",
    place: "Jakarta, Indonesia",
    role: "Software Engineering Intern",
    summary: "My first internship: internal payroll software at a small firm.",
    points: [
      "Developed and tested a Python application that automates PPh 21 (Indonesian income tax) calculations and payslip generation.",
      "Validated outputs against payroll records and debugged calculation issues before reporting; organized payroll data to make reporting more efficient.",
    ],
    stack: ["Python"],
    learned:
      "Payroll software needs to be correct every time. That was a good standard to learn early.",
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
          Four roles, most recent first.
        </p>

        <ol className="mt-16 border-t border-white/[0.06]">
          {roles.map((r) => (
            <li
              key={r.org}
              className="grid gap-5 border-b border-white/[0.06] py-12 md:grid-cols-[220px_1fr] md:gap-12"
            >
              <div className="font-mono text-xs leading-6 text-muted">
                <span className="block text-neutral-300">{r.years}</span>
                <span className="block">{r.place}</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium tracking-tight md:text-[1.75rem]">
                  {r.role}
                </h3>
                <p className="mt-1 text-base text-neutral-300">{r.org}</p>
                <p className="mt-5 max-w-[40rem] text-lg leading-8 text-neutral-400">
                  {r.summary}
                </p>
                <ul className="mt-4 max-w-[40rem] space-y-2.5">
                  {r.points.map((point) => (
                    <li
                      key={point.slice(0, 24)}
                      className="relative pl-5 text-base leading-7 text-neutral-300 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2.5 before:bg-neutral-600"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                {r.learned && (
                  <p className="mt-6 max-w-[40rem] border-l border-white/10 pl-4 text-base leading-7 text-neutral-400 italic">
                    {r.learned}
                  </p>
                )}
                {r.stack.length > 0 && (
                  <p className="mt-6 font-mono text-[11px] text-neutral-500">
                    {r.stack.join(" · ")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
