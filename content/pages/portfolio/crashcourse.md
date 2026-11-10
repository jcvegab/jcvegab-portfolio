---
title: Crashcourse · Plataforma de cursos
subtitle: Catálogo de cursos con frontend Next.js y API Django
date: '2026-11-09'
featured_order: 1
thumb_image: /images/crashcourse-cover.png
thumb_image_alt: Ilustración de tarjetas de cursos y una API conectadas en Crashcourse
image: /images/crashcourse-cover.png
image_alt: Ilustración del catálogo de cursos y la arquitectura de Crashcourse

seo:
  title: Crashcourse | Plataforma full stack de cursos · Joseph Vega
  description: Plataforma de cursos con Next.js, React, TypeScript, Django, GraphQL y PostgreSQL. Caso full stack de Joseph Vega Blacido.
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:image'
      value: /images/crashcourse-cover.png
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:image'
      value: /images/crashcourse-cover.png
      relativeUrl: true

layout: project
---

## El proyecto

**Crashcourse** reúne un catálogo de cursos, categorías y páginas de detalle en una aplicación web conectada a una API propia. El objetivo fue ofrecer una experiencia de exploración de cursos y organizar los datos de forma reutilizable entre frontend y backend.

## Mi trabajo

- Construí el frontend con **Next.js, React y TypeScript**, con categorías, grilla de cursos y páginas de detalle.
- Integré consultas **GraphQL del lado del servidor** y metadatos dinámicos para las páginas de curso. La ruta de checkout es una vista estática.
- Desarrollé la API con **Django, GraphQL y PostgreSQL**, incluyendo categorías jerárquicas, cursos y datos iniciales.
- Añadí pruebas unitarias y de extremo a extremo en el frontend, pruebas del backend y configuración de despliegue.

**Tecnologías:** Next.js, React, TypeScript, Python, Django, GraphQL, PostgreSQL, Docker, Vitest y Playwright.

## Explorar

- [Ver la aplicación](https://crashcourse.jcvegab.dev/)
- [Código del frontend](https://github.com/jcvegab/crashcourse-frontend)
- [Código del backend](https://github.com/jcvegab/crashcourse-backend)

La API puede tardar unos momentos en responder cuando su instancia está arrancando.
