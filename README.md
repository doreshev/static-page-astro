# Ronesans Trading — website

A trilingual (EN/DE/FR) static company site built with Astro: home page,
a categorized product catalogue, a facility/operations gallery with
video, certificates, a downloadable PDF catalogue, and a contact form.

**Naming:** the site currently markets products manufactured by
**Galkynysh Plastik**, with the legal entity operating this website being
**Ronesans Trading Lux** (short/brand name: **Ronesans Trading**),
registered in Luxembourg, acting as Galkynysh Plastik's official
representative in the EU. Note for whoever picks this up next: Ronesans
Trading is expected to represent more than one manufacturer over time, so
the current "we are Galkynysh's EU representative" framing on the
homepage/imprint may need broadening later — Galkynysh Plastik stays
mentioned regardless, just possibly not as the sole positioning. The two
names are kept intentionally distinct throughout the site — the
brand/header uses "Ronesans Trading", product copy credits Galkynysh
Plastik as manufacturer, and `/imprint/` uses the full legal name
"Ronesans Trading Lux" with a note on which one belongs in the
legal-notice section.

The 10 products already have real copy from the manufacturer's catalogue
and are grouped into provisional categories (Pipes / Membranes &
Geosynthetics / Other) — **see `PRODUCT_GUIDE.md`** for what's left to do
(mainly: swap in real photos; the `.png` placeholders currently in
`src/content/products/images/` need replacing with actual product
photography — they were regenerated as placeholders since the real
photos referenced in an edited copy of these files weren't included in
that handoff). Certificates and facility photos are real; the video is
still a placeholder. Check each section below before launch.

## Design direction

The site uses a light, document-forward visual system suited to the
dense technical content it carries (specs, certificates, catalogues),
with a muted navy-teal accent (not a vivid saturated blue) for a more
sophisticated, established-supplier feel. Styled to align with
https://ronesans-global-connect.lovable.app/ where practical (rounded
buttons/pills, plain sans-serif nav and button text instead of the
monospace/uppercase treatment used elsewhere on the site, the muted navy
accent) while keeping our own real content — that reference site uses
placeholder company/product names throughout. A few notes if you're
picking this back up:

- **Design tokens** live at the top of `src/styles/global.css` (`--void`,
  `--panel`, `--paper`, `--mist`, `--route`, etc.) — change the palette
  there and it propagates everywhere, since every page reuses the same
  component classes (`.card`, `.btn`, `.hero`, `.notice`, etc.).
- **Rounded corners** (`--radius`, currently `10px`) are used on buttons,
  the nav CTA, and the language-switcher pill, matching the reference.
  Product cards keep their sharper "spec sheet" corner marks
  deliberately — that's a distinct signature, not an oversight.
- **Nav links and button labels use plain sans-serif, sentence case**
  (`.nav-links a`, `.nav-cta`, `.btn`) — matching the reference rather
  than the monospace/uppercase treatment still used for eyebrows,
  certificate issuer lines, and spec-table labels elsewhere. That
  monospace usage is a deliberate "technical datasheet" accent for
  small structural labels, kept intentionally distinct from primary
  navigation/actions.
- **The homepage hero background is currently a generated placeholder**
  (`src/content/facility/images/hero-placeholder.jpg`), not a real photo.
  None of the real facility photos on hand are naturally light enough for
  this treatment — they're all fairly dark/earthy industrial shots, and
  pushing one through heavy filters to compensate just looked muddy
  rather than light. The placeholder is a soft, pale, pre-blurred
  abstract image standing in for something like pale plastic
  products/sheets on a light table, or a bright clean facility interior.
  Swap in a real photo by changing the one import line in
  `src/pages/[lang]/index.astro` — but if it's a normal (sharper, less
  pale) photo, also restore stronger filtering on `.hero__bg img` in
  global.css (currently tuned very light for the placeholder — see the
  comment right above that rule for the old, stronger values). Either
  way, it's washed with a light overlay so it reads as ambient texture
  behind dark-on-light text, using the same global tokens as the rest of
  the page — no scoped dark-mode override needed, and nothing dark for
  the sticky header to visually pick up (which is what caused an earlier
  bug, see below).
