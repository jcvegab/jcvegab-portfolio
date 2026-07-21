# ADR 0001: Use Next.js Static Export

## Status

Accepted (2026-07-21)

## Context

The site is a personal portfolio and blog. Content updates are infrequent. The deployment target (`out/` static files) does not require a Node.js server.

## Decision

Use Next.js with `output: 'export'` in `next.config.js`. This produces a fully static site that can be served from any CDN or static host.

## Consequences

- **No API routes or server-side runtime.** Any dynamic behavior must happen at build time or on the client.
- **Images use `unoptimized: true`** since Next.js image optimization requires a server.
- **`trailingSlash: true`** ensures clean URL resolution for static file hosting.
- All content is baked at build time. A new build is required after any Markdown or config change.
- Sitemap (`src/app/sitemap.ts`) and robots (`src/app/robots.ts`) use `dynamic = 'force-static'` to remain compatible with static export.
