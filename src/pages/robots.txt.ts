/**
 * robots.txt, generated rather than parked in public/ so it can follow the
 * pre launch switch in site.config instead of being a file somebody has to
 * remember to edit on launch day.
 *
 * Astro prerenders this at build time like any other page, so what Cloudflare
 * serves is a plain static file.
 *
 * The sitemap line appears only once the site is public. Advertising a map of
 * a draft site to every crawler that asks is the one thing that would undo
 * the noindex tags.
 */
import type { APIRoute } from "astro";
import { site, prelaunch } from "../site.config";

const prelaunchBody = `# Not yet launched.
#
# Crawling is allowed on purpose. Every page carries a noindex tag, and a
# crawler has to be let in to read it. Disallowing here would hide that tag
# and let bare URLs be listed anyway, which is the opposite of the intent.

User-agent: *
Allow: /
`;

const liveBody = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(prelaunch ? prelaunchBody : liveBody, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
