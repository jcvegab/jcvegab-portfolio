# Content

The site is maintained via Markdown files in `content/pages/` and global configuration in `content/data/config.json`.

## Creating Pages

1. Create a `.md` file inside `content/pages/`.
2. Define frontmatter with `title` and `layout` or `type` as applicable.
3. Write the body in Markdown.
4. Run `npm run type-check` and `npm run test` if the change touches data consumed by components.

## Routes

| File | URL |
|---|---|
| `content/pages/index.md` | `/` |
| `content/pages/about.md` | `/about/` |
| `content/pages/contact.md` | `/contact/` |
| `content/pages/thank-you.md` | `/thank-you/` |
| `content/pages/blog/index.md` | `/blog/` |
| `content/pages/blog/workplace.md` | `/blog/workplace/` |
| `content/pages/portfolio/index.md` | `/portfolio/` |
| `content/pages/portfolio/psm.md` | `/portfolio/psm/` |
| `content/pages/portfolio/tweetable.md` | `/portfolio/tweetable/` |

## Layouts

`layout` or `type` selects a component in `src/layouts/`.

| Value | Use |
|---|---|
| `page` | Generic page |
| `advanced` | Page with configurable sections |
| `blog` | Post index |
| `post` | Individual article |
| `portfolio` | Project index |
| `project` | Individual project |

## Advanced Sections

Pages with layout `advanced` may declare `sections` in frontmatter.

| Type | Component | Use |
|---|---|---|
| `section_hero` | `SectionHero` | Hero with image, text, and CTAs |
| `section_portfolio` | `SectionPortfolio` | Project summary |
| `section_posts` | `SectionPosts` | Post summary |
| `section_grid` | `SectionGrid` | Generic item grid |
| `section_content` | `SectionContent` | Content block with optional image |
| `section_form` | `SectionForm` | Netlify Forms contact form |
| `section_testimonials` | `SectionTestimonials` | Testimonials |

## Global Configuration

`content/data/config.json` contains:

- `path_prefix` for deployment under a subpath (used by `withPrefix` to normalize internal links and asset paths).
- `domain` for metadata, sitemap, and robots.
- Header navigation.
- Social links and footer content.
- `favicon` (present in the config file but **not consumed at runtime** — the favicon is hardcoded in `src/app/layout.tsx`).
- `color_scheme` and `accent_color`.

Validate changes against `schemas/config.schema.json`.
