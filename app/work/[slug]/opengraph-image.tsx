import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return [
    {
      id: "og",
      alt: project
        ? `${project.title} — ${project.summary}`
        : "Lionael Surya — case study",
      size,
      contentType,
    },
  ];
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const [geist, geistMono] = await Promise.all([
    readFile(join(process.cwd(), "lib/og/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "lib/og/GeistMono-Regular.ttf")),
  ]);

  const title = project?.title ?? "Case study";
  const meta = project
    ? `${project.category} · ${project.year}`
    : "Lionael Surya";
  const stages = project?.architecture.nodes.map((n) => n.label) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0a0a0a",
          padding: "72px 84px",
        }}
      >
        <div
          style={{
            fontFamily: "GeistMono",
            fontSize: 22,
            letterSpacing: "0.2em",
            color: "#8a8a8a",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Lionael Surya · {meta}
        </div>
        <div
          style={{
            fontFamily: "Geist",
            fontSize: title.length > 22 ? 86 : 110,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#fafafa",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 64,
            gap: 18,
          }}
        >
          {stages.slice(0, 5).map((stage, i) => (
            <div
              key={stage}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                flexGrow: i > 0 ? 1 : 0,
              }}
            >
              {i > 0 && (
                <div
                  style={{
                    height: 1,
                    flexGrow: 1,
                    background: "rgba(255,255,255,0.14)",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "GeistMono",
                  fontSize: 19,
                  color: "#8a8a8a",
                }}
              >
                {i === stages.slice(0, 5).length - 1 && (
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      background: "#3e63dd",
                    }}
                  />
                )}
                {stage}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, weight: 500, style: "normal" },
        { name: "GeistMono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
