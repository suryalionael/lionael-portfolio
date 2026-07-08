# CLAUDE REVIEW FRAMEWORK

This document is the mandatory quality gate before every commit.

Do not consider a task complete until every section below has been reviewed.

You are no longer implementing features.

You are reviewing your own work like an experienced engineering team preparing for production.

---

# Mindset

Assume this portfolio will be reviewed by:

- Recruiters
- Engineering Managers
- Senior Engineers
- Product Designers
- Staff Frontend Engineers

Every decision should increase trust.

If something exists only because it "looks cool", remove it.

If something improves communication, keep it.

Always optimize for clarity over novelty.

---

# Review Pass 1
## Product Designer

Review the entire experience.

Ask yourself:

- Is the story obvious?
- Does every section have a clear purpose?
- Is anything repetitive?
- Does the page breathe?
- Is visual hierarchy obvious?
- Is there enough whitespace?
- Does typography carry the experience?
- Does the design feel expensive without trying too hard?

Rewrite anything that feels generic.

---

# Review Pass 2
## Recruiter

You have 30 seconds.

Can you answer immediately:

- Who is this person?
- What does he build?
- Why should I interview him?
- What projects stand out?
- What makes him different?

If not,

redesign until the answer is yes.

---

# Review Pass 3
## Hiring Manager

Imagine hiring for:

- Data Engineering
- Analytics Engineering
- Software Engineering

Review every project.

Ask:

Does this explain

- the problem?
- the engineering?
- the tradeoffs?
- the impact?

Or does it simply list technologies?

If technologies dominate,

rewrite.

---

# Review Pass 4
## Senior Engineer

Inspect every component.

Remove:

- duplicated logic
- unnecessary state
- unnecessary client components
- unnecessary animations

Question every dependency.

Could this be simpler?

If yes,

simplify it.

---

# Review Pass 5
## Motion Designer

Every animation must answer:

Why does this exist?

Allowed purposes:

- guide attention
- preserve context
- communicate hierarchy
- communicate relationships
- improve usability

Forbidden purposes:

- showing off
- decoration
- filling empty space

Review:

timing

easing

stagger

hover

page transitions

If motion distracts,

remove it.

---

# Review Pass 6
## Accessibility

Verify:

✓ Keyboard navigation

✓ Focus order

✓ Screen readers

✓ Semantic HTML

✓ Reduced motion

✓ WCAG AA

✓ Color contrast

Accessibility is mandatory.

Never optional.

---

# Review Pass 7
## Performance

Review bundle size.

Review JavaScript.

Review images.

Review hydration.

Prefer:

Server Components

Lazy loading

Image optimization

Minimal client JavaScript

Every KB must justify itself.

---

# Review Pass 8
## Editorial Review

Read every sentence aloud.

Ask:

Would a human naturally say this?

Remove:

- buzzwords
- corporate language
- AI sounding phrases
- exaggerated claims

Prefer:

short

confident

honest

specific

---

# Review Pass 9
## Visual Consistency

Review:

spacing

radius

borders

shadows

line heights

font sizes

section rhythm

hover states

Everything should belong to one design system.

Nothing should feel like it came from another website.

---

# Review Pass 10
## Production Readiness

Before committing verify:

✓ TypeScript passes

✓ ESLint passes

✓ Build succeeds

✓ Responsive

✓ Metadata

✓ JSON-LD

✓ Sitemap

✓ Robots

✓ Images optimized

✓ Lighthouse remains excellent

---

# Final Question

Before every commit ask:

"If I showed this portfolio to a Staff Engineer at Stripe, would they believe this reflects production engineering judgment?"

If the answer is anything other than "yes",

continue refining.

Do not stop because the feature works.

Stop only when there are no obvious improvements remaining.

---

# Commit Policy

Never create a commit immediately after implementing a feature.

Always:

1. Implement
2. Review
3. Refine
4. Review again
5. Test
6. Build
7. Commit

The review is part of the implementation.

---

# Definition of Done

The work is done only when:

- It communicates clearly.
- It feels premium.
- It is accessible.
- It performs well.
- It is maintainable.
- It demonstrates engineering judgment.
- There are no obvious improvements left after multiple review passes.

Until then,

keep refining.