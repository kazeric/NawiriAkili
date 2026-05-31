# WORDPRESS-SETUP

> **Update (migrated):** These assets have been migrated into the `charity-grove-nawiri`
> child theme (parent: `charity-grove`, a block/FSE theme). The live setup,
> architecture, and client editing instructions now live in
> `charity-grove-nawiri/NAWIRI-MIGRATION.md`. Global tokens/CSS/JS are enqueued
> by the child theme, nav/footer are template parts, and each page is a block
> pattern. The snippet/WPCode notes below are kept for reference only.

This project has been split into global and per-page assets for WordPress migration.

## Global assets

- **Global CSS (all pages):** `global.css`
- **Global JS (all pages):** `global-scripts.js`
- **Shared nav base:** `nav-base.html`
- **Shared footer base:** `footer-base.html`

## Per-page implementation map

### `about.html`
- **Page URL scope:** `/about/`
- **CSS snippet file:** `about-styles.css` (paste in WPCode scoped to `/about/`)
- **JS snippet file:** `about-scripts.js` (paste in WPCode scoped to `/about/`)
- **HTML block file:** `about-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `Book a Session` -> `/book/`, active link `Not explicitly marked`.

### `blog.html`
- **Page URL scope:** `/blog/`
- **CSS snippet file:** `blog-styles.css` (paste in WPCode scoped to `/blog/`)
- **JS snippet file:** `blog-scripts.js` (paste in WPCode scoped to `/blog/`)
- **HTML block file:** `blog-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `Book a Session` -> `/book/`, active link `Not explicitly marked`.

### `book.html`
- **Page URL scope:** `/book/`
- **CSS snippet file:** `book-styles.css` (paste in WPCode scoped to `/book/`)
- **JS snippet file:** `book-scripts.js` (paste in WPCode scoped to `/book/`)
- **HTML block file:** `book-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `↓ Book Now` -> `#book`, active link `Not explicitly marked`.

### `contact.html`
- **Page URL scope:** `/contact/`
- **CSS snippet file:** `contact-styles.css` (paste in WPCode scoped to `/contact/`)
- **JS snippet file:** `contact-scripts.js` (paste in WPCode scoped to `/contact/`)
- **HTML block file:** `contact-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `Book a Session` -> `/book/`, active link `Not explicitly marked`.

### `home.html`
- **Page URL scope:** `/`
- **CSS snippet file:** `home-styles.css` (paste in WPCode scoped to `/`)
- **JS snippet file:** `home-scripts.js` (paste in WPCode scoped to `/`)
- **HTML block file:** `home-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `Book a Session` -> `/book/`, active link `Not explicitly marked`.

### `initiative.html`
- **Page URL scope:** `/initiative/`
- **CSS snippet file:** `initiative-styles.css` (paste in WPCode scoped to `/initiative/`)
- **JS snippet file:** `initiative-scripts.js` (paste in WPCode scoped to `/initiative/`)
- **HTML block file:** `initiative-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `❤ Support` -> `/walk-with-us/`, active link `Not explicitly marked`.

### `services.html`
- **Page URL scope:** `/services/`
- **CSS snippet file:** `services-styles.css` (paste in WPCode scoped to `/services/`)
- **JS snippet file:** `services-scripts.js` (paste in WPCode scoped to `/services/`)
- **HTML block file:** `services-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `Book a Session` -> `/book/`, active link `Not explicitly marked`.

### `walk-with-us.html`
- **Page URL scope:** `/walk-with-us/`
- **CSS snippet file:** `walk-with-us-styles.css` (paste in WPCode scoped to `/walk-with-us/`)
- **JS snippet file:** `walk-with-us-scripts.js` (paste in WPCode scoped to `/walk-with-us/`)
- **HTML block file:** `walk-with-us-body.html` (paste into Custom HTML block for this page)
- **Already covered by `global.css`:** shared site-wide layout/styles including :root variables, typography rules, navigation styles, footer styles, .reveal, .eyebrow, .btn, .hero-bg, .final-bg, .section-crisis-info, h2.heading-display.
- **Nav variation to preserve:** CTA `&#10084; Give Now` -> `#give`, active link `Not explicitly marked`.

## Nav and footer variation references

- Review nav differences in `nav-variations.md` before converting nav into a template part.
- Review footer differences in `footer-variations.md` before converting footer into a template part.
- Review main-content differences in `body-variations.md` if you want strict section-by-section parity checks between pages.
- During initial migration, keep nav and footer inside each `*-body.html` to avoid losing page-specific states/CTAs.
