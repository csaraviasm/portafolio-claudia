import type { CollectionConfig } from 'payload'

/**
 * Skills — herramientas y habilidades que se muestran como etiquetas.
 */
export const Skills: CollectionConfig = {
  slug: 'skills',
  labels: {
    singular: 'Skill',
    plural: 'Skills',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'categoria', 'nivel', 'orden'],
    description: 'Herramientas y habilidades. Se muestran como etiquetas en "Sobre mí".',
  },
  access: { read: () => true },
  defaultSort: 'orden',
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      localized: true,
      label: 'Nombre',
      admin: { placeholder: 'Figma' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'nivel',
          type: 'select',
          label: 'Nivel',
          admin: {
            width: '50%',
            description: 'Opcional. Si lo dejas vacío, la etiqueta se muestra sin nivel.',
          },
          options: [
            { label: 'Avanzado', value: 'avanzado' },
            { label: 'Intermedio', value: 'intermedio' },
            { label: 'Básico', value: 'basico' },
          ],
        },
        {
          name: 'categoria',
          type: 'select',
          required: true,
          label: 'Categoría',
          admin: { width: '50%' },
          options: [
            { label: 'Herramientas', value: 'herramientas' },
            { label: 'Product & UX Design', value: 'ux' },
            { label: 'Competencias', value: 'competencias' },
          ],
        },
      ],
    },
    {
      name: 'orden',
      type: 'number',
      defaultValue: 0,
      label: 'Orden',
    },
  ],
}
