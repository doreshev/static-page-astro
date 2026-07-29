// @ts-check
import { defineConfig } from "astro/config";

// Replace with your real domain once registered (used for sitemap/canonical URLs).
const SITE_URL = "https://www.example.com";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  i18n: {
    locales: ["en", "de", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true, // every locale gets its own /en/ /de/ /fr/ prefix
    },
  },
});
