import type { CollectionConfig } from 'payload'

/**
 * Proyectos — los casos del portafolio.
 *
 * Cada entrada genera una tarjeta en /proyectos y su propia página de detalle
 * en /proyectos/[slug]. Es la colección que más se usa en el día a día.
 */
export const Proyectos: CollectionConfig = {
  slug: 'proyectos',
  labels: {
    singular: 'Proyecto',
    plural: 'Proyectos',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'anio', 'categoria', 'publicado', 'orden'],
    description:
      'Los casos que se muestran en el portafolio. El campo Orden controla su posición en la grilla.',
  },
  access: {
    // Los visitantes solo ven los proyectos marcados como publicados.
    read: ({ req: { user } }) => {
      if (user) return true
      return { publicado: { equals: true } }
    },
  },
  defaultSort: 'orden',
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── Pestaña 1: lo que se ve en la grilla ──────────────────────────
        {
          label: 'Portada',
          description: 'Lo que aparece en la grilla de proyectos.',
          fields: [
            {
              name: 'titulo',
              type: 'text',
              required: true,
              localized: true,
              label: 'Título',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              label: 'Dirección web',
              admin: {
                description:
                  'Sin espacios ni tildes, en minúsculas. Ejemplo: "lotobola" genera claudiasaravia.com/proyectos/lotobola',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'anio',
                  type: 'text',
                  required: true,
                  label: 'Año',
                  admin: { width: '30%', placeholder: '2025' },
                },
                {
                  name: 'categoria',
                  type: 'select',
                  required: true,
                  label: 'Categoría',
                  admin: { width: '70%' },
                  options: [
                    { label: 'Product Design', value: 'product-design' },
                    { label: 'Design System', value: 'design-system' },
                    { label: 'Visual Design', value: 'visual-design' },
                    { label: 'UX Research', value: 'ux-research' },
                  ],
                },
              ],
            },
            {
              name: 'resumen',
              type: 'textarea',
              required: true,
              localized: true,
              label: 'Resumen',
              admin: {
                description: 'Una o dos frases. Es el texto que acompaña la tarjeta en la grilla.',
              },
            },
            {
              name: 'portada',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Imagen de portada',
            },
          ],
        },

        // ── Pestaña 2: la página de detalle ───────────────────────────────
        {
          label: 'Caso completo',
          description: 'El contenido de la página individual del proyecto.',
          fields: [
            {
              name: 'contenido',
              type: 'richText',
              localized: true,
              label: 'Contenido',
              admin: {
                description:
                  'El caso desarrollado: contexto, reto, proceso y resultado. Puedes insertar imágenes dentro del texto.',
              },
            },
            {
              name: 'galeria',
              type: 'array',
              label: 'Galería',
              labels: { singular: 'Imagen', plural: 'Imágenes' },
              admin: {
                description: 'Pantallas, mockups o piezas del proceso.',
              },
              fields: [
                {
                  name: 'imagen',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Imagen',
                },
              ],
            },
            {
              name: 'metricas',
              type: 'array',
              label: 'Métricas de impacto',
              labels: { singular: 'Métrica', plural: 'Métricas' },
              admin: {
                description:
                  'Resultados medibles del proyecto. Se muestran destacados en la página.',
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
                      name: 'descripcion',
                      type: 'text',
                      required: true,
                      localized: true,
                      label: 'Descripción',
                      admin: {
                        width: '70%',
                        placeholder: 'Reducción en tiempo de espera de trámites',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'enlaceExterno',
              type: 'text',
              label: 'Enlace externo',
              admin: {
                description: 'Opcional. Behance, sitio en vivo o prototipo público.',
              },
            },
          ],
        },

        // ── Pestaña 3: control de publicación ─────────────────────────────
        {
          label: 'Publicación',
          fields: [
            {
              name: 'publicado',
              type: 'checkbox',
              defaultValue: false,
              label: 'Publicado',
              admin: {
                description:
                  'Mientras esté desmarcado, el proyecto no se ve en el sitio. Úsalo para preparar casos sin publicarlos.',
              },
            },
            {
              name: 'destacado',
              type: 'checkbox',
              defaultValue: false,
              label: 'Destacado en el inicio',
              admin: {
                description: 'Los proyectos destacados aparecen en la página de inicio.',
              },
            },
            {
              name: 'orden',
              type: 'number',
              defaultValue: 0,
              label: 'Orden',
              admin: {
                description:
                  'Controla la posición en la grilla. El número más bajo aparece primero.',
              },
            },
          ],
        },
      ],
    },
  ],
}
