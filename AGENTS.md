# AGENTS.md

## Commands

- `npm run dev` — dev server (uses `--turbo`)
- `npm run lint` — Biome check (lint + format validation)
- `npm run format` — Biome format --write
- `npm run type-check` — `tsc --noEmit`
- `npm run build` — static export to `out/`
- No test suite exists. CI runs: lint → type-check.

## Architecture

- **Next.js 16 static export** (`output: 'export'`). No server runtime, no API routes.
- **Content-driven pages**: Markdown files in `content/pages/` with frontmatter. The `type` or `layout` field maps to a layout component in `src/layouts/` (advanced, blog, page, portfolio, post, project).
- **Global config**: `content/data/config.json` (schema: `schemas/config.schema.json`).
- **Routing**: `src/app/page.tsx` (home) + `src/app/[...slug]/page.tsx` (all other pages). Both resolve content via `src/utils/content.ts` and render through the layout registry in `src/layouts/index.ts`.
- **Path alias**: `@/*` → `./src/*`

## Conventions

- **Linter/formatter is Biome** (not ESLint/Prettier). Import order is enforced in groups: react/next → packages/node → components → layouts → utils → relative → types → SCSS/CSS.
- **Biome overrides**: `noSvgWithoutTitle` off, `noImgElement` off.
- **JS**: single quotes, trailing commas. **JSX**: double quotes. 2-space indent, 80-char lines.
- **Styling**: SCSS (`src/sass/`). No Tailwind, no CSS modules.
- **TypeScript**: `strict: false`.
- **Pre-commit**: husky + lint-staged runs `biome check --write --unsafe`.

## Environment

- Node >= 24, npm >= 11.
- Site language is Spanish (`lang="es"`).
