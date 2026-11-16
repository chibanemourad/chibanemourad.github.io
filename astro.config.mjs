import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://chibanemourad.github.io",
  output: "static",
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-default" },
      defaultColor: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404/") && !page.endsWith("/404.html"),
    }),
  ],
});
