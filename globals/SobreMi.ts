import type { GlobalConfig } from 'payload'

/**
 * Sobre mí — biografía, foto y métricas de impacto.
 *
 * La experiencia, formación y skills NO están aquí: son colecciones aparte,
 * porque hay muchas y se agregan o quitan con el tiempo.
 */
export const SobreMi: GlobalConfig = {
  slug: 'sobre-mi',
  label: 'Sobre mí',
  admin: {
    description:
      'Tu biografía y las cifras destacadas. La experiencia, formación y skills se editan en sus propias secciones.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      label: 'Etiqueta superior',
      admin: { placeholder: 'Sobre mí' },
    },
    {
      name: 'titulo',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titular',
      admin: { placeholder: 'Diseño con intención, no solo con estética' },
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'biografia',
      type: 'richText',
      localized: true,
      label: 'Biografía',
      admin: { description: 'Tu presentación. Puedes usar varios párrafos.' },
    },
    {
      name: 'estadisticas',
      type: 'array',
      label: 'Cifras destacadas',
      labels: { singular: 'Cifra', plural: 'Cifras' },
      admin: {
        description: 'Los números grandes de impacto. Se muestran en tarjetas.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'valor',
              type: 'text',
              required: true,
              label: 'Valor',
              admin: { width: '30%', placeholder: '54.54%' },
            },
            {
              name: 'etiqueta',
              type: 'text',
              required: true,
              localized: true,
              label: 'Descripción',
              admin: {
                width: '70%',
                placeholder: 'Reducción en tiempo de espera de trámites estudiantiles',
              },
            },
          ],
        },
      ],
    },
  ],
}
