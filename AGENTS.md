# AGENTS.md

## Commands

- `npm run dev` — dev server
- `npm run lint` — Biome check (lint + format validation)
- `npm run format` — Biome format --write
- `npm run type-check` — `astro check`
- `npm run test` — Vitest run (use `npm run test:watch` for watch mode)
- `npm run build` — static export to `out/`
- CI runs: lint → type-check → test → build.

## Architecture

- **Astro 7 static site**. No server runtime, no API routes.
- **Content-driven pages**: Markdown files in `content/pages/` with frontmatter. The `type` or `layout` field maps to a layout component in `src/layouts/` (advanced, blog, page, portfolio, post, project).
- **Global config**: `content/data/config.json` (schema: `schemas/config.schema.json`).
- **Routing**: `src/pages/index.astro` (home) + `src/pages/[...slug].astro` (all other pages). Both resolve content via `src/utils/content.ts` and render through `src/components/PageRenderer.tsx` which uses the layout registry in `src/layouts/index.ts`.
- **Path alias**: `@/*` → `./src/*`
- **React integration**: React components render at build time via `@astrojs/react`. Interactive components use `client:load`.

## Conventions

- **Linter/formatter is Biome** (not ESLint/Prettier). Import order is enforced in groups: react → packages/node → components → layouts → utils → relative → types → SCSS/CSS.
- **Biome overrides**: `noSvgWithoutTitle` off, `noImgElement` off. `.astro` files excluded from Biome.
- **JS**: single quotes, trailing commas. **JSX**: double quotes. 2-space indent, 80-char lines.
- **Styling**: SCSS (`src/sass/`). No Tailwind, no CSS modules. Use `import { classNames } from '@/utils'` for composing class strings.
- **TypeScript**: `strict: false`.
- **Tests**: Unit tests in `__tests__` dirs adjacent to source files (e.g. `src/components/__tests__/`).
- **Pre-commit**: husky + lint-staged runs `biome check --write --unsafe`.

## Environment

- Node >= 24, npm >= 11.
- Site language is Spanish (`lang="es"`).
