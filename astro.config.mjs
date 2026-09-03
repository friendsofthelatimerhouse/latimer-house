// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://friendsofthelatimerhouse.org",
  // Static output. The build produces plain HTML/CSS files, which is
  // what Cloudflare Pages serves. No server, no database, no runtime.
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  compressHTML: true,
});
