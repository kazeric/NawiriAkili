# Nawiri Akili — Child Theme Migration

This child theme (`charity-grove-nawiri`, parent: `charity-grove`) hosts the
Nawiri Akili-Care Africa site, migrated from the standalone static HTML pages.

The goal: **the client manages content (add / remove / reorder sections) in the
WordPress editor**, while the bespoke Nawiri design is preserved exactly.

## Architecture

| Concern | Where it lives | Loaded by |
|---|---|---|
| Design tokens (`:root`) + shared site CSS | `style.css` | `functions.php` (`nawiri-global`, front end + block editor) |
| Global animations / nav / hero / reveal JS | `js/nawiri.js` | `functions.php` (`nawiri-animations`, site-wide) |
| Per-page CSS (incl. page hero/`final-bg` images) | `assets/css/pages/<slug>.css` | `functions.php`, only on that page |
| Per-page JS (blog filter, book picker) | `js/pages/<slug>.js` | `functions.php`, only on that page |
| Site nav | `parts/header.html` | template part `header` |
| Site footer | `parts/footer.html` | template part `footer` |
| Page content | `patterns/nawiri-<slug>.php` | inserted into each Page |
| Page shell (header → content → footer) | `templates/page.html`, `templates/front-page.html` | WordPress |

### Why this approach (long-term support + client editing)

- **Header & footer are template parts** — edited once in the Site Editor,
  used on every page. No duplicated nav/footer per page.
- **Each page is a registered block pattern split into one block per section.**
  In the editor the client can add, remove, reorder, or duplicate whole
  sections (hero, values, founder, CTA, etc.). The exact markup, classes,
  inline styles, custom forms, the donut SVG, and gallery stay intact.
- **Tokens are hoisted once** into `style.css`, so styles resolve everywhere
  (front end and the block editor preview). Per-page background images remain
  scoped to their page CSS.

> Sections are delivered as Custom HTML blocks to guarantee pixel-fidelity for
> this bespoke design. Any individual section can later be rebuilt with native
> core blocks (heading/paragraph/buttons/image) for finer inline editing
> without affecting the rest of the page.

### Native-block conversion (in progress)

We are progressively upgrading content pages from per-section HTML blocks to
**native core blocks**, so the client edits headings/paragraphs/buttons directly
in the editor. Status:

| Page | Status |
|---|---|
| about | ✅ Native core blocks (reference) |
| home | per-section HTML (queued) |
| services | per-section HTML (queued) |
| initiative | per-section HTML (queued) |
| blog / book / contact / walk-with-us | per-section HTML (forms/SVG/widgets stay HTML by design) |

Supporting pieces for native conversion:

- **Button compatibility layer** in `style.css` (`/* Core Button block <-> Nawiri
  .btn compatibility */`): native `wp:button` blocks carry the Nawiri class on
  the wrapper; the layer neutralises the wrapper and mirrors the button look onto
  the inner link. Extend the variant list as each page is converted.
- **`.section-head` helper** added per page (e.g. `about.css`) to center the
  former inline-styled section heads.
- **HTML islands** remain only where core blocks can't represent custom inline
  markup — e.g. the hero `<span class="grad">` word and the founder name pill on
  About. Everything else on About is editable core blocks.

## One-time WordPress setup

1. **Activate** the `Nawiri Akili Child` theme.
2. **Create the Pages** with these exact slugs (the per-page CSS/JS keys off the slug):
   - `home`, `about`, `services`, `initiative`, `walk-with-us`, `blog`, `book`, `contact`
3. **Settings → Reading → Your homepage displays → A static page → Homepage = "Home".**
   (The front page maps to the `home` slug for asset loading.)
4. For each Page: open the editor, **insert the matching pattern** ("Nawiri – …"
   from the *Charity Grove* category in the inserter), then publish.
   The pattern unpacks into editable section blocks.
5. Pages automatically use `templates/page.html` (header → content → footer);
   the Home page uses `templates/front-page.html`.

## Per-page asset map

| Page slug | Per-page CSS | Per-page JS | Pattern |
|---|---|---|---|
| home | `assets/css/pages/home.css` | — | `Nawiri – Home` |
| about | `assets/css/pages/about.css` | — | `Nawiri – About Us` |
| services | `assets/css/pages/services.css` | — | `Nawiri – Services` |
| initiative | `assets/css/pages/initiative.css` | — | `Nawiri – Nawiri Akili Initiative` |
| walk-with-us | `assets/css/pages/walk-with-us.css` | — | `Nawiri – Walk With Us` |
| blog | `assets/css/pages/blog.css` | `js/pages/blog.js` (category filter) | `Nawiri – Blog & Insights` |
| book | `assets/css/pages/book.css` | `js/pages/book.js` (service picker) | `Nawiri – Book a Session` |
| contact | `assets/css/pages/contact.css` | — | `Nawiri – Contact & Partner` |

## Notes / things to review

- **Nav is now a single site-wide template part.** The global CTA is
  `Book a Session → /book/`. The **book page** restores its original
  `↓ Book Now → #book` CTA via `js/pages/book.js` (scoped to that page only).
  Other old per-page CTAs (`Give Now`, `Support`) remain unified; restore them
  the same way (page JS) or edit `parts/header.html` in the Site Editor.
- **Footer is unified** to the shared base. Page-specific footer wording from
  the old static pages is not carried per page.
- The global `style.css` was **not previously enqueued** (only the empty
  `ctc-style.css` was); `functions.php` now enqueues it as `nawiri-global`.
- Per-page CSS files keep their own `:root` block so each page's hero / final
  background images load with the page. Shared tokens are duplicated there
  harmlessly and authoritative copies live in `style.css`.
- Forms (book/contact), the allocation donut SVG (walk-with-us), and similar
  custom widgets are preserved verbatim inside their section blocks.
