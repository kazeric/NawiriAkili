# Nawiri Akili — WordPress Custom HTML Block Refactor
# Complete Cursor Prompt — All Cloudinary URLs Included

---

## Project Overview

Refactor the Nawiri Akili-Care Africa website (8 HTML pages) so each page works
correctly when pasted as a WordPress Custom HTML block.

Each page has its own unique layout, sections, and component design. Do NOT
impose the structure or layout of one page onto another. Preserve each page's
individual design exactly as it is — only apply the technical refactoring rules
below. The shared design system (colour tokens, typography, spacing) is defined
in the Design Tokens section and applies universally across all pages.

### Pages to refactor (in order):
1. home.html
2. about.html
3. services.html
4. initiative.html
5. walk-with-us.html
6. blog.html
7. contact.html
8. book.html

---

## Why Pages Break in WordPress Custom HTML Blocks

WordPress Custom HTML blocks:
- Strip or mangle multiple `<style>` blocks
- Remove or break `<script>` tags
- Cannot resolve local image paths (images/filename.jpg)
- Conflict with the theme's own CSS on tags like body, h1, nav, footer
- Break on newer CSS like `color-mix()`
- Cannot handle page-level tags like `<html>`, `<head>`, `<body>` inside a block

---

## Output Format (every page must follow this exactly)

```html
<style>
  /* ONE merged, scoped style block — nothing else above this */
</style>

<div class="naw-wrap">
  <!-- ALL page content sections here — no nav, no footer -->
</div>

<script>
  /* ONE small script block — nothing else below this */
</script>
```

---

## Refactoring Rules — Apply to Every Page

### RULE 1 — Single `<style>` block
- Merge ALL `<style>` blocks (including `<!-- build:css:start -->`,
  `<!-- build:css:end -->`, and `#nawiri-animations`) into ONE `<style>` tag
- Remove all build comments
- Add Google Fonts via `@import` at the very top of the style block:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@300;400;600;700&display=swap');
  ```
- Remove all `<link>` tags for fonts and preconnects

### RULE 2 — Replace local image paths with Cloudinary URLs. Keep Unsplash URLs untouched.
- Replace every `src="images/..."` with the exact Cloudinary URL from the
  image reference sheet below
- Replace every `background-image: url("images/...")` with the Cloudinary URL
- **DO NOT change any `https://images.unsplash.com/...` URLs** — leave every
  Unsplash URL exactly as it is, in both CSS variables and `<img>` src attributes
- Keep all `<img>` tags and CSS `background-image` properties — only update
  local src/url values

### RULE 3 — No `color-mix()`
Replace every `color-mix(in srgb, ...)` with its pre-computed equivalent.
Use these exact replacements throughout:

```
color-mix(in srgb, #4CB894 60%, #421f66 40%)           → #488a7c
color-mix(in srgb, #e2ede4 70%, #4CB894 30%)            → #c8e0cf
color-mix(in srgb, [above result] 60%, #421f66 40%)     → #7e8e83
color-mix(in srgb, #EDF8F2 60%, #e4daee 40%)            → #e8f2ec
color-mix(in srgb, #1E4A3A 60%, #421f66 40%)            → #2d4050
color-mix(in srgb, #eaf4fd 60%, #e4daee 40%)            → #e7eff9
color-mix(in srgb, rgba(237,248,242,0.72) 60%,
  rgba(66,31,102,0.2) 40%)                              → rgba(180,222,200,0.62)
color-mix(in srgb, rgba(237,248,242,0.78) 60%,
  rgba(66,31,102,0.18) 40%)                             → rgba(180,222,200,0.68)
color-mix(in srgb, rgba(245,240,252,0.92) 60%,
  rgba(66,31,102,0.28) 40%)                             → rgba(220,210,240,0.86)
color-mix(in srgb, rgba(234,244,253,0.92) 60%,
  rgba(66,31,102,0.16) 40%)                             → rgba(210,228,248,0.86)
color-mix(in srgb, rgba(58,154,122,0.92) 60%,
  rgba(66,31,102,0.38) 40%)                             → rgba(61,110,112,0.88)
color-mix(in srgb, #4CB894 60%, #421f66 40%)
  (footer border)                                       → #488a7c
```

### RULE 4 — Remove page-level wrapper tags
Remove entirely:
- `<!doctype html>`
- `<html>` and `</html>`
- `<head>` and `</head>`
- `<body>` and `</body>`
- `<title>`
- `<meta>` tags
- `<link rel="preconnect">` tags
- `<link rel="stylesheet">` tags
- The scroll restoration `<script id="nawiri-scroll-top">` block