- **The header is fully opaque** (`background: var(--void)`, no
  transparency or backdrop-filter). It used to be a translucent
  `rgba(...)` background with `backdrop-filter: blur()`, which let
  whatever was scrolled underneath — originally a dark hero photo — bleed
  through and make the header itself look dark. If a future redesign
  wants a translucent/blurred header again, test it specifically against
  whatever sits directly behind it at page load, in a real browser
  (WeasyPrint, used for local checks here, doesn't support
  `backdrop-filter` and won't catch this).
- **Scroll animation** is handled by `src/components/ScrollFX.astro`
  (included once, globally, via `Layout.astro`), using GSAP + ScrollTrigger
  for a fade/slide-up reveal on any element marked `.reveal`. Skipped
  entirely for `prefers-reduced-motion` — content just appears
  immediately, no motion.
- **Numbered section labels** (01, 02, 03...) only appear on the homepage,
  where they narrate a real sequence (origin → who we are/video → product
  range → contact). Other pages use a plain, unnumbered eyebrow label —
  don't add numbering there, it wouldn't correspond to an actual sequence.
- **Certificates and facility photos use a frameless gallery style**
  (`.gallery-grid` / `.gallery-trigger` / `.gallery-caption` in
  global.css) — just the photo and a short caption, click to zoom. This
  is deliberately distinct from `.card` (used for products), which keeps
  a bordered look since products carry more supporting text alongside the
  image.
- This was built without a way to render a live screenshot in the build
  environment, so it's been checked carefully in code and spot-checked
  with a local WeasyPrint render (a CSS-to-PDF renderer, not a real
  browser — it doesn't support `backdrop-filter`, CSS `filter: blur()`,
  or `aspect-ratio` reliably, so those specific effects need a real
  browser check). Run `npm run dev` and look it over before treating this
  as final, especially on mobile widths.

## Product categories

`src/content.config.ts` adds a `category` string field to each product.
Current first-pass grouping (provisional, expect a refined breakdown
later): `pipes`, `membranes-geosynthetics`, `other`. The products page
(`src/pages/[lang]/products/index.astro`) groups by this field and renders
one heading + grid per category, in the order defined by `categoryOrder`
in that file — any category not in that list still renders, just after
the three listed, so a new category never silently disappears. Category
display labels are the `category.*` keys in `src/i18n/ui.ts`. To add a
new category: add the label keys (all 3 languages), set `category: "..."`
on the relevant products, and optionally add it to `categoryOrder` to
control where it sorts.
- **The hero is a scoped exception, not a second theme.** The `.hero` CSS
  rule locally re-declares the same variable names (`--paper`, `--mist`,
  `--route`, etc.) back to their old dark-theme values, so every
  descendant element (`h1`, `p`, `.eyebrow`, `.btn`...) renders correctly
  as light-on-dark inside the hero without any component needing
  hero-specific styling. `--void` is deliberately left at its light value
  even inside the hero, so `.btn`'s hover state (which swaps to
  `var(--void)`) gives a clean light "ghost button" against the photo.
- **The homepage is intentionally short**: Hero → brief intro + video →
  Featured products → Contact. Facility and Certificates are deliberately
  *not* homepage sections — they're one-click away via nav, but don't get
  a dedicated homepage narrative beat. If that ever changes, match the
  existing numbered-eyebrow pattern (see below) rather than inventing a
  new heading style.
- **Scroll animation** is handled by `src/components/ScrollFX.astro`
  (included once, globally, via `Layout.astro`), using GSAP + ScrollTrigger
  for a fade/slide-up reveal on any element marked `.reveal`. Skipped
  entirely for `prefers-reduced-motion` — content just appears
  immediately, no motion.
- **Numbered section labels** (01, 02, 03...) only appear on the homepage,
  where they narrate a real sequence (origin → who we are/video → product
  range → contact). Other pages use a plain, unnumbered eyebrow label —
  don't add numbering there, it wouldn't correspond to an actual sequence.
- This was built without a way to render a live screenshot in the build
  environment, so it's been checked carefully in code (contrast, light/
  dark variants of every hardcoded color) and spot-checked with a local

  WeasyPrint render (a CSS-to-PDF renderer, not a real browser — good
  enough to catch gross errors, not a substitute for the real thing). Run
  `npm run dev` and look it over before treating it as final, especially
  on mobile widths.

## Running it locally

```
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to dist/
npm run preview   # serve the built dist/ locally
```

## Project structure

