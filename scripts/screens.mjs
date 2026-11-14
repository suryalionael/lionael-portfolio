// Screenshot the key pages at the five review widths.
//
//   node scripts/screens.mjs [baseURL]
//
// Defaults to http://localhost:3000 (start `npm run dev` or `npm run start`
// first). Scrolls through each page before capturing so scroll reveals fire.
// Output: .screens/<page>-<width>.png
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const widths = [360, 390, 768, 1024, 1440];
const pages = [
  { path: "/", name: "home" },
  { path: "/resume", name: "resume" },
  { path: "/work/aspen-os", name: "work-aspen-os", optional: true },
];

await mkdir(".screens", { recursive: true });
const browser = await chromium.launch();

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    hasTouch: width < 768,
  });
  for (const page of pages) {
    const tab = await context.newPage();
    const res = await tab
      .goto(`${base}${page.path}`, { waitUntil: "networkidle" })
      .catch(() => null);
    if (!res || !res.ok()) {
      if (!page.optional) {
        console.error(`FAIL ${page.path} at ${width}px: ${res?.status() ?? "no response"}`);
        process.exitCode = 1;
      }
      await tab.close();
      continue;
    }
    // Walk down the page so IntersectionObserver reveals fire, then return.
    await tab.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await tab.waitForTimeout(1200);
    await tab.screenshot({
      path: `.screens/${page.name}-${width}.png`,
      fullPage: true,
    });
    console.log(`ok ${page.name}-${width}.png`);
    await tab.close();
  }
  await context.close();
}

await browser.close();
