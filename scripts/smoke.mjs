// CI smoke test: each page loads, renders its key elements, and logs no
// console errors.
//
//   node scripts/smoke.mjs [baseURL]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const checks = [
  { path: "/", selectors: ["h1", "#work", "#contact", "nav"] },
  { path: "/resume", selectors: ["h1", "a[href$='.pdf']"] },
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
let failed = false;

for (const check of checks) {
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const url = msg.location()?.url ?? "";
    // The Vercel Analytics script only exists on Vercel deployments.
    if (url.includes("/_vercel/")) return;
    errors.push(`${msg.text()} (${url})`);
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  const res = await page.goto(`${base}${check.path}`, { waitUntil: "networkidle" });
  if (!res?.ok()) {
    console.error(`FAIL ${check.path}: HTTP ${res?.status() ?? "no response"}`);
    failed = true;
  }
  for (const selector of check.selectors) {
    const visible = await page
      .locator(selector)
      .first()
      .isVisible()
      .catch(() => false);
    if (!visible) {
      console.error(`FAIL ${check.path}: "${selector}" not visible`);
      failed = true;
    }
  }
  // Ignore third-party noise; fail on anything from our own origin.
  const own = errors.filter((e) => !/analytics|third-party/i.test(e));
  if (own.length) {
    console.error(`FAIL ${check.path}: console errors:\n  ${own.join("\n  ")}`);
    failed = true;
  }
  if (!failed) console.log(`ok ${check.path}`);
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
