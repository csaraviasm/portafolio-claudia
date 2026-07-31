import type { GlobalConfig } from 'payload'

/**
 * Ajustes — configuración general del sitio y navegación.
 */
export const Ajustes: GlobalConfig = {
  slug: 'ajustes',
  label: 'Ajustes del sitio',
  admin: {
    description: 'Nombre del sitio, CV descargable y menú de navegación.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'nombreSitio',
      type: 'text',
      required: true,
      defaultValue: 'Claudia Saravia',
      label: 'Nombre del sitio',
      admin: { description: 'Aparece en la pestaña del navegador.' },
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      label: 'CV en PDF',
      admin: {
        description:
          'El archivo que se descarga desde el botón "Descargar CV". Sube aquí la versión nueva cuando lo actualices.',
      },
    },
    {
      name: 'textoPie',
      type: 'text',
      localized: true,
      label: 'Texto del pie de página',
      admin: { placeholder: '© 2026 Claudia Saravia Matias — UX/UI Designer, Lima, Perú.' },
    },
    {
      name: 'navegacion',
      type: 'array',
      label: 'Menú de navegación',
      labels: { singular: 'Enlace', plural: 'Enlaces' },
      admin: {
        description: 'El orden aquí es el orden en que aparecen en la cabecera.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'etiqueta',
              type: 'text',
              required: true,
              localized: true,
              label: 'Texto',
              admin: { width: '50%', placeholder: 'Proyectos' },
            },
            {
              name: 'ruta',
              type: 'text',
              required: true,
              label: 'Ruta',
              admin: { width: '50%', placeholder: '/proyectos' },
            },
          ],
        },
      ],
    },
  ],
}