- `src/content/products/` — **see `PRODUCT_GUIDE.md`** for the full
  breakdown. One Markdown file per product (currently English-only, e.g.
  `hdpe-pipes-en.md`), tied to translations by a shared `group` id, and
  grouped into a `category` (see "Product categories" above). Content is
  real (from the manufacturer's catalogue); photos are `.png` placeholders
  pending real product photography — see the note on that in the intro
  above.
- `src/content/certificates/` — 4 English-only entries, shown as picture
  cards: photo, issuing body, and a one-line scope — no expiry dates, no
  download buttons, click the photo to zoom. Images are colocated at
  `src/content/certificates/images/`. To add a translation, add e.g.
  `cert-1-de.md` with `lang: "de"` and the same `group: "cert-1"` — every
  page falls back to English automatically until a translation exists (see
  "How the language-fallback system works" below).
- `src/pages/[lang]/about.astro` — the About page: the fuller company
  narrative (moved here from the homepage) plus an "Our manufacturing
  partner" section with 2-3 facility photos and captions. Reuses the same
  photo files as `/facility/`, just with different captions for this
  context — not wired to the lightbox here, kept as a simpler supporting
  visual rather than another browsable gallery.
- `src/content/facility/` — real photos of the manufacturing facility and
  site work, used for the homepage hero background
  (currently a generated light placeholder — see the note in the intro
  above and the code comment in `src/pages/[lang]/index.astro`) and the
  `/facility/` gallery page (dropped from the homepage as its own
  section per request — it's nav-only now). Currently 4 photos; add more
  by dropping a new photo into `src/content/facility/images/` and a
  matching `<group>-en.md` file (copy an existing one as a template) — no
  code changes needed, the gallery grid picks up any number of entries
  automatically.
- `public/videos/facility-overview.mp4` — **currently an empty 0-byte
  placeholder file.** Replace it with the real video, same filename, and
  the `/facility/` page's video player works with no code changes. Keep
  the file reasonably web-sized (H.264 MP4, ideally under ~50MB — large
  raw camera exports will make the page slow to load) and update the
  poster frame if needed (`src/content/facility/images/factory-nameplate.jpg`,
  set in `src/pages/[lang]/facility.astro`).
- `src/i18n/ui.ts` — every UI string (nav labels, button text, etc.) in all
  three languages. Edit here for site-wide wording changes.
- `src/i18n/utils.ts` — includes `withLangFallback()`, the shared helper
  every English-only collection (products, certificates, facility) uses
  to fall back to English on `/de/` and `/fr/` pages until a translation
  exists. See "How the language-fallback system works" below.
- `src/pages/[lang]/...` — the page templates. One set of files serves all
  three languages via Astro's `getStaticPaths`.
- `public/catalogue/Catalogue-2026-eng.pdf` — the one downloadable
  catalogue, English only for now; every language's `/catalogue/` page
  links to this same file, with a short note for DE/FR visitors that it's
  English-only. Just replace this file with the real catalogue, keeping
  the same filename (or update the `pdfPath` in
  `src/pages/[lang]/catalogue.astro` if you rename it). When translated
  catalogues exist, add e.g. `Catalogue-2026-de.pdf` and extend that same
  `pdfPath` logic to pick the right file per language.

## How the language-fallback system works

Products, certificates, and facility photos are all currently
English-only. Rather than a blank page on `/de/` or `/fr/` until every
item is translated, `withLangFallback()` in `src/i18n/utils.ts` groups
entries by their shared `group` id and prefers a same-language entry when
one exists, otherwise falls back to English. A small "· EN" tag appears
on any card/page showing fallback content, so it's clear at a glance
what's still untranslated.

To add a translation for anything (a product, a certificate, a facility
photo), copy the existing `<group>-en.md` file to `<group>-de.md` (or
`-fr.md`), change `lang: "en"` to `lang: "de"`, keep `group` identical,
and translate the content. It's picked up automatically on the next
build — no code changes anywhere.

## Why product/certificate/facility images live in `src/content/`, not `public/`

Product, certificate, and facility photos are all colocated with their
Markdown files under `src/content/` and referenced through Astro's
`image()` schema helper, rather than dropped straight into `public/`. The
practical difference: images under `src/content/` get run through Astro's
build-time optimization pipeline (auto-resized, converted to WebP,
width/height set to avoid layout shift), while anything in `public/` is
served exactly as uploaded. For real photos and scans -- which can easily
be several MB straight off a phone or scanner -- that optimization
matters for page speed. The placeholder certificate JPGs in this project
shrank from ~40KB to ~7-13KB WebP automatically on build, and a couple of
the facility photos went from ~85-143KB down to well under half that.
Dropping in a replacement file is exactly as easy either way, so there's
no convenience trade-off, only a performance one.

The one exception is the facility video
(`public/videos/facility-overview.mp4`) — Astro's image pipeline doesn't
apply to video, so it lives in `public/` like the catalogue PDF.

## Hosting (free, commercial use allowed)

Deploy to **Netlify** (recommended — has built-in form handling, see below)
or **Cloudflare Pages**. Both:
- Build command: `npm run build`
- Publish directory: `dist`
- Free tier permits commercial use and custom domains.

Avoid GitHub Pages (not licensed for business sites) and Vercel's free Hobby
tier (commercial use is against its terms — Pro starts at $20/month).

## Domain and email

- Buy the domain from a registrar (Cloudflare Registrar, Namecheap, IONOS,
  Porkbun, etc.) — this is the one piece that isn't free, typically
  €10–15/year for a `.com`. Point its DNS at your Netlify/Cloudflare Pages
  site once registered.
- For `info@yourdomain.com`-style email, Zoho Mail's free plan supports a
  custom domain for up to 5 users (web access only, no IMAP/POP on the free
  tier). Cloudflare Email Routing is a simpler free alternative if you only
  need incoming mail forwarded to an existing inbox.

## Contact form

The form on `/contact/` is a plain HTML form (no JavaScript) with
`data-netlify="true"`. On Netlify, this is enough — no backend code
needed; submissions get captured automatically and show up in your
Netlify dashboard. Netlify Forms is free (submissions became free across
all plans as of April 2026, with a 100/month soft cap before it
auto-upgrades a tier), so this doesn't cost anything at this site's
traffic level.

**To get submissions emailed to you (currently set to test with
`bibududu@duck.com`):** this one step has to happen in Netlify's
dashboard, not in code — Netlify doesn't expose form-notification
recipients via `netlify.toml` or the HTML form. After connecting this
repo to Netlify:

1. Go to **Project configuration → Notifications → Emails and webhooks →
   Form submission notifications**.
2. Select **Add notification → Email notification**.
3. Enter `bibududu@duck.com` (or whatever address you want submissions
   sent to).

When the real company inbox is ready, just repeat step 3 with the new
address — no code changes needed. The form also sets `name="email"`,
which Netlify uses to auto-fill the Reply-To header with whatever the
visitor typed, so you can just hit reply directly from the notification
email.

If you deploy on Cloudflare Pages instead, swap the form `action`/hidden
fields for a free service like Web3Forms or Formspree, which let you set
the destination email directly in their dashboard/config the same way.

## No admin panel

There's no CMS/admin panel in this build (a Decap CMS config was
considered but removed on request). Content changes — new products,
updated specs, swapped photos — are made by editing the Markdown files in
`src/content/` directly and redeploying. If a browser-based editor for
non-technical content updates becomes useful later, that's a self-
contained addition (Decap CMS is the natural free option) and doesn't
require restructuring anything else in this project.

## GDPR, cookies, and the legal-notice page

This build ships **zero cookies and zero third-party requests** by
design — no analytics, no Google Fonts (the site uses only system fonts,
see `src/styles/global.css`), nothing that calls out to a third party.
The facility video is self-hosted (`public/videos/`), not an embedded
YouTube/Vimeo player, so it doesn't introduce a third-party call either.
If that stays true, you do **not** need a cookie-consent banner — the
ePrivacy/cookie-consent rules are triggered by setting cookies or using
non-essential tracking technology, not by having a website.

That said, a cookie banner and a privacy notice are two different
questions:
- **No cookies → no cookie banner needed**, as long as it stays that
  way. The moment you add analytics, an *embedded* YouTube/Vimeo video,
  Google Fonts loaded from Google's servers, a chat widget, or a
  reCAPTCHA-style form protection, that thing very likely sets a cookie or
  makes a third-party network call, and the calculus changes.
- **A privacy notice is still needed regardless of cookies.** The contact
  form collects a name, email, and message — that's personal data
  processing under GDPR independent of cookies — and so, separately, is
  the fact that any web server (including Netlify's or Cloudflare's) logs
  visitor IP addresses by default. `/privacy/` in this project is a
  placeholder marking what that notice needs to cover, including a note
  that Luxembourg's CNPD would typically be the relevant supervisory
  authority to name, since Ronesans Trading Lux is Luxembourg-registered. It isn't
  legal text.
- **A legal-notice page is a near-universal requirement** for a commercial
  site serving EU customers, independent of both cookies and the privacy
  notice. `/imprint/` is the placeholder for that, written around
  Luxembourg's register/VAT/business-permit disclosure requirements
  (rather than Germany's Impressum rules, since that's where Ronesans Trading Lux is
  actually registered) — note the reminder on that page that these details
  belong to **Ronesans Trading Lux**, not to Galkynysh Plastik.

None of this is legal advice — it's worth a final check from whoever
handles the company's legal/compliance side before launch, especially if
analytics or marketing tools get added later.
