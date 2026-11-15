# V3 Handoff: finish the last phase (OpenCode)

You are picking up the Lionael Surya portfolio v3 build mid-flight. All seven phases are implemented and pushed to branch `v3`. What remains is getting CI green, a short cleanup pass, and merging PR #1. Read this file fully, then `CLAUDE.md`, `docs/V3-PROMPT.md` (the original brief, still the source of truth for rules), and `docs/V3-LOG.md` (per-phase record).

## Repo and state

- Path: `/Users/lionaelsmac/Documents/Lio's Portofolio Website`
- Stack: Next.js 16, React 19, Tailwind 4, `motion`, `lenis`, `cmdk`, `@vercel/analytics`
- Branch: `v3` (pushed to `origin/v3`). PR: https://github.com/suryalionael/lionael-portfolio/pull/1 (`v3` into `main`)
- Phases 0 to 7 are done: tooling/CI, case-study pages, role lens, command palette, motion layer, mobile polish, credibility (numbers strip, empty testimonials slot, `/colophon`, README), terminal mode (`~`).
- Every phase had an independent reviewer pass; MUST findings were fixed.
- Local verification is green: `npx tsc --noEmit`, eslint, `npm run build`, `node scripts/smoke.mjs`.
- Local Lighthouse (mobile, production build, new headless): `/` 100/100/96/100, `/work/aspen-os` 100/100/96/100. Best Practices 96 is the Vercel Analytics script 404 off-Vercel, which is expected.

## The one blocking problem: CI Lighthouse performance

The GitHub Actions `build` job fails at the Lighthouse CI step: performance is 0.88 to 0.91 on `/`, budget is 0.95. Everything before it (typecheck, lint, build, smoke) passes.

What was established:

- The same runner scores **0.99** when Lighthouse is run directly with `--headless=new` (the diagnostics step in `ci.yml` printed `perf 0.99 LCP 0.9 s`). LHCI's own run gets LCP around 3.5 s.
- So the cause is almost certainly LHCI launching Chrome with old headless mode, not the site.
- A local run with 10x CPU slowdown also scored 0.99, so a real regression in the site is unlikely.

The fix that was about to be applied (the edit failed on a string mismatch, so **it is not in the repo yet**): in `.lighthouserc.js`, add to `ci.collect`:

```js
settings: {
  chromeFlags: '--headless=new',
},
```

Do this next, then push and watch the run:

```bash
git push && gh run watch $(gh run list --branch v3 --limit 1 --json databaseId -q '.[0].databaseId')
```

If it is still under 0.95 after the flag, in this order:

1. Read the "Lighthouse diagnostics on failure" step output, or open the uploaded report URL printed in the LHCI step, and find the real LCP element. Do not guess.
2. Known LCP candidate: the hero portrait (`public/portrait-hero-*.webp`, `fetchPriority="high"`, now a plain fade via `.anim-portrait`; it used to be a clip-path reveal, which was changed to stop hiding the LCP element). Verify it is discoverable in the initial HTML.
3. Initial JS is the next lever: `unused-javascript` showed about 98 KiB. The palette, terminal, and cmdk are lazy; check that nothing heavy (`lenis`, `motion`, `@vercel/analytics`) landed in the first load that does not need to.
4. Only as a last resort, relax the CI budget to 0.90 and say so in the PR. The brief's target is 95+, so prefer fixing it.

When CI is green, delete the "Lighthouse diagnostics on failure" step from `.github/workflows/ci.yml` (it is temporary).

## Gotchas learned the hard way

