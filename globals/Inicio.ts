import type { GlobalConfig } from 'payload'

/**
 * Inicio — el contenido de la portada del sitio.
 */
export const Inicio: GlobalConfig = {
  slug: 'inicio',
  label: 'Página de inicio',
  admin: {
    description: 'El texto y la imagen de la portada del sitio.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      label: 'Etiqueta superior',
      admin: {
        placeholder: 'UX/UI Designer · Lima, Perú',
        description: 'El texto pequeño que va encima del titular.',
      },
    },
    {
      name: 'titulo',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titular',
      admin: { placeholder: 'Product Designer enfocado en UX/UI' },
    },
    {
      name: 'subtitulo',
      type: 'textarea',
      localized: true,
      label: 'Subtítulo',
      admin: { description: 'El párrafo que acompaña al titular.' },
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen del hero',
      admin: { description: 'Formato vertical. Proporción recomendada 1080×1456.' },
    },
    {
      name: 'botones',
      type: 'array',
      label: 'Botones',
      maxRows: 2,
      labels: { singular: 'Botón', plural: 'Botones' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'texto',
              type: 'text',
              required: true,
              localized: true,
              label: 'Texto',
              admin: { width: '40%', placeholder: 'Ver proyectos' },
            },
            {
              name: 'enlace',
              type: 'text',
              required: true,
              label: 'Enlace',
              admin: { width: '40%', placeholder: '/proyectos' },
            },
            {
              name: 'estilo',
              type: 'select',
              defaultValue: 'primario',
              label: 'Estilo',
              admin: { width: '20%' },
              options: [
                { label: 'Primario', value: 'primario' },
                { label: 'Secundario', value: 'secundario' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
