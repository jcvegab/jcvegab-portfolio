# Contenido

El sitio se mantiene desde archivos Markdown en `content/pages/` y configuracion global en `content/data/config.json`.

## Crear Paginas

1. Crear un archivo `.md` dentro de `content/pages/`.
2. Definir frontmatter con `title`, `layout` o `type` cuando aplique.
3. Escribir el cuerpo en Markdown.
4. Ejecutar `npm run type-check` y `npm run test` si el cambio toca datos usados por componentes.

## Rutas

| Archivo | Ruta |
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

`layout` o `type` selecciona un componente en `src/layouts/`.

| Valor | Uso |
|---|---|
| `page` | Pagina generica |
| `advanced` | Pagina con secciones configurables |
| `blog` | Indice de posts |
| `post` | Articulo individual |
| `portfolio` | Indice de proyectos |
| `project` | Proyecto individual |

## Secciones Advanced

Paginas con layout `advanced` pueden declarar `sections` en frontmatter.

| Tipo | Componente | Uso |
|---|---|---|
| `section_hero` | `SectionHero` | Hero con imagen, texto y CTAs |
| `section_portfolio` | `SectionPortfolio` | Resumen de proyectos |
| `section_posts` | `SectionPosts` | Resumen de posts |
| `section_grid` | `SectionGrid` | Grid generico de items |
| `section_content` | `SectionContent` | Bloque de contenido con imagen opcional |
| `section_form` | `SectionForm` | Formulario de contacto Netlify Forms |
| `section_testimonials` | `SectionTestimonials` | Testimonios |

## Configuracion Global

`content/data/config.json` contiene:

- `path_prefix` para deploys bajo subruta.
- `domain` para metadata, sitemap y robots.
- Navegacion de header.
- Links sociales y contenido del footer.
- `favicon`, color scheme y accent color.

Validar cambios contra `schemas/config.schema.json`.
