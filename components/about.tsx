import Image from "next/image";
import portrait from "@/public/portrait.png";

export function About() {
  return (
    <section id="about" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={portrait}
                alt="Lionael Surya, seated on a stool in a studio, wearing a black shirt"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div className="mt-5 font-mono text-xs leading-6 text-muted">
              <p>Toronto, Canada — from Bekasi, Indonesia</p>
              <p>Seneca Polytechnic · Data Science</p>
              <p>President&apos;s Honour List · Winter 2026</p>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              About
            </p>
            <h2 className="mt-4 max-w-[14ch] text-4xl font-medium tracking-[-0.03em] md:text-5xl">
              Why I build this way.
            </h2>

            <div className="mt-10 space-y-6 text-lg leading-8 text-neutral-300">
              <p>
                I grew up in Bekasi, Indonesia, and moved to Toronto to study
                data science. The first thing I ever led wasn&apos;t a system —
                it was people: a student council, then a seven-day school
                festival. I learned early that things go well when someone
                cares about the details nobody sees. That instinct never left;
                it just found software.
              </p>
              <p>
                I enjoy building because software is honest leverage. A
                pipeline that runs every morning without me, a dashboard a
                stranger can audit, an internal tool a team quietly depends on
                — each one is a small process rescued from spreadsheets and
                memory. Most of what I build starts the same way: noticing
                something messy that deserves better.
              </p>
              <p>
                Production quality matters to me because unverified work
                quietly becomes someone else&apos;s problem. So I hold my
                projects to the standard of a real team: real data only, tests
                before anything is published, and decisions documented —
                including the time a simpler model beat the sophisticated one
                and shipped instead. If a claim can&apos;t survive an audit, it
                isn&apos;t finished.
              </p>
              <p>
                Right now that looks like honour-list semesters balanced
                against two part-time jobs, and a queue of systems I still
                want to build. What motivates me isn&apos;t the tools — it&apos;s
                the moment a thing I made becomes something a person can
                trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
