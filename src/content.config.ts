import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Each product/certificate exists as one file PER LANGUAGE, tied together by a
// shared `group` id (e.g. "hdpe-pipe"). This keeps translations as plain,
// separate, editable files -- friendly for both hand-editing and a future CMS.

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

const certificates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/certificates" }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(["en", "de", "fr"]),
      group: z.string(),
      title: z.string(),
      issuer: z.string(),
      validUntil: z.string().optional(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      order: z.number().default(0),
    }),
});

export const collections = { products, certificates };
