import type { CollectionConfig } from 'payload'

/**
 * Media — biblioteca única de archivos del sitio.
 *
 * Todo archivo (imágenes de proyectos, foto de perfil, CV, logo, iconos de la app)
 * se sube aquí desde el panel. No existe una carpeta de archivos en el código.
 *
 * Los tamaños definidos abajo se generan automáticamente al subir una imagen:
 * el sitio pide el que necesita según dónde se muestre.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  admin: {
    description:
      'Imágenes y documentos del sitio. Sube aquí todo: portadas, galerías, CV, logo e iconos.',
  },
  access: {
    // Los archivos son públicos: el sitio los muestra a cualquier visitante.
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'hero', width: 1600 },
      // Tamaños que usa el icono de la app en el teléfono.
      { name: 'icon192', width: 192, height: 192, position: 'centre' },
      { name: 'icon512', width: 512, height: 512, position: 'centre' },
      { name: 'appleTouch', width: 180, height: 180, position: 'centre' },
      // Tamaño exacto que piden LinkedIn, WhatsApp y similares.
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: 'Texto alternativo',
      admin: {
        description:
          'Describe la imagen en pocas palabras. Lo leen los lectores de pantalla y ayuda al posicionamiento en buscadores.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      label: 'Pie de imagen',
      admin: {
        description: 'Opcional. Se muestra debajo de la imagen en las galerías de proyectos.',
      },
    },
  ],
}
