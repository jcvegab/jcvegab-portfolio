---
title: Pokémon Amaris · Pokédex full stack
subtitle: Aplicación React y NestJS para consultar y guardar Pokémon
date: '2026-11-09'
featured_order: 2
thumb_image: /images/pokemon-amaris-cover.png
thumb_image_alt: Ilustración de una Pokédex y sus componentes de frontend y backend
image: /images/pokemon-amaris-cover.png
image_alt: Ilustración de la arquitectura full stack de Pokémon Amaris

seo:
  title: Pokémon Amaris | Pokédex full stack · Joseph Vega
  description: Pokédex full stack con React, NestJS, Prisma, PostgreSQL, PokeAPI, Docker y pruebas automatizadas.
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:image'
      value: /images/pokemon-amaris-cover.png
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:image'
      value: /images/pokemon-amaris-cover.png
      relativeUrl: true

layout: project
---

## El proyecto

**Pokémon Amaris** es una Pokédex que consulta PokeAPI y guarda los Pokémon solicitados en una base de datos. Reúne frontend, backend y persistencia en un monorepo que puede ejecutarse con Docker Compose.

## Mi trabajo

- Construí una interfaz en **React y TypeScript** para buscar y crear registros de Pokémon.
- Implementé una API en **NestJS** que consulta primero PostgreSQL y recurre a PokeAPI cuando el Pokémon aún no está guardado.
- Usé **Prisma y PostgreSQL** para la persistencia y contemplé solicitudes concurrentes para el mismo Pokémon.
- Documenté la arquitectura y la API con diagramas y Swagger; configuré pruebas automatizadas y CI para frontend y backend.

**Tecnologías:** React, TypeScript, NestJS, Prisma, PostgreSQL, PokeAPI, Docker, Jest y Vitest.

## Explorar

- [Código y guía de ejecución](https://github.com/jcvegab/pokemon-amaris)
- [Diagrama de arquitectura](https://github.com/jcvegab/pokemon-amaris/blob/main/docs/DIAGRAM.md)

El repositorio incluye instrucciones para ejecutar la aplicación localmente; aún no tiene una demo pública enlazada.
