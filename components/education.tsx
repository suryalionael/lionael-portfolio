const COURSEWORK = [
  "Simulation & modelling",
  "Machine learning",
  "Statistics & probability",
  "Database design & SQL",
  "Data structures & algorithms",
];

const TECHNOLOGIES = ["Python", "R", "SQL", "Power BI", "Tableau"];

export function Education() {
  return (
    <section id="education" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Education
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
          <div className="font-mono text-xs leading-6 text-muted">
            <span className="block">2024 — present</span>
            <span className="block">Seneca Polytechnic</span>
            <span className="block">Toronto, Canada</span>
          </div>

          <div>
            <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
              Data Science &amp; Analytics
            </h3>
            <p className="mt-4 max-w-[40rem] text-lg leading-8 text-neutral-400">
              President&apos;s Honour List recipient and SSF International
              Student Merit Award scholar. Throughout my first four semesters at
              Seneca Polytechnic, I balanced multiple part-time roles while
              building production software for real organizations. The classroom
              provides the theory; my projects are where I turn it into reliable
              systems.
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Coursework
                </p>
                <ul className="mt-3 space-y-1.5">
                  {COURSEWORK.map((course) => (
                    <li
                      key={course}
                      className="text-base leading-relaxed text-neutral-300"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  Technologies
                </p>
                <ul className="mt-3 space-y-1.5">
                  {TECHNOLOGIES.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-base leading-relaxed text-neutral-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
