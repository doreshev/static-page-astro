# Product guide — replacing the 10 templates with real product data

This covers the 10 products already set up from the Galkynysh Plastik
catalogue. All 10 currently have real copy (pulled from the catalogue PDF)
but **placeholder photos** — that's the one thing that still needs your
input. Everything else is already usable, but review it against your own
knowledge of the products before publishing; the copy was condensed from
the catalogue and may need adjusting.

## The 10 products and where they live

Each product is one file in `src/content/products/`:

| File | Product |
|---|---|
| `hdpe-pipes-en.md` | HDPE Pipes |
| `corrugated-pipes-electrical-en.md` | Corrugated Pipes for Electrical Systems |
| `corrugated-pipes-sewage-en.md` | Corrugated Pipes for Sewage Systems |
| `heat-resistant-pipes-en.md` | Heat-Resistant Polyethylene Pipes |
| `drainage-membrane-en.md` | Drainage Membrane |
| `geomembrane-en.md` | Geomembrane |
| `drip-irrigation-pipes-en.md` | Drip Irrigation Pipes |
| `geogrids-en.md` | Geogrids |
| `water-filter-package-en.md` | Water Filter Package |
| `rubber-slabs-curbs-en.md` | Rubber Slabs and Curbs |

Its matching photo placeholder is in `src/content/products/images/`, named
the same way (e.g. `hdpe-pipes.svg`).

## Step 1 — Replace the photo (the main thing to do)

1. Save your real product photo somewhere in `src/content/products/images/`
   — any filename is fine, e.g. `hdpe-pipes.jpg`.
2. Open the matching product's `.md` file and change the `image:` line to
   point at it:
   ```yaml
   image: "./images/hdpe-pipes.jpg"
   ```
   (Just the filename/extension changes — the `./images/` part stays the
   same.)
3. Update `imageAlt` to actually describe the new photo, for accessibility
   and SEO — e.g. `"Stacked HDPE pipes with blue stripe marking at the Galkynysh Plastik facility"`
   instead of the current `"PRODUCT PHOTO PLACEHOLDER — HDPE pipes"`.

That's it — no other file needs to change. Astro re-optimizes the image
(resizing, WebP conversion) automatically on the next build.

**Photo recommendations:** landscape orientation works best (the card crops
to 4:3, the product page crops to 4:3 as well but larger). Aim for at least
1200px on the long edge so it stays sharp after optimization. JPG or PNG
both work fine.

## Step 2 — Review the text fields

Each file's frontmatter (the part between the `---` lines) has:

- **`title`** — product name shown as the page heading.
- **`shortDescription`** — one line, shown on the card and as the page's
  meta description. Keep it to a single sentence.
- **`specs`** — a short list of `label`/`value` pairs shown as a table on
  the product page. Currently 4–6 rows of the *highlights* (material, size
  range, standard, typical use) — not the full multi-row dimensional
  tables from the catalogue. See "Why specs are condensed" below before
  expanding these.
- **`order`** — controls sort position in the product grid (lower = first).
- **`featured`** — `true` shows it in the homepage's "Featured products"
  section. Currently 3 are featured (HDPE Pipes, Geomembrane, Rubber Slabs
  and Curbs) to keep that section short; change which ones freely.
- The paragraph(s) below the second `---` are the longer body text shown
  on the product detail page.

## Why specs are condensed, not the full catalogue tables

The catalogue's dimensional tables are dense — e.g. the HDPE pipe
thickness/weight table alone is 8 SDR classes × ~30 diameters. Reproducing
that directly on a product page would be a wall of numbers most visitors
won't parse, and it's a maintenance burden to keep two copies in sync.

The pattern used here: a short "key facts" table on the page for quick
scanning, with the full engineering tables staying in the downloadable PDF
catalogue (`/catalogue/`) for whoever needs exact numbers for a specific
spec'd size. If you'd rather show fuller tables directly on certain product
pages, that's a reasonable thing to add — just flag which products need it
so the table layout gets designed for that (the current `.spec-table` CSS
is built for short label/value rows, not a large data grid).

## Adding German or French translations later

Every product is currently English-only, and every page automatically
falls back to the English version until a translation exists — so nothing
breaks by leaving them as-is. To add a translation:

1. Copy `hdpe-pipes-en.md` to `hdpe-pipes-de.md` (same folder).
2. Change `lang: "en"` to `lang: "de"` — keep `group: "hdpe-pipes"` the
   same (that's what ties the two language versions together as "the same
   product").
3. Translate `title`, `shortDescription`, `specs`, and the body text. The
   `image` and `order` fields can usually stay identical to the English
   version.

The German product page picks it up automatically on the next build — no
other code changes needed. Same process for French (`-fr.md`).

## Worked example

Before (placeholder state, what every product looked like initially):

```yaml
image: "./images/hdpe-pipes.svg"
imageAlt: "PRODUCT PHOTO PLACEHOLDER — HDPE pipes"
```

After (once you've dropped in a real photo):

```yaml
image: "./images/hdpe-pipes.jpg"
imageAlt: "Stacked HDPE pipes with blue stripe marking, ready for dispatch"
```

Everything else in the file — title, specs, description — was already
written from the catalogue and needs your review, not necessarily a full
rewrite.
