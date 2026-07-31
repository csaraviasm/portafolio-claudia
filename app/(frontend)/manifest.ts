import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Manifest de la aplicación web.
 *
 * Este archivo es lo que permite "Añadir a pantalla de inicio" en el teléfono:
 * el navegador lo lee y ofrece instalar el sitio como una app.
 *
 * No es un archivo estático. Se genera leyendo el global "Marca" del panel,
 * de modo que cambiar el icono o el nombre de la app en /admin actualiza
 * la instalación sin tocar código ni desplegar.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const payload = await getPayload({ config })
  const marca = await payload.findGlobal({ slug: 'marca', depth: 1 })

  const icono = typeof marca?.iconoBase === 'object' ? marca.iconoBase : null
  const tamanos = icono?.sizes

  // Si aún no se ha subido el icono en el panel, se devuelve un manifest
  // válido sin iconos: el sitio sigue funcionando, solo no es instalable.
  const icons: MetadataRoute.Manifest['icons'] = []

  if (tamanos?.icon192?.url) {
    icons.push({
      src: tamanos.icon192.url,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    })
  }

  if (tamanos?.icon512?.url) {
    icons.push({
      src: tamanos.icon512.url,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    })
    // Variante recortable: Android la adapta a la forma de icono del sistema.
    icons.push({
      src: tamanos.icon512.url,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    })
  }

  return {
    name: marca?.nombreApp || 'Claudia Saravia — Portafolio',
    short_name: marca?.nombreCorto || 'Claudia',
    description: marca?.descripcionSocial || 'Portafolio UX/UI de Claudia Saravia Matias',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: marca?.colorFondo || '#f7f7f5',
    theme_color: marca?.colorTema || '#2347f2',
    icons,
  }
}