- **The local `npm run lint` goes through an `rtk` wrapper that hid a real error CI caught** (`react-hooks/set-state-in-effect`). Use `rtk proxy npx eslint .` or call `./node_modules/.bin/eslint .` directly before every push. If a `setState` inside an effect is intentional, add `// eslint-disable-next-line react-hooks/set-state-in-effect`.
- Do not rebuild `.next` while `next start` is running; it serves broken CSS. Always `lsof -ti :3000 | xargs kill` before `npm run build`, then restart.
- Playwright screenshots: `node scripts/screens.mjs` (needs the server on :3000), output in `.screens/` (git-ignored). The script scrolls first so reveals fire.
- Never add `Co-Authored-By` trailers or "Generated with Claude Code" lines to commits or the PR body (user's global rule).
- `html.js` guard: reveal styles only apply with `.js` on `<html>`; the inline head script in `app/layout.tsx` removes it after 3 s if the bundle never hydrates. Do not break that.
- Role lens state is `?role=` + localStorage, **home page only** for URL syncing (`components/role-context.tsx`).
- Overlays (palette, mobile menu, terminal) share `components/use-dialog.ts` for focus trap, Escape, and scroll lock. Reuse it for anything new.

## Remaining cleanup (do after CI is green; none are blockers)

From the final review, not yet done. Pick the cheap ones; each is a small commit:

1. `components/case-study-article.tsx`: on phones the swipe strip and the desktop gallery both exist in the DOM, so screen readers hear every image twice. Put `aria-hidden` and `inert` on whichever variant is CSS-hidden.
2. `components/ambient.tsx` scramble: `aria-label` on a `<p>` is ignored by most screen readers, so mid-scramble text can be read as glyph noise. Better: scramble a visual clone inside an `aria-hidden` span next to an `sr-only` original.
3. `components/palette.tsx` and `components/skills.tsx` use `scrollIntoView({ behavior: "smooth" })`, which fights Lenis on wheel. Prefer `lenis.scrollTo`, or expose the Lenis instance.
4. `.lighthouserc.js` only budgets `/` and `/work/aspen-os`; `/resume` (90) and `/colophon` (95) are not budgeted by design. Leave as is unless asked.

## Definition of done (from the original brief)

- All phases merged to `main`, CI green, production deploy healthy.
- Lighthouse mobile at least 95 in all four categories on `/` and one `/work` page.
- No invented facts; no placeholder content visible in production.
- `docs/V3-LOG.md` complete with the final list of things Lio must supply.

## Merge

When CI is green and the Vercel preview for the PR looks right (check `/`, `/work/aspen-os`, `/colophon`, `/?role=ml`, press `⌘K` and `~`), merge PR #1 **with a merge commit** (keep history), not squash:

```bash
gh pr merge 1 --merge
```

Then confirm the production deployment on Vercel is healthy and that `https://lionael-portfolio.vercel.app/work/aspen-os` loads. Add a short closing entry to `docs/V3-LOG.md` (final scores, deploy status) and commit it to `main` or on `v3` before merging.

## What Lio still needs to supply (already listed in `docs/V3-LOG.md`; repeat these in your final message)

1. Confirm the featured four: Aspen OS, Streaming Clickstream Pipeline, FraudLens, Nutrition Priority Index.
2. Confirm the four role pitch lines and the role to resume mapping (`data-engineer`, `ai-ml-engineering`, `data-analytics-bi`, `software-web-fullstack`).
3. Confirm the numbers-strip figures: 7 systems live in production (`live: true` count), 21 case studies (`projects.length`), 17 resumes (`resumes.length`), GPA 3.9 / 4.0 (education section copy).
4. Real, approved testimonials for `lib/testimonials.ts` (the section renders nothing until then; never invent entries).
5. Whether per-project GitHub links should return on case-study pages (removed on purpose in the baseline work).

## Ground rules that still apply

Never invent facts. No fake social proof. Dark-first, black/white/greys, one electric-blue accent under 10% of any screen, Geist and Geist Mono only. Motion must guide attention and degrade cleanly (reduced motion, touch, no JS). WCAG AA. Keep commits small with conventional messages, and run typecheck, eslint, and build before each commit. Stop and ask Lio if a check fails twice or if something would be hard to undo.
