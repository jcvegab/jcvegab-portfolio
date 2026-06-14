# Jcvegab Portfolio

A personal portfolio website built with Next.js, showcasing projects and blog posts.

## Tech Stack

- **Framework:** Next.js 16 (Static Export)
- **UI / Core:** React 19, TypeScript
- **Styling:** SCSS
- **Content:** Markdown (parsed via `gray-matter` & `marked`)
- **Testing:** Vitest + React Testing Library
- **Linting & Formatting:** Biome

## Prerequisites

- Node.js >= 24.0.0
- npm >= 11.0.0

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Static export to `out/` |
| `npm run lint` | Biome check (lint + format validation) |
| `npm run format` | Biome format --write |
| `npm run type-check` | `tsc --noEmit` |
| `npm run test` | Vitest run |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with coverage |

CI order: lint `->` type-check `->` test.

## Architecture & Content

### Page Layouts

The `layout` or `type` frontmatter field selects a layout component from `src/layouts/`:

- `page` (default)
- `advanced`
- `blog`
- `portfolio`
- `post`
- `project`

### Markdown Sections (`advanced` layout)

Pages using the `advanced` layout can define a `sections` array in frontmatter:

| Section type | Component | Purpose |
|---|---|---|
| `section_hero` | SectionHero | Hero banner with avatar, title, description, CTA buttons |
| `section_portfolio` | SectionPortfolio | Grid/mosaic of recent projects |
| `section_posts` | SectionPosts | Grid of recent blog posts |
| `section_grid` | SectionGrid | Generic grid items with image, text, buttons |
| `section_content` | SectionContent | Text block with optional image |
| `section_form` | SectionForm | Contact form (Netlify Forms) |
| `section_testimonials` | SectionTestimonials | Testimonial grid |

### Routing & File Structure

The filesystem under `content/pages/` maps directly to URLs:

```
content/pages/
  index.md              ->  /
  about.md              ->  /about
  contact.md            ->  /contact
  thank-you.md          ->  /thank-you
  blog/
    index.md            ->  /blog
    workplace.md        ->  /blog/workplace
  portfolio/
    index.md            ->  /portfolio
    psm.md              ->  /portfolio/psm
    tweetable.md        ->  /portfolio/tweetable
```

### Global Config

Site-wide settings in `content/data/config.json` (schema: `schemas/config.schema.json`).

### Styling

- SCSS in `src/sass/` — no Tailwind, no CSS modules.
- Compose class strings via `import { classNames } from '@/utils'` (wraps `clsx`).

## License

This project is unlicensed.
