import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import { en } from '@payloadcms/translations/languages/en'

// Colecciones: contenido del que hay muchos registros.
import { Proyectos } from './collections/Proyectos'
import { Experiencia } from './collections/Experiencia'
import { Formacion } from './collections/Formacion'
import { Skills } from './collections/Skills'
import { Media } from './collections/Media'
import { Usuarios } from './collections/Usuarios'

// Globales: contenido único que solo se edita.
import { Inicio } from './globals/Inicio'
import { SobreMi } from './globals/SobreMi'
import { Contacto } from './globals/Contacto'
import { Ajustes } from './globals/Ajustes'
import { Marca } from './globals/Marca'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  // ── Panel de administración ─────────────────────────────────────────────
  admin: {
    user: Usuarios.slug,
    meta: {
      titleSuffix: ' · Portafolio Claudia Saravia',
    },
  },

  // ── Idiomas del contenido ───────────────────────────────────────────────
  // Los campos marcados con `localized: true` guardan una versión por idioma.
  // En el panel aparece un selector ES/EN arriba a la derecha.
  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },

  // Idioma de la interfaz del propio panel.
  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: 'es',
  },

  collections: [Proyectos, Experiencia, Formacion, Skills, Media, Usuarios],
  globals: [Inicio, SobreMi, Contacto, Ajustes, Marca],

  editor: lexicalEditor(),

  // ── Base de datos ───────────────────────────────────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // ── Almacenamiento de archivos ──────────────────────────────────────────
  // Los archivos subidos desde el panel van a Vercel Blob, no al repositorio.
  plugins: [
    vercelBlobStorage({
      collections: { [Media.slug]: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || '',

  // Tipos TypeScript generados a partir de las colecciones.
  // Se regeneran con: npm run generate:types
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp: (await import('sharp')).default,
})
