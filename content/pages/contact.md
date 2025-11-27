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
          - 'Desarrollo web (website, e-commerce, etc)'
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
      ¡Hola! Muchas gracias por tu interés en trabajar juntos. Puedes completar
      el siguiente formulario de contacto o contactarme por email
      contact@jcvegab.site
seo:
  title: Contact
  description: This is the contact page
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Contact
      keyName: property
    - name: 'og:description'
      value: This is the contact page
      keyName: property
    - name: 'twitter:card'
      value: summary
    - name: 'twitter:title'
      value: Contact
    - name: 'twitter:description'
      value: This is the contact page
layout: advanced
---