### RULE 5 — Remove `<nav>` and `<footer>`
- Remove the entire `<nav class="top">...</nav>` block
- Remove the entire `<footer>...</footer>` block
- WordPress provides these from the theme

### RULE 6 — Namespace all CSS classes with `naw-`
Rename every custom class to have the `naw-` prefix to prevent collisions
with WordPress theme styles. Examples:
```
.hero        → .naw-hero
.btn         → .naw-btn
.stat        → .naw-stat
.reveal      → .naw-reveal
.eyebrow     → .naw-eyebrow
.step        → .naw-step
.pathway     → .naw-pathway
.build       → .naw-build
.pull        → .naw-pull
.mission     → .naw-mission
.stats       → .naw-stats
.intro       → .naw-intro
.path        → .naw-path
.wrap        → .naw-inner  (avoid collision with theme .wrap)
```
Update all HTML class attributes to match.

### RULE 7 — Scope all CSS to `.naw-wrap`
Wrap the entire block content in:
```html
<div class="naw-wrap">...</div>
```
Prefix every CSS rule with `.naw-wrap` so nothing leaks into the theme:
```css
.naw-wrap h1 { ... }
.naw-wrap .naw-hero { ... }
.naw-wrap .naw-btn { ... }
```

### RULE 8 — Minimal JavaScript — one `<script>` at the bottom
Keep only:
- Scroll reveal `IntersectionObserver` (the `.naw-reveal` / `.in` pattern)
- Burger menu toggle

Remove entirely:
- Scroll restoration logic
- `pageshow` scroll reset
- `requestAnimationFrame` hero entrance
- Nav sticky shadow (`is-scrolled`)
- Banner-visual observer
- `resize` and `orientationchange` listeners
- Hero `hero-ready` class logic

The script must be a single `<script>` block at the very end, after `</div>`.

---

## Design Tokens — Preserve These Exactly

```css
--primary:        #4CB894;
--brand-dark:     #3A9A7A;
--brand-darkest:  #1E4A3A;
--tint:           #EDF8F2;
--purple:         #421f66;
--purple-tint:    #e4daee;
--section-purple: #E8E0F5;
--white:          #ffffff;
--body:           #4a5568;
--border:         #e2ede4;
--chip-green-bg:  #C8EDE0;
--chip-green-fg:  #1A4536;
--chip-purple-bg: #d6cae6;
--chip-purple-fg: #2f1748;
--purple-deep:    #251238;
--green:          #4CB894;
```

Fonts: `DM Serif Display` (all headings), `Nunito` (body, UI, nav)

---

## Cloudinary Image Reference Sheet
### Cloud name: dq6dzskaf

---

### GLOBAL — Used on every page

```
Logo (navbar):
https://res.cloudinary.com/dq6dzskaf/image/upload/w_320,f_auto,q_auto/v1779775193/nawiri_logo_v8dqxt.jpg
```

---

### HOME — home.html

```
Hero photo card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_900,f_auto,q_auto/v1779773921/hero_group_jev8af.png

Individual Therapy card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773920/individual_therapy_chggs7.jpg

Family Therapy card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773978/family_therapy_yi63q0.png

Organisational Wellness card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773912/corporate_whgqjm.jpg

School & Community Programs card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773921/physchology_ortsoy.png

Virtual Care card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773922/virtual_therapy_zksiis.jpg

Subsidised or Free Care card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773981/subsidised_free_care_ngmize.png
```

---

### ABOUT — about.html

```
Hero background:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_1920,f_auto,q_80/v1779772321/hero_mxyxol.png
```

---

### SERVICES — services.html

```
Hero background:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_1920,f_auto,q_80/v1779772931/hero_yfceyp.jpg

Individual Therapy & Counselling card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772935/individual_therapy_r5sruh.jpg

Family Therapy card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773812/family_therapy_lqvsea.png

Corporate Wellness card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772930/corporate_b7gh0y.jpg

Psychological Consultation card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772937/physchology_rvyzid.png

Virtual Therapy card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772939/virtual_therapy_nox7xm.jpg

Group Therapy & Support Groups card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779773829/therapy1_tksdsj.jpg

Wellness & Personal Development card:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772946/wellness_oajgys.jpg
```

---

### INITIATIVE — initiative.html

```
No local images on this page.
Hero background (--hero-image) uses Unsplash — see Unsplash reference below.
```

---

