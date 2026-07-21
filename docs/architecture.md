# Architecture

This repository is a static site built with Next.js 16 App Router and `output: 'export'`. No server runtime, no API routes.

## Render Flow

1. `src/app/page.tsx` loads the home page from `content/pages/index.md`.
2. `src/app/[...slug]/page.tsx` generates static routes for the rest of `content/pages/`.
3. `src/utils/content.ts` reads Markdown, frontmatter, and `content/data/config.json`.
4. `src/layouts/index.ts` selects the layout using `layout` or `type` from frontmatter.
5. Layouts compose components from `src/components/` and global styles from `src/sass/`.

## Layers

| Layer | Path | Responsibility |
|---|---|---|
| Entry | `src/app/` | Routes, metadata, sitemap, and robots |
| Layouts | `src/layouts/` | Visual structure per page type |
| Components | `src/components/` | Reusable UI blocks |
| Utilities | `src/utils/` | Markdown, URLs, CSS classes, dates, and helpers |
| Content | `content/` | Editable site data |
| Styles | `src/sass/` | Global SCSS and partials by visual domain |

## Key Points

- `next.config.js` sets `output: 'export'`, `trailingSlash: true`, and disables runtime image optimization.
- Content is part of the build. Markdown changes require a new build.
- `content/data/config.json` provides header nav, footer links, domain, color scheme, accent color, and `path_prefix`. The favicon in this file is **not read at runtime**; the favicon is hardcoded in `src/app/layout.tsx:15-17`.
- `schemas/config.schema.json` documents the expected shape of global configuration.
- Tests live next to source code in `__tests__` directories.

## Hotspots

Codebase memory identifies these utilities as high fan-in points:

| Utility | Primary use |
|---|---|
| `withPrefix` | Normalize paths with configurable prefix |
| `htmlToReact` | Convert rendered HTML to React nodes |
| `markdownify` | Convert Markdown into safe renderable HTML |
| `classNames` | Compose CSS classes via `clsx` |
| `getPageUrl` | Resolve public URLs from page data |
| `getPageDataBySlug` | Read page by slug |

Changes to these utilities should be validated with lint, type-check, and tests.
