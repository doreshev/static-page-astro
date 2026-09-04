import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Each product/certificate/facility photo exists as one file PER LANGUAGE,
// tied together by a shared `group` id (e.g. "hdpe-pipe"). This keeps
// translations as plain, separate, editable files -- friendly for both
// hand-editing and a future CMS. Where only an English file exists, the
// consuming pages fall back to it automatically until a translation is added.

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(["en", "de", "fr"]),
      group: z.string(), // shared id across the 3 language versions of one product
      title: z.string(),
      shortDescription: z.string(),
      image: image(),
      imageAlt: z.string(),
      specs: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

// Certificates are intentionally minimal -- just the scan and a name. No
// issuer, expiry, or description fields: keeping the data model this thin
// is a deliberate choice (see PRODUCT_GUIDE.md / README for why).
const certificates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/certificates" }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(["en", "de", "fr"]),
      group: z.string(),
      title: z.string(),
      image: image(),
      imageAlt: z.string(),
      order: z.number().default(0),
    }),
});

// Real photography of the facility, equipment, and site work -- used for
// the homepage hero background and the /facility/ showcase gallery.
const facility = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/facility" }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(["en", "de", "fr"]),
      group: z.string(),
      caption: z.string(),
      image: image(),
      imageAlt: z.string(),
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

export const collections = { products, certificates, facility };
