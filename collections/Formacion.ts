import type { CollectionConfig } from 'payload'

/**
 * Formación — estudios, certificaciones e idiomas.
 */
export const Formacion: CollectionConfig = {
  slug: 'formacion',
  labels: {
    singular: 'Formación',
    plural: 'Formación',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'institucion', 'anio', 'tipo'],
    description: 'Educación formal, certificaciones e idiomas.',
  },
  access: { read: () => true },
  defaultSort: 'orden',
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      localized: true,
      label: 'Título',
      admin: { placeholder: 'Bachiller en Diseño Profesional Gráfico' },
    },
    {
      name: 'institucion',
      type: 'text',
      required: true,
      label: 'Institución',
      admin: { placeholder: 'Universidad Peruana de Ciencias Aplicadas (UPC)' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'anio',
          type: 'text',
          required: true,
          label: 'Año',
          admin: { width: '25%', placeholder: '2022' },
        },
        {
          name: 'tipo',
          type: 'select',
          required: true,
          label: 'Tipo',
          admin: { width: '40%' },
          options: [
            { label: 'Grado académico', value: 'grado' },
            { label: 'Certificación', value: 'certificacion' },
            { label: 'Idioma', value: 'idioma' },
          ],
        },
        {
          name: 'orden',
          type: 'number',
          defaultValue: 0,
          label: 'Orden',
          admin: { width: '35%' },
        },
      ],
    },
    {
      name: 'ubicacion',
      type: 'text',
      label: 'Ubicación',
      admin: { placeholder: 'Lima, Perú · Online' },
    },
  ],
}
