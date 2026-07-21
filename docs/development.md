# Development

## Setup

```bash
npm install
```

Requirements:

- Node.js >= 24.0.0
- npm >= 11.0.0

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Local dev server with Turbopack |
| `npm run build` | Next.js build and static export |
| `npm run lint` | Biome check (`check --no-errors-on-unmatched`) over `src/` |
| `npm run format` | Biome format over `src/` |
| `npm run type-check` | TypeScript without emitting files |
| `npm run test` | Vitest run |
| `npm run test:watch` | Vitest watch |
| `npm run test:coverage` | Vitest with coverage |

## Conventions

- TypeScript in non-strict mode as configured (`strict: false` in `tsconfig.json`).
- Imports use the `@/*` alias to `src/*`.
- Styles use global SCSS in `src/sass/`. No Tailwind or CSS modules.
- Biome controls formatting and linting.
- Unit tests live next to source code in `__tests__` directories.
- Shared components are exported from `src/components/index.ts`.
- Layouts are registered in `src/layouts/index.ts`.

## Pre-commit Hook

Husky with `lint-staged` runs Biome on staged files before every commit.

- Config: `.lintstagedrc.mjs` — runs `biome check --write --unsafe` on `*.{js,ts,jsx,tsx,json,jsonc,css}`.
- Hook: `.husky/pre-commit` — executes `npx lint-staged`.

## Validation Before Commit

```bash
npm run lint
npm run type-check
npm run test
```

The same sequence runs in CI (`.github/workflows/ci.yml`).

## Static Build

`npm run build` generates a static export in `out/` via `output: 'export'`.

Considerations:

- Do not add API routes or server dependencies.
- Use images compatible with static export (`images.unoptimized: true`).
- Keep `trailingSlash: true` for generated routes.
