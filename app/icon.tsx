import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const geistMono = await readFile(
    join(process.cwd(), "lib/og/GeistMono-Regular.ttf"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 7,
          color: "#fafafa",
          fontFamily: "GeistMono",
          fontSize: 15,
        }}
      >
        ls
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "GeistMono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
