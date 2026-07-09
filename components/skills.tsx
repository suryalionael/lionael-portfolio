const groups = [
  {
    name: "Programming",
    items: ["Python", "SQL", "TypeScript", "JavaScript", "R"],
  },
  {
    name: "Data",
    items: ["dbt", "Spark", "Kafka", "Airflow", "DuckDB", "Delta Lake"],
  },
  {
    name: "Machine learning",
    items: ["scikit-learn", "XGBoost", "Prophet", "SHAP", "Optuna"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MongoDB", "Neo4j"],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    name: "Automation & DevOps",
    items: [
      "Google Apps Script",
      "Power Automate",
      "Make",
      "Docker",
      "GitHub Actions",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Skills
        </p>
        <h2 className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl">
          What I work with.
        </h2>
        <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
          Grouped by the job to be done — nearly every tool here appears in a
          system above.
        </p>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.name}>
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                {group.name}
              </p>
              <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-base leading-relaxed text-neutral-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
