import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";

const upcoming = [
  {
    id: "work",
    title: "Selected work",
    note: "Six case studies — from streaming pipelines to shipped products.",
  },
  {
    id: "experience",
    title: "Experience",
    note: "QuickRN, PERMIKA Toronto, and leadership before that.",
  },
  {
    id: "about",
    title: "About",
    note: "Who I am and how I work.",
  },
  {
    id: "contact",
    title: "Contact",
    note: "suryalionael@gmail.com",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {upcoming.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="border-t border-white/[0.06]"
          >
            <div className="mx-auto max-w-[1120px] px-6 py-32">
              <h2 className="text-2xl font-medium tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 text-neutral-500">{section.note}</p>
            </div>
          </section>
        ))}
      </main>
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-8">
          <p className="font-mono text-xs text-neutral-600">
            © 2026 Lionael Surya
          </p>
          <p className="font-mono text-xs text-neutral-600">
            Toronto, Canada
          </p>
        </div>
      </footer>
    </>
  );
}
