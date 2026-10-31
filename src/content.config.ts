import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const common = {
  title: z.string(),
  description: z.string(),
  draft: z.boolean().default(false),
};
export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({ ...common, date: z.coerce.date() }),
  }),
  projects: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: z.object({ ...common, url: z.url().optional() }),
  }),
};
