---
title: Contacto
hide_title: false

sections:
  - section_id: contact-form
    type: section_form
    form_id: contactForm
    form_action: /thank-you

    form_fields:
      - input_type: text
        name: name
        label: Nombre
        default_value: Tu nombre
        is_required: true

      - input_type: email
        name: email
        label: Email
        default_value: Tu dirección email
        is_required: true

      - input_type: select
        name: subject
        label: Asunto
        options:
          - Desarrollo web (website, e-commerce, etc)
          - Consultoría
          - Oportunidad laboral
          - Otros
        default_value: Selecciona aquí
        is_required: true

      - input_type: textarea
        name: message
        label: Mensaje
        default_value: Tu mensaje

      - input_type: checkbox
        name: consent
        label: >-
          Acepto el almacenamiento de la información enviada para ser
          contactado.
        is_required: true

    submit_label: Enviar mensaje

    content: >
      ¡Hola! Si deseas colaborar en un proyecto, discutir una oportunidad
      laboral o necesitas ayuda con el desarrollo de una aplicación web,
      puedes enviarme un mensaje usando el siguiente formulario.

      También puedes escribirme a [contact@jcvegab.dev](mailto:contact@jcvegab.dev).

      Normalmente respondo dentro de las próximas 24–48 horas.

seo:
  title: Contacto | Joseph Vega Blacido, AI Engineer
  description: Contacta a Joseph Vega Blacido para proyectos de IA, desarrollo full stack y oportunidades profesionales.

  extra:
    - name: 'og:type'
      value: website
      keyName: property

    - name: 'og:title'
      value: Contactar a Joseph Vega Blacido, AI Engineer
      keyName: property

    - name: 'og:description'
      value: Ponte en contacto con Joseph Vega para proyectos de IA, desarrollo web u oportunidades laborales.
      keyName: property

    - name: 'twitter:card'
      value: summary

    - name: 'twitter:title'
      value: Contacto – Joseph Vega

    - name: 'twitter:description'
      value: Contacto para proyectos de IA, desarrollo web y oportunidades laborales.

layout: advanced
---
