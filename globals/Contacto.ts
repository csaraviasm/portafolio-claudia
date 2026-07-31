import type { GlobalConfig } from 'payload'

/**
 * Contacto — datos de contacto y redes.
 *
 * Los datos que cambian con el tiempo (correo, teléfono) viven aquí y no
 * en el código, para que actualizarlos no requiera un despliegue.
 */
export const Contacto: GlobalConfig = {
  slug: 'contacto',
  label: 'Contacto',
  admin: {
    description: 'Tus datos de contacto y enlaces a redes profesionales.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      label: 'Etiqueta superior',
      admin: { placeholder: 'Contacto' },
    },
    {
      name: 'titulo',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titular',
      admin: { placeholder: 'Hablemos de tu próximo proyecto' },
    },
    {
      name: 'subtitulo',
      type: 'textarea',
      localized: true,
      label: 'Subtítulo',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Correo',
          admin: { width: '50%', placeholder: 'hey@claudiasaravia.com' },
        },
        {
          name: 'telefono',
          type: 'text',
          label: 'Teléfono',
          admin: { width: '50%', placeholder: '+51 972 929 971' },
        },
      ],
    },
    {
      name: 'ubicacion',
      type: 'text',
      localized: true,
      label: 'Ubicación',
      admin: { placeholder: 'Lima, Perú' },
    },
    {
      name: 'redes',
      type: 'array',
      label: 'Redes',
      labels: { singular: 'Red', plural: 'Redes' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'plataforma',
              type: 'select',
              required: true,
              label: 'Plataforma',
              admin: { width: '30%' },
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Behance', value: 'behance' },
                { label: 'Dribbble', value: 'dribbble' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Otra', value: 'otra' },
              ],
            },
            {
              name: 'etiqueta',
              type: 'text',
              required: true,
              label: 'Etiqueta',
              admin: { width: '30%', placeholder: '/claudia-sm' },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Enlace completo',
              admin: {
                width: '40%',
                placeholder: 'https://www.linkedin.com/in/claudia-sm/',
              },
            },
          ],
        },
      ],
    },
  ],
}
