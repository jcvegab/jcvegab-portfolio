# ADR 0002: Store Versioned Content in Markdown

## Status

Accepted (2026-07-21)

## Context

The site needs editable content (pages, blog posts, portfolio projects) without a CMS. All authors are developers.

## Decision

Store content as Markdown files in `content/pages/`. Use frontmatter for metadata (title, layout, SEO, date, sections). Use `gray-matter` for parsing and `marked` for rendering.

## Consequences

- **Content is version-controlled** alongside code. Changes go through the same PR and CI workflow as code.
- **No runtime database or API.** Content is loaded at build time via `src/utils/content.ts`.
- The file path under `content/pages/` determines the public URL (e.g., `content/pages/blog/workplace.md` → `/blog/workplace/`).
- `index.md` files resolve to directory URLs (e.g., `content/pages/portfolio/index.md` → `/portfolio/`).
- Global configuration lives separately in `content/data/config.json` with a JSON Schema in `schemas/config.schema.json`.
- `path_prefix` in config is consumed by `src/utils/withPrefix.ts` to normalize asset and link URLs for deployments under a subpath.
