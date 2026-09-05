# Ronesans Trading — website

A trilingual (EN/DE/FR) static company site built with Astro: home page,
product catalogue, a facility/operations gallery with video, certificates,
a downloadable PDF catalogue, and a contact form.

**Naming:** the site markets products manufactured by **Galkynysh
Plastik**, but the legal entity operating this website is **Ronesans
Trading Lux** (short/brand name: **Ronesans Trading**), registered in
Luxembourg, acting as Galkynysh Plastik's official representative in the
EU. The two names are kept intentionally distinct throughout the site —
the brand/header uses the short name "Ronesans Trading", product copy
credits Galkynysh Plastik as manufacturer, and `/imprint/` uses the full
legal name "Ronesans Trading Lux" with a note on which one belongs in the
legal-notice section (the representative's registration details, not the
manufacturer's).

The 10 products already have real copy from the manufacturer's catalogue
— **see `PRODUCT_GUIDE.md`** for exactly what's left to do (mainly: swap
in real photos). Certificates, facility photos, and the video are also
using placeholder or manufacturer-supplied assets — check each section
below before launch.

## Design direction

The site uses a dark, cinematic "engineered route" visual system: a
near-black canvas, oversized bold display type, and one vivid blue accent,
leaning on real facility photography rather than invented graphics for
its visual interest. A few notes if you're picking this back up:

- **Design tokens** live at the top of `src/styles/global.css` (`--void`,
  `--panel`, `--paper`, `--mist`, `--route`, etc.) — change the palette
  there and it propagates everywhere, since every page reuses the same
  component classes (`.card`, `.btn`, `.hero`, `.notice`, etc.). This is a
  single dark theme by design — there's no light-mode toggle.
- **Real photography carries the visual weight, deliberately used
  sparingly.** There are exactly two photo "moments" on the homepage: the
  hero background (`src/content/facility/images/pipe-tunnel.jpg`, dimmed
  with a gradient overlay so the headline stays legible) and one small,
  restrained "facility break" — a single square photo with a "View the
  gallery" link, no heading or paragraph — between "who we are" and the
  product range. An earlier version of the hero also had an invented
  abstract compass/dial graphic; it was removed in favor of letting the
  real photography do that work instead, and to keep the hero from feeling
  busy. Resist the urge to add more background-photo moments beyond these
  two — restraint is what keeps the homepage from feeling cluttered; the
  full photo set already lives on the `/facility/` gallery page for anyone
  who wants to see more.
- **Scroll animation** is handled by `src/components/ScrollFX.astro`
  (included once, globally, via `Layout.astro`), using GSAP + ScrollTrigger
  for a fade/slide-up reveal on any element marked `.reveal`. Skipped
  entirely for `prefers-reduced-motion` — content just appears
  immediately, no motion.
- **Numbered section labels** (01, 02, 03...) only appear on the homepage,
  where they narrate a real sequence (origin → who we are → product range
  → certification → contact). The facility break is intentionally
  *not* numbered — it's a visual pause, not a narrative beat. Other pages
  use a plain, unnumbered eyebrow label — don't add numbering there, it
  wouldn't correspond to an actual sequence.
- This was built without a way to render a live screenshot in the build
  environment, so it's been checked carefully in code (contrast, dark
  variants of every hardcoded color) and spot-checked with a local
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
  `hdpe-pipes-en.md`), tied to translations by a shared `group` id.
  Content is real (from the manufacturer's catalogue); photos are
  placeholders pending real product photography.
- `src/content/certificates/` — 3 English-only entries, deliberately
  minimal per request: just a photo and a name, no issuer/expiry/
  description fields. Images are colocated at
  `src/content/certificates/images/`. To add a translation, add e.g.
  `cert-1-de.md` with `lang: "de"` and the same `group: "cert-1"` — every
  page falls back to English automatically until a translation exists (see
  "How the language-fallback system works" below).
- `src/content/facility/` — real photos of the manufacturing facility and
  site work, used for the homepage hero background, the homepage's
  "Where it's made" teaser section, and the `/facility/` gallery page.
  Currently 4 photos; add more by dropping a new photo into
  `src/content/facility/images/` and a matching `<group>-en.md` file
  (copy an existing one as a template) — no code changes needed, the
  gallery grid picks up any number of entries automatically.
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
