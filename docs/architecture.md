# Arquitectura

Este repositorio es un sitio estatico con Next.js 16, App Router y `output: 'export'`. No usa runtime de servidor ni API routes.

## Flujo De Render

1. `src/app/page.tsx` carga la pagina home desde `content/pages/index.md`.
2. `src/app/[...slug]/page.tsx` genera rutas estaticas para el resto de archivos en `content/pages/`.
3. `src/utils/content.ts` lee Markdown, frontmatter y `content/data/config.json`.
4. `src/layouts/index.ts` selecciona el layout usando `layout` o `type` del frontmatter.
5. Los layouts componen componentes de `src/components/` y estilos globales de `src/sass/`.

## Capas

| Capa | Ruta | Responsabilidad |
|---|---|---|
| Entrada | `src/app/` | Rutas, metadata, sitemap y robots |
| Layouts | `src/layouts/` | Estructura visual por tipo de pagina |
| Componentes | `src/components/` | Bloques reutilizables de UI |
| Utilidades | `src/utils/` | Markdown, URLs, clases CSS, fechas y helpers |
| Contenido | `content/` | Datos editables del sitio |
| Estilos | `src/sass/` | SCSS global y parciales por dominio visual |

## Puntos Clave

- `next.config.js` define `output: 'export'`, `trailingSlash: true` e imagenes sin optimizacion runtime.
- El contenido es parte del build. Cambios en Markdown requieren nuevo build.
- `content/data/config.json` controla navegacion, dominio, favicon, redes y footer.
- `schemas/config.schema.json` documenta la forma esperada de la configuracion global.
- Los tests viven cerca del codigo en carpetas `__tests__`.

## Hotspots Detectados

Codebase memory identifica estas utilidades como puntos de alto fan-in:

| Utilidad | Uso principal |
|---|---|
| `withPrefix` | Normalizar rutas con prefijo configurable |
| `htmlToReact` | Convertir HTML renderizado a nodos React |
| `markdownify` | Convertir Markdown en HTML seguro para render |
| `classNames` | Componer clases CSS con `clsx` |
| `getPageUrl` | Resolver URLs publicas desde datos de pagina |
| `getPageDataBySlug` | Leer pagina por slug |

Cambios en estas utilidades deben validarse con lint, type-check y tests.
