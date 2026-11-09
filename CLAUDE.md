# CLAUDE.md: Friends of the Latimer House website

The public site for the Friends of the Latimer House at the William and
Martha Brown Park, a Tennessee 501(c)(3) restoring a 1790's hand hewn log
house in Sumner County. Live at https://friendsofthelatimerhouse.org.

Read this before changing anything. The fuller record (accounts, DNS, email,
history of decisions) is in `Latimer_House_Website_Tech_Stack.md` in the
board's Dropbox (BRANDING/Docs) and in the Claude project "Latimer House".

---

## How we work

- **Do not commit and do not push.** Make the change, build it, check it,
  then stop. Leave everything uncommitted so it shows in GitHub Desktop.
- **Finish every change with a commit summary and description** for Jeremy
  to paste into GitHub Desktop. Summary: one line, under about 60
  characters. Description: plain sentences on what changed and why. He
  commits to `main` and pushes.
- Every push to `main` builds and deploys on Cloudflare in about a minute,
  at no cost. There is no reason to batch changes.
- Show design changes before building them when the choice is visual.
  Jeremy prefers several options side by side (in Figma, file
  `J6tmJ4c3ysRP87XMED63WO`, page Visual Concepts) before committing to one.
- Ask before deleting files.

## Check before handing over

```
npm run build    # must end with "Complete!" (about 40 pages)
npm run dev      # http://localhost:4321, or the next free port
```

- `astro.config.mjs` sets `server: { host: true }`, so a phone on the same
  wifi can open the Network address the dev server prints.
- Check desktop and phone widths. Content animates in with AOS: when
  screenshotting with Playwright, add
  `[data-aos]{opacity:1!important;transform:none!important}` or elements
  appear blank or half faded.
- `shot.mjs` is left over from the old cloud workflow (paths under
  `/home/claude`). Don't rely on it as is.

## Stack

- **Astro 7** (7.4.8 as of November 2026), `output: "static"`,
  `trailingSlash: "always"`, `build.format: "directory"`. No server, no
  database. Node 22 (`.nvmrc`). Update with `npx @astrojs/upgrade`.
- **Markdown** goes through Satteri (`@astrojs/markdown-satteri`), not
  remark/rehype. `markdown.rehypePlugins` fails the build; plugins go in
  `markdown.processor: satteri({ hastPlugins: [...] })`. One plugin makes
  external links open in a new tab with a visually hidden ", opens in a new
  tab".
- **Hosting:** Cloudflare Workers, static assets only, configured in
  `wrangler.jsonc` (project `latimer-house`). Cloudflare also holds the DNS.
  Netlify is retired; don't reintroduce `netlify.toml`.
- **Fallback:** `.github/workflows/deploy.yml` publishes to GitHub Pages,
  manual only.
- **Fonts:** Playfair Display and Inter, self-hosted via Fontsource. Never
  Google Fonts.
- **No analytics, no tracking.** Don't add any.

## Where things live

- `src/site.config.ts`: the single source of truth. Names, EIN, both
  addresses, contact email, nav, PayPal button IDs, Kit form IDs, socials,
  the `house` facts used for search data. Change a fact here, once.
  - `prelaunch`: false. True would noindex the whole site.
  - `showVisit`: false. The Visit page builds but stays unlinked until the
    house is open to visitors.
- `src/layouts/Base.astro`: head, meta, canonical, Open Graph, and the
  structured data graph (WebSite, the house as LandmarksOrHistoricalBuildings,
  the NGO). Pages that should never be in search pass `noindex`.
- `src/styles/tokens.css`: design tokens generated from the Figma variables.
  Don't hand-edit color or type values.
- `src/styles/global.css`: shared styles.
- `src/components/`: header, footer, page heroes, bands, lightbox, `ToTop`.
- `src/content/news/`: News posts, one Markdown file each, named
  `YYYY-MM-DD-slug.md` (or `YYYY-MM-slug.md` when only the month is known).
  Schema in `src/content.config.ts`.

## News post conventions

- Frontmatter: title, date, `datePrecision` (day or month), category
  (Restoration, The Record, Events, History), excerpt, optional standfirst,
  tags, draft.
- An `###` directly above a `##` renders as the small eyebrow over the
  section heading.
- A blockquote's second paragraph is its attribution.
- An image followed by an italic paragraph renders as a captioned figure.
- Absolute dates only. Never "this morning" or "this year".
- Reprints of press pieces run verbatim with the outlet's own spellings,
  open with `*By Name, Outlet.*` (the article data reads the author from
  it), and close with a source line linking the original.
- Every image needs real alt text. Name the Latimer House where it fits.

## Voice and mechanics (non negotiable)

- **No em dashes, ever.** In copy, comments and commit messages.
- **The 1790's**, always the decade, written with the apostrophe. Never the
  year 1790.
- **Short name in prose** ("the Latimer House", "Friends of the Latimer
  House"). **Full chartered name** in anything legal: Friends of the Latimer
  House at the William and Martha Brown Park. Never ", Inc."
- Settled facts: the house's parcel is **0.805 acres**; the original Latimer
  tract was **640 acres along Station Camp Creek**. Don't reopen either.
- Mr. Brown's **$500,000** may be stated. Never publish any other fund
  balance unless the board has reconciled it.
- Warm, confident and grateful about the house and the family. Plain and
  direct about the record. Never urgent, never breathless.
- Copy is in the organization's voice ("we"), never first person singular,
  and never in or signed with Jeremy's name.
- The Voice and Style Guide is internal. Never quote it on the site.

## Lessons already paid for

- Type on dark grounds uses `--text-on-dark` and `--text-on-dark-body`,
  never a raw parchment step. When the parchment ramp moved, every dark
  section went pale.
- The torn edge is `.torn-top` on the band itself (a `::before` that
  inherits the band's color), not a separate element.
- `.post { display: flex }` beats the browser's `[hidden]`; filtered lists
  need `.listing [hidden] { display: none !important }`.
- The back to top button sits at z-index 45, under the header (50) and the
  open menu (100).
- The Site Credits link goes to https://brandaiddesignco.com/.
