import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Lionael Surya — Building systems people can depend on. Data Science · Data Engineering · Software Engineering, Toronto, Canada.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STAGES = ["source", "ingest", "transform", "model", "ship"];

export default async function OpenGraphImage() {
  const [geist, geistMono] = await Promise.all([
    readFile(join(process.cwd(), "lib/og/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "lib/og/GeistMono-Regular.ttf")),
  ]);

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
          Lionael Surya · Toronto, Canada · Data Science
        </div>
        <div
          style={{
            fontFamily: "Geist",
            fontSize: 124,
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 0.98,
            color: "#fafafa",
          }}
        >
          Building systems people can depend on.
        </div>
        <div
          style={{
            fontFamily: "GeistMono",
            fontSize: 24,
            color: "#8a8a8a",
            marginTop: 40,
          }}
        >
          Data Science · Data Engineering · Software Engineering
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 64,
            gap: 20,
          }}
        >
          {STAGES.map((stage, i) => (
            <div
              key={stage}
              style={{ display: "flex", alignItems: "center", gap: 20, flexGrow: i > 0 ? 1 : 0 }}
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
                  fontSize: 20,
                  color: "#8a8a8a",
                }}
              >
                {stage === "ship" && (
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
