# Ronesans Trading — website

A trilingual (EN/DE/FR) static company site built with Astro: home page,
product gallery with detail pages, certificates, a downloadable PDF
catalogue, and a contact form.

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

Everything else in here is placeholder content — swap it for the real
product line, certificates, and copy before launch.

## Running it locally

```
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to dist/
npm run preview   # serve the built dist/ locally
```

## Project structure

- `src/content/products/` — one Markdown file per product **per language**
  (e.g. `hdpe-pipe-en.md`, `hdpe-pipe-de.md`, `hdpe-pipe-fr.md`), tied
  together by a shared `group` id. Images live in
  `src/content/products/images/` (currently placeholder line-art SVGs —
  replace with real product photos, same filenames or update the `image:`
  path in the matching `.md` file).
- `src/content/certificates/` — currently 3 English-only entries
  (`cert-1-en.md`, `cert-2-en.md`, `cert-3-en.md`), images colocated at
  `src/content/certificates/images/Cert1.jpg` / `Cert2.jpg` / `Cert3.jpg`.
  Every language page falls back to these English entries automatically.
  To add a German or French certificate later, just add e.g.
  `cert-1-de.md` with `lang: "de"` and the same `group: "cert-1"` — the
  certificates page picks it up with no code changes. Edit the placeholder
  `title`/`issuer` text in each `.md` file to match the real certificates.
- `src/i18n/ui.ts` — every UI string (nav labels, button text, etc.) in all
  three languages. Edit here for site-wide wording changes.
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

## Why product/certificate images live in `src/content/`, not `public/`

Both product and certificate photos are colocated with their Markdown
files under `src/content/` and referenced through Astro's `image()`
schema helper, rather than dropped straight into `public/`. The practical
difference: images under `src/content/` get run through Astro's build-time
optimization pipeline (auto-resized, converted to WebP, width/height set
to avoid layout shift), while anything in `public/` is served exactly as
uploaded. For real photos and scans -- which can easily be several MB
straight off a phone or scanner -- that optimization matters for page
speed. The placeholder certificate JPGs in this project shrank from ~39KB
to ~3KB WebP automatically on build, and real photos would see a similar
or larger improvement. Dropping in a replacement file is exactly as easy
either way, so there's no convenience trade-off, only a performance one --
which is why certificates ended up here too rather than in `public/`.

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
design — no analytics, no embedded videos, no Google Fonts (the site uses
only system fonts, see `src/styles/global.css`), nothing that calls out to
a third party. If that stays true, you do **not** need a cookie-consent
banner — the ePrivacy/cookie-consent rules are triggered by setting
cookies or using non-essential tracking technology, not by having a
website.

That said, a cookie banner and a privacy notice are two different
questions:
- **No cookies → no cookie banner needed**, as long as it stays that
  way. The moment you add analytics, an embedded YouTube video, Google
  Fonts loaded from Google's servers, a chat widget, or a reCAPTCHA-style
  form protection, that thing very likely sets a cookie or makes a
  third-party network call, and the calculus changes.
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
