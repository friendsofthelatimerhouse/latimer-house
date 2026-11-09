// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { readdirSync, readFileSync } from "node:fs";

/**
 * Pages that carry a permanent noindex, and so have no business in a
 * sitemap: a sitemap is a list of pages you are ASKING to be indexed, so
 * listing a noindex page sends two contradictory instructions.
 *
 * This list has to match the pages passing `noindex` to Base.astro. If a new
 * noindex page appears and is not added here, it lands in the sitemap and the
 * site asks Google to index a page it has just told Google not to index.
 */
const NOINDEX = ["/visit/", "/thank-you/", "/thank-you/gift/", "/thank-you/details/", "/check-your-inbox/", "/give/cancelled/", "/thank-you/membership/"];

/**
 * External links in markdown open in a new tab, the same way the footer's
 * social links and the map links already do: target="_blank",
 * rel="noopener", and a visually hidden ", opens in a new tab" so a screen
 * reader user is told before the tab changes under them.
 *
 * Applies to every news post automatically, so whoever writes the next one
 * only has to write an ordinary markdown link. Links back into this site are
 * left alone.
 *
 * Astro 7 renders markdown with Satteri, not remark/rehype, so this is a
 * Satteri hast plugin handed to the default processor. rehypePlugins would
 * need the old unified pipeline installed alongside it.
 */
const OWN_SITE = /^https?:\/\/(www\.)?friendsofthelatimerhouse\.org(\/|$)/i;
const externalLinks = {
  name: "external-links-new-tab",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = String(node.properties?.href ?? "");
      if (!/^https?:\/\//i.test(href) || OWN_SITE.test(href)) return;
      ctx.setProperty(node, "target", "_blank");
      ctx.setProperty(node, "rel", ["noopener"]);
      ctx.appendChild(node, {
        type: "element",
        tagName: "span",
        properties: { className: ["visually-hidden"] },
        children: [{ type: "text", value: ", opens in a new tab" }],
      });
    },
  },
};

/**
 * Each news post's date, keyed by its URL, so the sitemap can tell search
 * engines when a post appeared. Read straight from the frontmatter because
 * the content collection is not available to the config. The slug rule
 * matches slugOf in src/pages/news/[slug].astro. Drafts are skipped, since
 * they are not built.
 *
 * Only posts get a date. A fixed page has no honest "last changed" date to
 * give, and a wrong one teaches Google to ignore the field for the whole
 * site.
 */
const NEWS_DIR = new URL("./src/content/news/", import.meta.url);
const newsDates = Object.fromEntries(
  readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".md"))
    .flatMap((f) => {
      const fm = readFileSync(new URL(f, NEWS_DIR), "utf8").split(/^---$/m)[1] ?? "";
      if (/^draft:\s*true/m.test(fm)) return [];
      const date = fm.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
      const slug = f.replace(/\.md$/, "").replace(/^\d{4}-\d{2}(-\d{2})?-/, "");
      return date ? [[`/news/${slug}/`, date]] : [];
    }),
);

export default defineConfig({
  site: "https://friendsofthelatimerhouse.org",
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.some((path) => page.endsWith(path)),
      serialize(item) {
        const date = newsDates[new URL(item.url).pathname];
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  // Static output. The build produces plain HTML/CSS files, which is
  // what Cloudflare Pages serves. No server, no database, no runtime.
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  compressHTML: true,
  markdown: { processor: satteri({ hastPlugins: [externalLinks] }) },
  /**
   * Bind the dev server to every interface rather than localhost only, so
   * a phone on the same wifi can reach it. Without this astro dev listens
   * on 127.0.0.1 and nothing off this machine can see it, which looks
   * exactly like the site being broken on mobile.
   *
   * Dev and preview only. It has no bearing on the static build or on what
   * Cloudflare serves.
   */
  server: { host: true },
});
