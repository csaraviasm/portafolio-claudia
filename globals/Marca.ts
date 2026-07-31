import type { GlobalConfig } from 'payload'

/**
 * Marca — identidad visual y presencia del sitio fuera del sitio.
 *
 * De aquí salen tres cosas que normalmente exigen tocar código:
 *   1. El favicon (el iconito de la pestaña del navegador).
 *   2. La vista previa al compartir el enlace en LinkedIn, WhatsApp o Slack.
 *   3. El icono de la app al añadir el sitio a la pantalla de inicio del teléfono.
 *
 * Al cambiar el "Icono base" desde el panel, los tres se actualizan solos.
 * No hay que subir archivos al código ni desplegar nada.
 */
export const Marca: GlobalConfig = {
  slug: 'marca',
  label: 'Marca e identidad',
  admin: {
    description:
      'Logo, icono de la app y cómo se ve tu sitio al compartirlo. Cambia el icono aquí y se actualiza en todos lados.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── Identidad visual ──────────────────────────────────────────────
        {
          label: 'Identidad',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              admin: {
                description: 'Se muestra en la cabecera del sitio. Preferible SVG o PNG sin fondo.',
              },
            },
            {
              name: 'iconoBase',
              type: 'upload',
              relationTo: 'media',
              label: 'Icono base',
              admin: {
                description:
                  'Cuadrado, mínimo 1024×1024, fondo transparente. De este archivo salen el favicon y el icono de la app en el teléfono. Debe leerse bien a tamaño pequeño: si el logo completo no funciona a 32px, usa un monograma.',
              },
            },
          ],
        },

        // ── Vista previa al compartir el enlace ───────────────────────────
        {
          label: 'Al compartir',
          description:
            'Lo que ve alguien cuando le mandas el enlace de tu portafolio por WhatsApp, LinkedIn o Slack.',
          fields: [
            {
              name: 'imagenSocial',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen de vista previa',
              admin: {
                description:
                  'Formato horizontal 1200×630. Suele llevar tu nombre, tu rol y un fondo de marca.',
              },
            },
            {
              name: 'tituloSocial',
              type: 'text',
              localized: true,
              label: 'Título',
              admin: {
                placeholder: 'Claudia Saravia — Product Designer UX/UI',
              },
            },
            {
              name: 'descripcionSocial',
              type: 'textarea',
              localized: true,
              label: 'Descripción',
              admin: {
                description: 'Dos líneas como máximo. Es la bajada de la vista previa.',
              },
            },
          ],
        },

        // ── App en el teléfono ────────────────────────────────────────────
        {
          label: 'App en el teléfono',
          description:
            'Permite añadir el sitio a la pantalla de inicio del móvil y abrirlo como una app, sin barra de navegador.',
          fields: [
            {
              name: 'nombreApp',
              type: 'text',
              label: 'Nombre completo',
              defaultValue: 'Claudia Saravia — Portafolio',
              admin: { description: 'Nombre que se muestra al instalar.' },
            },
            {
              name: 'nombreCorto',
              type: 'text',
              label: 'Nombre corto',
              defaultValue: 'Claudia',
              admin: {
                description:
                  'Lo que aparece debajo del icono en la pantalla de inicio. Máximo 12 caracteres o se corta.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'colorTema',
                  type: 'text',
                  label: 'Color del tema',
                  defaultValue: '#2347f2',
                  admin: {
                    width: '50%',
                    description: 'Tiñe la barra del navegador en móvil. Código hex.',
                  },
                },
                {
                  name: 'colorFondo',
                  type: 'text',
                  label: 'Color de fondo',
                  defaultValue: '#f7f7f5',
                  admin: {
                    width: '50%',
                    description: 'Fondo de la pantalla de carga al abrir la app. Código hex.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
