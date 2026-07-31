import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Construye los metadatos de la página leyendo el global "Marca" del panel.
 *
 * Cubre tres cosas que normalmente se hardcodean en el HTML:
 *   - El favicon (icono de la pestaña del navegador).
 *   - La vista previa al compartir el enlace (Open Graph / Twitter Card).
 *   - El color de la barra del navegador en móvil.
 *
 * Se usa desde el layout del sitio:
 *   export const generateMetadata = () => construirMetadata()
 */
export async function construirMetadata(locale: 'es' | 'en' = 'es'): Promise<Metadata> {
  const payload = await getPayload({ config })

  const [marca, ajustes] = await Promise.all([
    payload.findGlobal({ slug: 'marca', depth: 1, locale }),
    payload.findGlobal({ slug: 'ajustes', depth: 1, locale }),
  ])

  const icono = typeof marca?.iconoBase === 'object' ? marca.iconoBase : null
  const social = typeof marca?.imagenSocial === 'object' ? marca.imagenSocial : null

  const titulo = marca?.tituloSocial || ajustes?.nombreSitio || 'Claudia Saravia'
  const descripcion = marca?.descripcionSocial || ''
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.claudiasaravia.com'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: titulo,
      template: `%s · ${ajustes?.nombreSitio || 'Claudia Saravia'}`,
    },
    description: descripcion,

    icons: {
      icon: icono?.url ? [{ url: icono.url }] : undefined,
      apple: icono?.sizes?.appleTouch?.url
        ? [{ url: icono.sizes.appleTouch.url, sizes: '180x180' }]
        : undefined,
    },

    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_PE' : 'en_US',
      url: baseUrl,
      title: titulo,
      description: descripcion,
      siteName: ajustes?.nombreSitio || 'Claudia Saravia',
      images: social?.sizes?.og?.url
        ? [{ url: social.sizes.og.url, width: 1200, height: 630, alt: titulo }]
        : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descripcion,
      images: social?.sizes?.og?.url ? [social.sizes.og.url] : undefined,
    },

    // Necesario para que iOS abra el sitio a pantalla completa al instalarlo.
    appleWebApp: {
      capable: true,
      title: marca?.nombreCorto || 'Claudia',
      statusBarStyle: 'default',
    },
  }
}
