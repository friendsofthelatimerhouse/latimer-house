/** Shared by the lander, its pages and the year archive. */
import type { CollectionEntry } from "astro:content";

/** Six to a page, which is the grid on the canvas: two rows of three. */
export const PER_PAGE = 6;

export const newest = (posts: CollectionEntry<"news">[]) =>
  [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const yearsOf = (posts: CollectionEntry<"news">[]) =>
  [...new Set(posts.map((p) => p.data.date.getUTCFullYear()))].sort((a, b) => b - a);
