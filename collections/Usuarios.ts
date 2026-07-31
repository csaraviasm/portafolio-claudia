import type { CollectionConfig } from 'payload'

/**
 * Usuarios — quién puede entrar al panel de administración.
 *
 * El primer usuario se crea al abrir /admin por primera vez.
 */
export const Usuarios: CollectionConfig = {
  slug: 'usuarios',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    description: 'Personas con acceso al panel.',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      label: 'Nombre',
    },
  ],
}
