import { PhotoFade, type FadePhoto } from "@/components/photo-fade";

type Activity = {
  role: string;
  org: string;
  years: string;
  body: string;
  photos: FadePhoto[];
};

const activities: Activity[] = [
  {
    role: "Student council president",
    org: "SMAK Penabur Summarecon Bekasi",
    years: "2023 — 2024",
    body: "Led the student council through a full year of initiatives — the liaison between students, faculty, and administration. The council earned its Golden Flag certification with a near-perfect 248 of 251 score, and brought Easter to the children of Immaculatta orphanage.",
    photos: [
      {
        src: "/photos/council-1.jpg",
        alt: "Lionael receiving the council flag at the student council handover ceremony",
      },
      {
        src: "/photos/council-2.jpg",
        alt: "Student council members at a school event",
      },
      {
        src: "/photos/council-3.jpg",
        alt: "Student council gathered for the Golden Flag certification",
      },
      {
        src: "/photos/council-4.jpg",
        alt: "Council visit to Immaculatta orphanage",
      },
    ],
  },
  {
    role: "Chief committee — SUBSCRIBE 6",
    org: "LOSPELAGO festival",
    years: "2023",
    body: "Directed the school's flagship event: a seven-day sport-and-art festival, from budget and logistics to delivering the opening speech — and playing the lead in the opening-night theatre performance.",
    photos: [
      {
        src: "/photos/committee-1.jpg",
        alt: "Lionael with the LOSPELAGO festival committee in the school hall",
      },
      {
        src: "/photos/committee-2.jpg",
        alt: "SUBSCRIBE 6 festival event in progress",
      },
      {
        src: "/photos/committee-3.jpg",
        alt: "Committee members at the festival closing",
      },
    ],
  },
  {
    role: "Alumni visit organizer",
    org: "SMAK Penabur Summarecon Bekasi",
    years: "2025",
    body: "Co-led the school's alumni day from the other side of the world — managing the event's online operations from Toronto, connecting alumni with students preparing for university.",
    photos: [
      {
        src: "/photos/alumni-1.jpg",
        alt: "Students signing the alumni visit banner at the talkshow and workshop",
      },
      {
        src: "/photos/alumni-2.jpg",
        alt: "Alumni sharing session with students",
      },
    ],
  },
];

export function SocialActivities() {
  return (
    <section id="community" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Social activities
        </p>
        <h2 className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl">
          Leadership before software.
        </h2>
        <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
          The first systems I ran were made of people. These are the ones I&apos;m
          proudest of.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {activities.map((activity) => (
            <article key={activity.role}>
              <PhotoFade
                photos={activity.photos}
                sizes="(min-width: 768px) 352px, 100vw"
                className="aspect-[4/3] rounded-xl border border-white/[0.08]"
              />
              <h3 className="mt-5 text-xl font-medium tracking-tight">
                {activity.role}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">
                {activity.org} · {activity.years}
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-400">
                {activity.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
