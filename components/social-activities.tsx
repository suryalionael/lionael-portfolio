const activities = [
  {
    role: "Student council president",
    org: "SMAK Penabur Summarecon Bekasi",
    years: "2023 — 2024",
    photo: "Council year, 2023",
    body: "Led the student council through a full year of initiatives — the liaison between students, faculty, and administration. The council earned its Golden Flag certification with a near-perfect 248 of 251 score, and brought Easter to the children of Immaculatta orphanage.",
  },
  {
    role: "Chief committee — SUBSCRIBE 6",
    org: "LOSPELAGO festival",
    years: "2023",
    photo: "Opening ceremony, 2023",
    body: "Directed the school's flagship event: a seven-day sport-and-art festival, from budget and logistics to delivering the opening speech — and playing the lead in the opening-night theatre performance.",
  },
  {
    role: "Alumni visit organizer",
    org: "SMAK Penabur Summarecon Bekasi",
    years: "2025",
    photo: "Alumni visit, 2025",
    body: "Co-led the school's alumni day from the other side of the world — managing the event's online operations from Toronto, connecting alumni with students preparing for university.",
  },
];

export function SocialActivities() {
  return (
    <section id="community" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Social activities
        </p>
        <h2 className="mt-4 text-4xl font-medium tracking-[-0.03em] md:text-5xl">
          Leadership before software.
        </h2>
        <p className="mt-5 max-w-[34rem] leading-relaxed text-neutral-400">
          The first systems I ran were made of people. These are the ones I&apos;m
          proudest of.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {activities.map((activity) => (
            <article key={activity.role}>
              <div
                aria-hidden="true"
                className="flex aspect-[4/3] items-center justify-center rounded-xl border border-white/[0.08] bg-ink-raised/60"
              >
                <span className="font-mono text-[11px] text-neutral-400">
                  {activity.photo}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-tight">
                {activity.role}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">
                {activity.org} · {activity.years}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {activity.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
