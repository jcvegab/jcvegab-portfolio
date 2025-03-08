---
title: Tweetable
subtitle: Clon de Twitter en Ruby on Rails
date: '2021-01-13'
thumb_image: /images/unique-paprika.png
thumb_image_alt: 'White, black, and red shoe sole'
image: /images/unique-paprika.png
image_alt: Vista de Tweetable en Ruby on Rails
seo:
  title: Project Title 1
  description: This is the project 1 description
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Project Title 1
      keyName: property
    - name: 'og:description'
      value: This is the project 1 description
      keyName: property
    - name: 'og:image'
      value: images/1.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Project Title 1
    - name: 'twitter:description'
      value: This is the project 1 description
    - name: 'twitter:image'
      value: images/1.jpg
      relativeUrl: true
layout: project
---
El siguiente proyecto fue un entregable como concepto integral de aprendizaje del framework backend Ruby on Rails.

Para el desarrollo de Tweetable, una aplicación con los elementos básicos de Twitter, se tuvo 3 días para crear un producto mínimo viable (MVP) en un equipo de desarrollo conformado por 3 personas. Esta versión consta de 2 entidades como Usuario y Tweet, así mismo a cada entidad se le añadió una capa de validaciones.

## Conocimientos requeridos / aplicados

HTML, CSS, Ruby, Ruby on Rails

## Gemas usadas

*   [**Devise**](https://github.com/heartcombo/devise) para el registro de usuarios y control de sesiones.

*   [**Pundit**](https://github.com/varvet/pundit) para la autorización de permisos y acceso de los usuarios.

*   [**Omniauth-Github**](https://github.com/omniauth/omniauth-github) para el registro mediante cuentas Github (Deshabilitado el callback).

*   [**Omniauth-Google**](https://github.com/zquestz/omniauth-google-oauth2) para el registro mediante cuentas Google (Deshabilitado el callback).

Puedes ver el código fuente en mi repositorio de Github: [Tweetable (Twitter clone)](https://github.com/jcvegab/tweetable-team-project)
