# Portfolio v3: build brief for Claude Code

You are upgrading Lionael Surya's portfolio (Next.js 16, React 19, Tailwind 4,
`motion`, deployed on Vercel from `main`). The goal is the best student tech
portfolio a data/software recruiter has seen: minimal, classy, fast, deeply
interactive, and fully responsive. Take your time, think hard about every
design decision, and hold the bar from `CLAUDE.md` ("never settle for good
enough"). Use subagents where they help, especially for independent review.

Read first: `CLAUDE.md`, `PROJECT.md`, `docs/PORTFOLIO_PRINCIPLES.md`,
`lib/projects.ts`, `lib/resumes.ts`, `components/ambient.tsx`, `app/globals.css`.

---

## Ground rules

1. **Never invent facts.** Every claim, number, metric, date, role and
   quote must already exist in this repo (projects, experience, education,
   resumes). If something you want isn't there, leave a clearly marked TODO
   and list it in the PR description for Lio to fill in.
2. **No fake social proof.** No made-up testimonials, endorsements, client
   logos or reviews. The testimonial component (Phase 6) renders nothing until
   real, approved entries exist in `lib/testimonials.ts`.
3. **Design guardrails (from CLAUDE.md):** dark-first, black/white/greys,
   one accent (`--color-accent`, electric blue) under 10% of any screen,
   Geist + Geist Mono only, generous whitespace. No neon, no particles
   everywhere, no scroll hijacking, no loading screen, no infinite spinning.
   Every animation must guide attention or give feedback.
4. **Motion must degrade cleanly:** `prefers-reduced-motion` turns off
   non-essential motion; touch devices get tap feedback instead of
   cursor effects; nothing is hidden if JS fails (reveals must not trap
   content at opacity 0 without JS; add a `<noscript>` or `.js` class guard).
5. **Accessibility:** WCAG AA contrast, full keyboard support, visible focus,
   semantic HTML, correct dialog/combobox ARIA, skip link kept.
6. **Performance:** Lighthouse mobile ≥ 95 for Performance, Accessibility,
   Best Practices and SEO on `/` and one `/work/[slug]` page. Keep client JS
   small: server components by default, `"use client"` only where needed,
   lazy-load anything heavy (canvas, palette, terminal).
7. **Dependencies:** prefer what's installed. Allowed additions if they earn
   it: `lenis`, `cmdk`, `@vercel/analytics`, `@lhci/cli` (dev). Ask before
   adding anything else.
8. **Responsive:** test every change at 360, 390, 768, 1024 and 1440 px wide.
   No horizontal scroll, no clipped text, touch targets ≥ 44px.

---

## Git workflow (commit and push gradually)

- Branch: create `v3` from `main`. All work happens on `v3`.
- **Commit small and often:** one focused change per commit, conventional
  messages (`feat:`, `fix:`, `refactor:`, `chore:`, `test:`, `docs:`).
- **Before every commit:** `npx tsc --noEmit`, `npm run lint`,
  `npm run build` must pass.
- **Push after every 1–3 commits** so Vercel builds a preview.
- **End of each phase:**
  1. Run the Playwright screenshot script at all five widths, open the images
     and check them yourself. Fix anything off before moving on.
  2. Run Lighthouse (local `lhci` or the preview URL) and record the scores.
  3. Spawn a reviewer subagent that has NOT seen your work. Give it the
     screenshots and the diff, and ask it to critique as a senior product
     designer + staff frontend engineer. Fix what's valid.
  4. Open (or update) a PR `v3 → main` with: what changed, screenshots,
     Lighthouse scores, and any TODOs needing Lio's input.
  5. When CI is green and the preview looks right, merge to `main` with a
     merge commit (keep history), then continue on `v3` (rebased on `main`).
- Append a short entry to `docs/V3-LOG.md` after each phase (what shipped,
  scores, open questions).
- **Stop and ask Lio** if a phase fails its checks twice, a design choice
  is genuinely ambiguous, or something would be hard to undo.

---

## Phase 0: baseline and tooling

1. There are uncommitted changes on `main` (new hero with editorial
   portrait, cursor/motion layer in `components/ambient.tsx`, marquee,
   split headings, contact/resume copy, case-study scroll fix, per-project
   GitHub links removed). Review them, fix anything broken, then commit them
   on `v3` as a few logical commits.
2. `scripts/screens.mjs`: Playwright script that screenshots `/`,
   `/resume` and (later) a `/work/*` page at the five widths, after
   scrolling through the page so scroll reveals fire. Output to
   `.screens/` (git-ignored).
3. GitHub Actions `ci.yml`: install, typecheck, lint, build, Playwright smoke
   test (pages load, no console errors, key elements visible), Lighthouse CI
   with budgets from rule 6 (the existing `.lighthouserc.js` is a start).
4. Add `@vercel/analytics`. Custom events: `resume_download` (with resume
   slug and active role), `role_select`, `palette_open`.

## Phase 1: case studies become pages, and fewer projects up front

1. Route `app/work/[slug]/page.tsx` with `generateStaticParams`, full
   metadata, and a per-project OG image (reuse the `app/opengraph-image.tsx`
   style). Move `CaseStudy` content into the page. Add prev/next project
   navigation and a "Back to work" link that returns to the same scroll spot.
2. Card → page transition: use React/Next view transitions (check current
   Next 16 docs for `viewTransition` support) so the card image and title
   morph into the page header. Fallback: a clean fade.
3. Remove the modal and its body-scroll-lock code from `components/work.tsx`.
   Redirect old hash links (`/#fraudlens`) to `/work/fraudlens` on the client.
4. Curation: featured = the 4 strongest projects (propose which in the PR;
   default Aspen OS, Streaming Clickstream Pipeline, FraudLens, Nutrition
   Priority Index). Everything else goes into a compact **archive table**
   (year · project · discipline · stack · →) that can be filtered by
   discipline, keyboard-accessible, and collapses into cards on mobile.
5. Update the sitemap and structured data for the new URLs.

## Phase 2: role lens ("I'm hiring for…")

The signature feature. Lio keeps 17 role-specific resumes; the site should
tailor itself the same way.

1. `lib/roles.ts`: roles `data-eng`, `ml`, `analytics`, `software` (check
   `lib/resumes.ts` for the best resume slug per role). Each role defines:
   a pitch line (use wording that the existing copy supports), the project
   ordering (slugs), the skills to emphasise, and the resume slug.
2. Hero: a quiet segmented control "Hiring for: Data Eng · ML · Analytics ·
   Software", with an animated pill indicator (`layoutId`). Selecting a role:
   - crossfades the pitch line,
   - reorders featured projects with layout animation,
   - highlights matching skills and dims the rest,
   - points every "Resume" CTA at the matching PDF.
3. State lives in the URL (`?role=ml`, read client-side so pages stay
   static) and in localStorage. A link with `?role=` must load already
   tailored. This lets Lio send each recruiter a tailored link.
4. Default (no role) = the current general view. Fully keyboard operable,
   announced to screen readers (`aria-live="polite"` on the pitch).

## Phase 3: ⌘K command palette

1. ⌘K / Ctrl+K opens a palette (use `cmdk` or a hand-rolled ARIA combobox).
   Groups: Projects (opens the page), Resumes (open/download), Sections
   (scroll to), Actions (copy email with a toast, set role lens, open
   GitHub/LinkedIn).
2. Lazy-load the palette so it's not in the initial bundle. Show a subtle
   `⌘K` hint in the nav on desktop. On touch devices, a small floating
   button bottom-right opens it as a bottom sheet.
3. Smooth scale/blur enter animation, results move with layout animation,
   focus returns to the trigger on close.

## Phase 4: motion and interaction

1. **Lenis** smooth scrolling (gentle settings, not hijacking: native
   scrollbar, anchor links and keyboard still work). Disabled on touch and
   for reduced motion.
2. **Live pipeline** in the Work section header: a small canvas or SVG
   showing data dots flowing Ingest → Transform → Model → Serve, nudged by
   the cursor. Pauses when offscreen (IntersectionObserver) and when the tab
   is hidden. Static diagram for reduced motion. Must not hurt LCP.
3. **Skills → proof:** hovering or focusing a skill highlights the projects
   that use it (derive from project `tags`), and clicking filters the archive.
4. **Experience timeline:** a sticky date column and a vertical line that
   fills as you scroll (scroll-linked, `useScroll`).
5. **Case study pages:** scroll-linked architecture. The ArchExplorer stage
   highlights as the matching section scrolls into view.
6. **Mono label scramble:** small uppercase mono labels briefly scramble to
   their text on hover/reveal (≤ 400ms, reduced motion = off).
7. **Footer:** live Toronto local time (`America/Toronto`) and a large,
   quiet name wordmark that reveals on scroll.
8. Review `components/ambient.tsx` (custom cursor, spotlight, magnetic,
   tilt) for correctness and performance. Fix anything janky, and make
   sure it never runs on touch.

## Phase 5: mobile and tablet polish

1. Mobile nav: a menu button opening a full-screen sheet with large
   staggered links, body scroll locked, closes on navigation and Escape.
2. Project image galleries become swipeable (scroll-snap) on touch.
3. Tap feedback on all interactive elements; safe-area insets; check that
   the hero portrait, role lens and archive table are excellent at 360px.
4. Tablet (768–1024) gets its own deliberate layout, not just squeezed
   desktop.

## Phase 6: credibility

1. **Numbers strip** under the hero: only verifiable facts from the repo
   (e.g. count of live client sites, internal platform in daily use, GPA,
   number of systems in `lib/projects.ts`). Count-up on reveal. List each
   number and its source in the PR for Lio to confirm.
2. **Testimonials slot:** `lib/testimonials.ts` exports an empty array and
   a typed shape `{ quote, name, role, org, url? }`. The section renders
   only when the array has entries. Do not add any entries.
3. **`/colophon`** "How this site is built": stack, architecture
   decisions, motion principles, accessibility and performance approach,
   with live Lighthouse scores recorded in the log. Link it from the footer.
4. Refresh `README.md` to describe v3.

## Phase 7 (stretch): terminal mode

Press `~` (or choose it in the palette) to toggle a full-screen terminal
overlay that mirrors the site: `help`, `ls projects`, `cat about`,
`open <project>`, `resume --role ml`, `role data-eng`, `clear`, `exit`.
History with ↑/↓, tab completion, lazy-loaded, fully keyboard accessible,
Escape exits. It should feel like a polished easter egg, not a gimmick.

---

## Definition of done

- All phases merged to `main`, CI green, production deploy healthy.
- Lighthouse mobile ≥ 95 in all four categories on `/` and a `/work` page.
- Screenshots at five widths look deliberate and polished.
- No invented facts, no placeholder content visible in production.
- `docs/V3-LOG.md` complete, with a final list of anything Lio needs to supply.
