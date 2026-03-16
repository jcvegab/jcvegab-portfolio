---
title: Tweetable – Twitter Clone en Ruby on Rails
subtitle: Aplicación tipo Twitter construida con Ruby on Rails
date: '2021-01-13'
thumb_image: /images/tweetable-cover.png
thumb_image_alt: Interfaz de Tweetable, clon de Twitter desarrollado en Ruby on Rails
image: /images/tweetable-cover.png
image_alt: Vista de la aplicación Tweetable desarrollada con Ruby on Rails

seo:
  title: Tweetable | Twitter Clone construido con Ruby on Rails
  description: Aplicación tipo Twitter desarrollada con Ruby on Rails como proyecto MVP. Incluye autenticación con Devise, autorización con Pundit y login social con Omniauth. Proyecto de desarrollo web backend.
  extra:
    - name: 'og:type'
      value: website
      keyName: property

    - name: 'og:title'
      value: Tweetable – Twitter Clone en Ruby on Rails
      keyName: property

    - name: 'og:description'
      value: Proyecto de clon de Twitter desarrollado en Ruby on Rails con autenticación Devise, autorización Pundit y login social mediante Omniauth.
      keyName: property

    - name: 'og:image'
      value: /images/tweetable-cover.png
      keyName: property
      relativeUrl: true

    - name: 'og:locale'
      value: es_ES
      keyName: property

    - name: 'twitter:card'
      value: summary_large_image

    - name: 'twitter:title'
      value: Tweetable – Twitter Clone en Ruby on Rails

    - name: 'twitter:description'
      value: Aplicación estilo Twitter desarrollada con Ruby on Rails como MVP, utilizando Devise, Pundit y Omniauth.

    - name: 'twitter:image'
      value: /images/tweetable-cover.png
      relativeUrl: true

layout: project
---

Tweetable es un **clon simplificado de Twitter desarrollado con Ruby on Rails**, creado como proyecto de aprendizaje para comprender la arquitectura de aplicaciones web backend con Rails.

El objetivo del proyecto fue desarrollar un **producto mínimo viable (MVP)** en un periodo de **3 días**, trabajando en un equipo de **3 desarrolladores**.

La aplicación reproduce funcionalidades básicas de Twitter, incluyendo:

- registro y autenticación de usuarios
- creación y publicación de tweets
- validaciones de datos
- control de permisos

El modelo de datos se compone principalmente de dos entidades:

- **User**
- **Tweet**

Cada entidad incluye validaciones para garantizar la integridad de los datos dentro de la aplicación Rails.

## Tecnologías utilizadas

- HTML
- CSS
- Ruby
- Ruby on Rails

## Gemas utilizadas en el proyecto

- **Devise** – autenticación de usuarios y gestión de sesiones.
- **Pundit** – autorización y control de permisos.
- **Omniauth-Github** – autenticación mediante cuentas de GitHub (callback deshabilitado).
- **Omniauth-Google** – autenticación mediante cuentas de Google (callback deshabilitado).

Estas herramientas permiten implementar rápidamente funcionalidades comunes de aplicaciones web modernas como **login social, autenticación segura y control de acceso basado en roles**.

## Código fuente

Puedes revisar el código completo del proyecto en GitHub:

**Repositorio:**  
https://github.com/jcvegab/tweetable-team-project
