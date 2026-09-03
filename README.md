# Friends of the Latimer House

Website for the Friends of the Latimer House at the William and Martha Brown Park,
a Tennessee 501(c)(3) restoring a 1790's hand hewn log house in Sumner County.

## Stack

- **Astro**, static output. No server, no database.
- **Cloudflare Pages** hosting. Push to `main` deploys.
- Design tokens in `src/styles/tokens.css`, generated from the Figma
  variables in LH-Master-Brand. Do not hand-edit colour or type values there.
- Everything that appears on every page lives in `src/site.config.ts`.

## Local development

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Conventions

- **No em dashes**, anywhere, in code comments or copy.
- The founding date is **the 1790's**, the decade, never the year.
- **0.805 acres** is the only acreage this organisation publishes.
- Full chartered name in anything legal. Never ", Inc."
- Express type and spacing in **relative units**. A pixel line-height that
  did not scale with font size was the one bug that hit 24 screens in Figma.

Copy is governed by the Website Copy Deck v2.0 and the Voice and Style
Guide v3.0, both in the project knowledge base.