### WALK WITH US — walk-with-us.html

```
No local images on this page.
Hero and Final CTA backgrounds use Unsplash — see Unsplash reference below.
Gallery images use Unsplash — see Unsplash reference below.
```

---

### BLOG — blog.html

```
Post thumbnails (all blog entries):
https://res.cloudinary.com/dq6dzskaf/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1779772298/post_thumbnail_filcil.jpg
```

---

### CONTACT — contact.html

```
Hero background:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_1920,f_auto,q_80/v1779772272/hero_qojhze.jpg
```

---

### BOOK — book.html

```
Hero background:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_1920,f_auto,q_80/v1779772357/hero_gb0imw.jpg

Individual Therapy picker:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772368/individual_therapy_hn3wkr.jpg

Family Therapy picker:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772868/family_therapy_rimzcm.png

Psychological Consultation picker:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772363/physchology_gqdo9y.png

Virtual Session picker:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772368/virtual_therapy_tclaeb.jpg

Subsidised or Free Support picker:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772865/subsidised_free_care_k94ctw.png

Group Therapy picker:
https://res.cloudinary.com/dq6dzskaf/image/upload/w_800,f_auto,q_auto/v1779772362/mental_health_services_kakmfs.jpg
```

---

## Unsplash Image Reference — DO NOT MODIFY THESE URLs

All Unsplash URLs must be kept exactly as they are. Do not shorten, reformat,
or replace them with gradients. They are used as CSS `background-image` values
via `:root` variables and as `<img>` src attributes on walk-with-us.html.

```
/* ─── HOME ─── */

Hero background (--hero-image):
https://images.unsplash.com/photo-1470058869978-29229b574965?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80

Crisis banner background (--banner-image):
https://images.unsplash.com/photo-1593113598334-c2882886e479?auto=format&fit=crop&w=1600&q=80

Final CTA background (--final-bg):
https://images.unsplash.com/photo-1448375240586-882707a8882e?auto=format&fit=crop&w=1920&q=80


/* ─── ABOUT ─── */

Final CTA background (--final-bg):
https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80


/* ─── SERVICES ─── */

Final CTA background (--final-bg):
https://images.unsplash.com/photo-1528736479072-96554d3b5c3d?auto=format&fit=crop&w=1920&q=80


/* ─── INITIATIVE ─── */

Hero background (--hero-image):
https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80


/* ─── WALK WITH US ─── */

Hero background (--hero-image):
https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80

Final CTA background (--final-bg):
https://images.unsplash.com/photo-1469571486292-c7b0df41cce6?auto=format&fit=crop&w=1920&q=80

Gallery — School outreach session (<img> src):
https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop

Gallery — Community awareness event (<img> src):
https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop

Gallery — Safe space session (<img> src):
https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=1200&auto=format&fit=crop


/* ─── BLOG ─── */

Hero background (--hero-image):
https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1920&q=80

Final CTA background (--final-bg):
https://images.unsplash.com/photo-1507842217122-154dbe4fd6a1?auto=format&fit=crop&w=1920&q=80


/* ─── CONTACT ─── */

Final CTA background (--final-bg):
https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1920&q=80


/* ─── BOOK ─── */

No Unsplash images — hero uses Cloudinary (see above)
```

---

## Checklist — Verify Before Moving to Next Page

After refactoring each page, confirm:

- [ ] Exactly ONE `<style>` block with `@import` at the top
- [ ] `@import` for Google Fonts inside the style block
- [ ] Exactly ONE `<div class="naw-wrap">` wrapping all content
- [ ] Exactly ONE `<script>` block at the very bottom
- [ ] Zero `src="images/..."` references (local paths only — Unsplash URLs are fine)
- [ ] Zero `url("images/...")` references (local paths only — Unsplash URLs are fine)
- [ ] Zero `color-mix()` calls
- [ ] Zero `<nav>` or `</nav>` tags
- [ ] Zero `<footer>` or `</footer>` tags
- [ ] Zero `<html>`, `<head>`, `<body>` tags
- [ ] Zero `<!doctype>` declarations
- [ ] Zero `<link>` tags
- [ ] Zero `<meta>` tags
- [ ] Every CSS class prefixed with `naw-`
- [ ] Every CSS rule scoped with `.naw-wrap`

---

## Refactor Order

Work through pages in this sequence, one at a time.
Do not move to the next page until the checklist above passes.

1. home.html
2. about.html
3. services.html
4. initiative.html
5. walk-with-us.html
6. blog.html
7. contact.html
8. book.html