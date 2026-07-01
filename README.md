# Jcvegab Portfolio

Portafolio personal de Joseph Vega, construido con Next.js 16 como sitio estatico exportable. El sitio publica paginas de presentacion, proyectos y blog desde contenido Markdown versionado en el repositorio.

## Stack

| Area | Tecnologia |
|---|---|
| Framework | Next.js 16 static export |
| UI | React 19 + TypeScript |
| Contenido | Markdown + frontmatter (`gray-matter`, `marked`) |
| Estilos | SCSS global en `src/sass/` |
| Calidad | Biome, TypeScript, Vitest, Testing Library |
| Deploy | Export estatico en `out/` |

## Requisitos

- Node.js >= 24.0.0
- npm >= 11.0.0

## Inicio Rapido

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Scripts

| Comando | Uso |
|---|---|
| `npm run dev` | Servidor local con Turbopack |
| `npm run build` | Build y export estatico a `out/` |
| `npm run lint` | Biome check sobre `src/` |
| `npm run format` | Formato Biome sobre `src/` |
| `npm run type-check` | Verificacion TypeScript sin emitir archivos |
| `npm run test` | Suite Vitest |
| `npm run test:watch` | Vitest en modo watch |
| `npm run test:coverage` | Vitest con coverage |

CI ejecuta `lint`, luego `type-check`, luego `test`.

## Estructura

```text
content/
  data/config.json        Configuracion global del sitio
  pages/                  Paginas Markdown y rutas publicas
docs/                     Documentacion tecnica del repositorio
schemas/                  Esquemas JSON para contenido/config
src/
  app/                    Entrypoints App Router y metadata
  components/             Secciones y componentes compartidos
  layouts/                Layouts seleccionados por frontmatter
  sass/                   Estilos SCSS globales
  utils/                  Carga de contenido, URLs y helpers
```

## Contenido

Las paginas viven en `content/pages/`. La ruta publica sale de la ruta del archivo:

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

Mas detalle: [`docs/content.md`](docs/content.md).

## Arquitectura

- `src/app/page.tsx` renderiza home desde `content/pages/index.md`.
- `src/app/[...slug]/page.tsx` renderiza las demas paginas estaticas.
- `src/utils/content.ts` lee Markdown, frontmatter y configuracion global.
- `src/layouts/index.ts` resuelve el layout solicitado por cada pagina.
- `src/components/` contiene secciones reutilizables como hero, grid, posts, portfolio, formulario y testimonios.

Mas detalle: [`docs/architecture.md`](docs/architecture.md).

## Desarrollo

Antes de cerrar cambios:

```bash
npm run lint
npm run type-check
npm run test
```

Guia completa: [`docs/development.md`](docs/development.md).

## Documentacion

- [`docs/architecture.md`](docs/architecture.md): limites tecnicos, flujo de render y dependencias internas.
- [`docs/content.md`](docs/content.md): como crear y mantener paginas Markdown.
- [`docs/development.md`](docs/development.md): comandos, convenciones y validacion.
- [`docs/technical-debt.md`](docs/technical-debt.md): TODOs, seguimiento y deuda tecnica.

## Analisis Local De Codigo

Este repositorio usa una herramienta local de analisis de codigo para exploracion estructural. No documentar nombres de indice, rutas locales ni detalles especificos de maquina.

## Licencia

Proyecto privado sin licencia publica.
