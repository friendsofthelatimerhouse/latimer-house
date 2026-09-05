/**
 * Content collections.
 *
 * News is the first thing on this site that is not fixed copy. Every post is
 * one markdown file in src/content/news, which means a post is version
 * controlled, diffable and lives in the repository rather than on somebody
 * else's server. That matters for an organization whose whole difficulty has
 * been a record held by people who did not look after it.
 *
 * It is also the shape every browser based editor writes into, so adding an
 * admin at /admin/ later changes nothing here.
 *
 * WRITING A POST. The frontmatter below, then the article. Three conventions
 * carry the design, and all three are ordinary markdown:
 *
 *   ### The record          an h3 directly above an h2 renders as the small
 *   ## What was recorded.   uppercase eyebrow over the section heading
 *
 *   > The quoted sentence.  a blockquote is the pull quote. A SECOND
 *   >                       paragraph inside it is the attribution.
 *   > CODICIL NO. 1
 *
 *   ![alt text](./photo.jpg)   an image on its own, followed by an italic
 *   *Caption goes here.*       paragraph, renders as a captioned figure.
 *                              Astro resizes and converts it at build, so an
 *                              uploaded phone photograph is fine as it comes.
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * The five chips on the canvas toolbar, minus ALL, which is not a category
 * but the absence of a filter. Adding one here adds it to the toolbar, the
 * post meta line and the CMS dropdown at once.
 */
export const newsCategories = [
  "Restoration",
  "The Record",
  "Events",
  "History",
] as const;

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    /** The day it happened, not the day it was written. */
    date: z.coerce.date(),
    /**
     * Older entries on the canvas are dated to the month only, newer ones to
     * the day, because that is how well the record is known. Say which, and
     * the meta line follows.
     */
    datePrecision: z.enum(["day", "month"]).default("day"),
    category: z.enum(newsCategories),
    /** The two or three lines that appear on the card. Not the first
     *  paragraph of the article, which usually starts mid stride. */
    excerpt: z.string(),
    /** The standfirst under the headline on the post itself. */
    standfirst: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** Keeps a post out of the build entirely until it is ready. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
