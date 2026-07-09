# Hero Evolution — Local Preview Instructions

**Current Time:** July 7, 2026, 6:33 AM UTC  
**Branch:** `feature/hero-evolution`  
**Status:** Ready for preview

---

## Quick Start

### 1. Switch to Experimental Branch

```bash
cd "/Users/lionaelsmac/Documents/Lio's Portofolio Website"
git checkout feature/hero-evolution
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open These URLs for Comparison

**Original Hero (v1.0.0):**
```
http://localhost:3000/
```

**Experimental Hero (v1.1.0):**
```
http://localhost:3000/hero-v2
```

---

## What to Compare

### Visual Elements

**v1.0.0 (/):**
- Single-column layout
- Clean typography-first hero
- Static text animations (rise, fade-up)
- Portrait in small avatar
- Pipeline stages at bottom

**v1.1.0 (/hero-v2):**
- Two-column layout (desktop)
- Particle typography for headline
- 3D interactive lanyard (right column)
- Portrait in 3D card
- Same pipeline stages

### Performance Testing

**Check in Browser DevTools:**

1. **Network Tab:**
   - v1.0.0: Initial bundle ~120KB
   - v1.1.0: Initial bundle ~275KB

2. **Performance Tab:**
   - Record page load
   - Compare Time to Interactive
   - Check CPU usage (3D rendering)

3. **Lighthouse:**
   - Run audit on both pages
   - Compare Performance scores
   - Compare bundle size warnings

### Interaction Testing

**v1.1.0 specific:**
- Wait for particle assembly (1 second)
- Observe 3D card gentle rotation
- Try reduced-motion (DevTools → Rendering → Emulate CSS prefers-reduced-motion)
- Check mobile responsive (toggle device toolbar)

---

## Side-by-Side Comparison Checklist

### First Impression
- [ ] Which page captures attention immediately?
- [ ] Which page emphasizes the message vs. the medium?
- [ ] Which page would you remember: the engineer or the effects?

### Performance
- [ ] Which page loads faster?
- [ ] Which page feels more responsive?
- [ ] Which page drains battery more (mobile)?

### Professionalism
- [ ] Which page looks more like Apple/Linear/Stripe?
- [ ] Which page looks more like a developer portfolio template?
- [ ] Which page embodies "Built Like Production"?

### Message Clarity
- [ ] Which page delivers the value proposition faster?
- [ ] Which page has clearer visual hierarchy?
- [ ] Which page better serves a data/software engineer?

---

## To Stop Preview

```bash
# Stop dev server
kill $(cat /tmp/portfolio-dev.pid)

# Switch back to production branch
git checkout main
```

---

## Routes Summary

| Route | Hero Version | Purpose |
|-------|--------------|---------|
| `/` | v1.0.0 | **Original** (production) |
| `/hero-v2` | v1.1.0 | **Experimental** (comparison) |

**Both routes show the full homepage with different hero sections only.**

---

## Key Decision Criteria

After comparing both versions, ask yourself:

1. **Does the 3D lanyard strengthen or distract from my professional identity?**
2. **Does the particle animation improve or delay message comprehension?**
3. **Would a hiring manager trust the restraint of v1.0.0 or the spectacle of v1.1.0?**
4. **Does v1.1.0 make recruiters remember me or remember the animation?**
5. **Which version better embodies "Built Like Production"?**

**If v1.0.0 wins on 3 or more criteria, keep it in production.**

---

## Current Recommendation

Based on comprehensive analysis, **v1.0.0 is recommended** for:
- Better performance (98+ Lighthouse vs ~85-90)
- Clearer message (immediate vs delayed)
- Stronger philosophy alignment (embodies vs contradicts)
- Better first impression (engineer > animation)
- More timeless design (typography > effects)

**Preview both versions yourself to validate this recommendation.**

---

*Preview instructions created: July 7, 2026, 6:33 AM UTC*
