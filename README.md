# Jcvegab Portfolio

Portafolio personal de Joseph Vega, construido con Astro como sitio estático. El sitio publica páginas de presentación, proyectos y blog desde contenido Markdown versionado en el repositorio.

## Stack

| Area | Tecnologia |
|---|---|
| Framework | Astro 7 static build |
| UI | React 19 + TypeScript |
| Contenido | Markdown + frontmatter (`gray-matter`, `marked`) |
| Estilos | SCSS global en `src/sass/` |
| Calidad | Biome, TypeScript, Vitest, Testing Library |
| Deploy | Export estático en `out/` |

## Requisitos

- Node.js >= 24.0.0
- npm >= 11.0.0

## Inicio Rapido

```bash
npm install
npm run dev
```

Abrir `http://localhost:4321`.

## Scripts

| Comando | Uso |
|---|---|
| `npm run dev` | Servidor local Astro |
| `npm run build` | Build estático a `out/` |
| `npm run lint` | Biome check sobre `src/` |
| `npm run format` | Formato Biome sobre `src/` |
| `npm run type-check` | `astro check` |
| `npm run test` | Suite Vitest |
| `npm run test:watch` | Vitest en modo watch |
| `npm run test:coverage` | Vitest con coverage |

CI ejecuta `lint`, luego `type-check`, luego `test`, luego `build`.

## Estructura

```text
content/
  data/config.json        Configuración global del sitio
  pages/                  Páginas Markdown y rutas públicas
docs/                     Documentación técnica del repositorio
schemas/                  Esquemas JSON para contenido/config
public/                   Assets estáticos, robots.txt y scripts
src/
  astro-pages/            Entrypoints Astro y rutas
  components/             Secciones y componentes compartidos
  layouts/                Layouts seleccionados por frontmatter
  sass/                   Estilos SCSS globales
  utils/                  Carga de contenido, URLs y helpers
```

## Contenido

Las páginas viven en `content/pages/`. La ruta pública sale de la ruta del archivo:

| Archivo | URL |
|---|---|
| `content/pages/index.md` | `/` |
| `content/pages/about.md` | `/about/` |
| `content/pages/contact.md` | `/contact/` |
| `content/pages/blog/index.md` | `/blog/` |
| `content/pages/blog/workplace.md` | `/blog/workplace/` |
| `content/pages/portfolio/index.md` | `/portfolio/` |
| `content/pages/portfolio/psm.md` | `/portfolio/psm/` |
| `content/pages/portfolio/tweetable.md` | `/portfolio/tweetable/` |

El campo `layout` o `type` del frontmatter selecciona un layout en `src/layouts/`. El layout `advanced` puede renderizar secciones declaradas en frontmatter.

Más detalle: [`docs/content.md`](docs/content.md).

## Arquitectura

- `src/pages/index.astro` renderiza home desde `content/pages/index.md`.
- `src/pages/[...slug].astro` renderiza las demás páginas estáticas via `getStaticPaths`.
- `src/utils/content.ts` lee Markdown, frontmatter y configuración global.
- `src/components/PageRenderer.tsx` resuelve el layout solicitado por cada página.
- `src/components/` contiene secciones reutilizables como hero, grid, posts, portfolio, formulario y testimonios.

Más detalle: [`docs/architecture.md`](docs/architecture.md).

## Desarrollo

Antes de cerrar cambios:

```bash
npm run lint
npm run type-check
npm run test
```

Guía completa: [`docs/development.md`](docs/development.md).

## Documentación

- [`docs/architecture.md`](docs/architecture.md): límites técnicos, flujo de render y dependencias internas.
- [`docs/content.md`](docs/content.md): cómo crear y mantener páginas Markdown.
- [`docs/development.md`](docs/development.md): comandos, convenciones y validación.
- [`docs/adr/`](docs/adr/): Decisiones de arquitectura registradas (ADRs).

## Licencia

Proyecto privado sin licencia pública.
