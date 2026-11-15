import Image from "next/image";
import { featuredProjects, type Project } from "@/lib/projects";
import { Archive } from "@/components/archive";
import { HashRedirect } from "@/components/hash-redirect";

// Four featured systems as full cards, then the archive table.
// Case studies are real pages (/work/[slug]); the navigation is a plain
// anchor so cross-document view transitions can morph card → page.
export function Work() {
  return (
    <>
      <HashRedirect />
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <div
            key={project.slug}
            data-reveal
            style={{ "--i": i % 2 } as React.CSSProperties}
            className="flex"
          >
            <div data-tilt className="relative flex w-full">
              <ProjectCard project={project} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-28">
        <Archive />
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const image =
    project.thumb === "architecture" ? undefined : project.images?.[0];

  return (
    <article data-cursor="View" className="group relative flex w-full flex-col">
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/[0.08] bg-ink-raised transition-colors duration-300 group-hover:border-white/20"
        style={{ viewTransitionName: `card-${project.slug}` }}
      >
        {image ? (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <ArchThumb project={project} />
        )}
      </div>

      <p className="mt-5 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
        {project.live && (
          <span className="dot-live inline-block size-1.5 rounded-full bg-accent" />
        )}
        {project.category} · {project.year}
      </p>
      <h3
        className="mt-2 text-2xl font-medium tracking-tight text-paper"
        style={{ viewTransitionName: `title-${project.slug}` }}
      >
        <a
          href={`/work/${project.slug}`}
          className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-8 focus-visible:after:outline-accent"
        >
          {project.title}
        </a>
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
        {project.summary}
      </p>
      <p className="mt-4 font-mono text-[11px] leading-5 text-neutral-500">
        {project.tags.join(" · ")}
      </p>

      <div className="mt-auto flex items-center gap-6 pt-5 text-sm">
        <span className="font-medium text-neutral-300 transition-colors group-hover:text-paper">
          Case study{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link relative z-10 text-neutral-400 transition-colors hover:text-paper"
          >
            Live <span aria-hidden="true">↗</span>
            <span className="sr-only"> — {project.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}

// Projects without a screenshot get their real pipeline instead of a
// placeholder image.
function ArchThumb({ project }: { project: Project }) {
  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col justify-center px-7 py-6"
    >
      <ol className="relative space-y-2 border-l border-white/10 pl-5">
        {project.architecture.nodes.slice(0, 5).map((node) => (
          <li key={node.id} className="relative">
            <span className="absolute top-1.5 -left-[23.5px] size-1.5 rounded-full border border-white/25 bg-ink-raised" />
            <p className="font-mono text-[11px] tracking-[0.06em] text-neutral-300">
              {node.label}
            </p>
            <p className="font-mono text-[10px] text-neutral-600">
              {node.tech}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
