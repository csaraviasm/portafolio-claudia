import type { CollectionConfig } from 'payload'

/**
 * Experiencia — cada puesto de trabajo, para la línea de tiempo de "Sobre mí".
 */
export const Experiencia: CollectionConfig = {
  slug: 'experiencia',
  labels: {
    singular: 'Puesto',
    plural: 'Experiencia',
  },
  admin: {
    useAsTitle: 'rol',
    defaultColumns: ['rol', 'empresa', 'fechaTexto', 'orden'],
    description: 'Tu trayectoria profesional. El más reciente debe tener el orden más bajo.',
  },
  access: { read: () => true },
  defaultSort: 'orden',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'rol',
          type: 'text',
          required: true,
          localized: true,
          label: 'Rol',
          admin: { placeholder: 'UX/UI Designer' },
        },
        {
          name: 'empresa',
          type: 'text',
          required: true,
          label: 'Empresa',
          admin: { placeholder: 'Lotobola' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ubicacion',
          type: 'text',
          label: 'Ubicación',
          admin: { placeholder: 'Lima, Perú' },
        },
        {
          name: 'fechaTexto',
          type: 'text',
          required: true,
          localized: true,
          label: 'Periodo',
          admin: {
            placeholder: 'Mar 2025 — Actualidad',
            description: 'Se muestra tal cual. Escríbelo como quieras que se lea.',
          },
        },
      ],
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Descripción',
    },
    {
      name: 'logros',
      type: 'array',
      label: 'Logros',
      labels: { singular: 'Logro', plural: 'Logros' },
      admin: { description: 'Opcional. Se muestran como lista dentro del puesto.' },
      fields: [
        {
          name: 'texto',
          type: 'text',
          required: true,
          localized: true,
          label: 'Logro',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'icono',
          type: 'text',
          label: 'Icono',
          admin: {
            width: '30%',
            placeholder: '💼',
            description: 'Un emoji. Se muestra junto al puesto.',
          },
        },
        {
          name: 'orden',
          type: 'number',
          defaultValue: 0,
          label: 'Orden',
          admin: { width: '70%', description: 'El número más bajo aparece primero.' },
        },
      ],
    },
  ],
}
