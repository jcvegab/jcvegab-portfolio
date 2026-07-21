# ADR 0003: Resolve Layouts and Sections Through Registries

## Status

Accepted (2026-07-21)

## Context

Pages use different visual structures (home, about, blog index, single post, portfolio index, single project, contact form). Hardcoding layout resolution per slug would not scale and would couple routing to presentation.

## Decision

1. **Layout registry** (`src/layouts/index.ts`): a map from layout name to component. Pages declare their target layout via the `layout` or `type` frontmatter field. Both `src/app/page.tsx` and `src/app/[...slug]/page.tsx` look up the layout from this registry.
2. **Component registry** (`src/components/index.ts`): a `camelCase → ComponentName` map used by the `advanced` layout to resolve section types declared in frontmatter `sections`.

## Consequences

- Adding a new layout requires: building the layout component, importing it into `src/layouts/index.ts`, and exporting it in the default map.
- Adding a new section type requires: building the section component, importing it into `src/components/index.ts`, and exporting it in the default map. Existing pages can then use the new `type` in their `sections` array.
- The `advanced` layout uses `upperFirst(camelCase(sectionType))` to convert snake_case section types (e.g., `section_hero`) to PascalCase component names (e.g., `SectionHero`). This convention must be followed for all new sections.
- Layout and section names are resolved at build time — mismatches throw errors, so new types must be tested before merging.
