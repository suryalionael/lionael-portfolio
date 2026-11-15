import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adjacentProjects, projects } from "@/lib/projects";
import { CaseStudyArticle } from "@/components/case-study-article";
import { Nav } from "@/components/nav";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      url: `/work/${project.slug}`,
      title: `${project.title} — Lionael Surya`,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Lionael Surya`,
      description: project.summary,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { prev, next } = adjacentProjects(project.slug);

  return (
    <>
      <Nav />
      <main id="main">
        <CaseStudyArticle project={project} />

        <nav
          aria-label="More projects"
          className="mx-auto max-w-[760px] px-6 pb-20"
        >
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
            {[
              { project: prev, label: "Previous", arrow: "←" },
              { project: next, label: "Next", arrow: "→" },
            ].map(({ project: p, label, arrow }) => (
              <div
                key={label}
                className={`bg-ink ${label === "Next" ? "sm:text-right" : ""}`}
              >
                {p ? (
                  <a
                    href={`/work/${p.slug}`}
                    className="group block h-full p-6 transition-colors hover:bg-ink-raised"
                  >
                    <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                      {label === "Previous" ? `${arrow} ${label}` : `${label} ${arrow}`}
                    </span>
                    <span className="mt-2 block text-lg font-medium text-neutral-200 transition-colors group-hover:text-paper">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm text-neutral-400">
                      {p.category}
                    </span>
                  </a>
                ) : (
                  // eslint-disable-next-line @next/next/no-html-link-for-pages
                  <a
                    href="/#work"
                    className="group block h-full p-6 transition-colors hover:bg-ink-raised"
                  >
                    <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                      {label === "Previous" ? `${arrow} ${label}` : `${label} ${arrow}`}
                    </span>
                    <span className="mt-2 block text-lg font-medium text-neutral-200 transition-colors group-hover:text-paper">
                      All systems
                    </span>
                    <span className="mt-1 block text-sm text-neutral-400">
                      Back to the overview
                    </span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </nav>
      </main>
    </>
  );
}
