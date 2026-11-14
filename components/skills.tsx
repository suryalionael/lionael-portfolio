import { SplitHeading } from "@/components/split-heading";
const groups = [
  {
    name: "Languages",
    items: ["Python", "SQL", "R (tidyverse)", "TypeScript", "JavaScript"],
  },
  {
    name: "Data engineering",
    items: ["Kafka", "Spark Structured Streaming", "Delta Lake", "Airflow", "dbt", "DuckDB"],
  },
  {
    name: "Machine learning & AI",
    items: ["scikit-learn", "XGBoost", "SHAP", "Prophet", "Optuna", "Claude API"],
  },
  {
    name: "Backend & databases",
    items: ["FastAPI", "PostgreSQL", "PostGIS", "Supabase"],
  },
  {
    name: "Web",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    name: "Analytics & BI",
    items: ["Power BI", "Streamlit", "Tableau", "pandas", "Quarto / R Markdown"],
  },
  {
    name: "Testing & DevOps",
    items: ["pytest", "Playwright", "Docker", "GitHub Actions", "Terraform"],
  },
  {
    name: "Automation",
    items: ["Google Apps Script", "Power Automate"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p data-reveal className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Skills
        </p>
        <SplitHeading
          className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl"
          text="What I work with."
        />
        <p data-reveal className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
          Grouped by the job to be done — nearly every tool here appears in a
          system above.
        </p>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <div
              key={group.name}
              data-reveal
              style={{ "--i": i % 4 } as React.CSSProperties}
            >
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
