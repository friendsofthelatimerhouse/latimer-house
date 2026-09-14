// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Pages that carry a permanent noindex, and so have no business in a
 * sitemap: a sitemap is a list of pages you are ASKING to be indexed, so
 * listing a noindex page sends two contradictory instructions.
 *
 * This list has to match the pages passing `noindex` to Base.astro. There
 * are three of them, and if a fourth appears it belongs here too.
 */
const NOINDEX = ["/visit/", "/thank-you/", "/thank-you/gift/"];

export default defineConfig({
  site: "https://friendsofthelatimerhouse.org",
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.some((path) => page.endsWith(path)),
    }),
  ],
  // Static output. The build produces plain HTML/CSS files, which is
  // what Cloudflare Pages serves. No server, no database, no runtime.
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  compressHTML: true,
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
