/** Shared by the lander, its pages and the year archive. */
import type { CollectionEntry } from "astro:content";

/** Nine to a page, which is three rows of three on the canvas grid. */
export const PER_PAGE = 9;

export const newest = (posts: CollectionEntry<"news">[]) =>
  [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const yearsOf = (posts: CollectionEntry<"news">[]) =>
  [...new Set(posts.map((p) => p.data.date.getUTCFullYear()))].sort((a, b) => b - a);

/** "The Record" -> "the-record". The category routes are built from this. */
export const categorySlug = (c: string) =>
  c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
