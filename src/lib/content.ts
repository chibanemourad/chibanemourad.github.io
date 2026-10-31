import { getCollection } from "astro:content";
export const articles = async () =>
  (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
export const projects = async () =>
  (await getCollection("projects", ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
