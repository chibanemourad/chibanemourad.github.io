import rss from "@astrojs/rss";
import { articles } from "../lib/content";
import type { APIContext } from "astro";
export async function GET(context: APIContext) {
  return rss({
    title: "Mourad Chibane — Writing",
    description: "Notes on software engineering",
    site: context.site!,
    items: (await articles()).map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
    })),
  });
}
