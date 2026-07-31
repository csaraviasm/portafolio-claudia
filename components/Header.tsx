import Link from 'next/link'
import { Download } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { LangToggle } from '@/components/LangToggle'
import { NavLinks } from '@/components/NavLinks'
import { t, type Locale } from '@/lib/locale'

/**
 * Cabecera del sitio.
 *
 * El menú y el CV se leen del global "Ajustes" del panel: para añadir o quitar
 * un enlace de navegación no hay que tocar este archivo.
 */
export async function Header({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config })
  const ajustes = await payload.findGlobal({ slug: 'ajustes', depth: 1, locale })

  const cv = typeof ajustes?.cv === 'object' ? ajustes.cv : null
  const enlaces = ajustes?.navegacion ?? []
  const textos = t(locale)

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-(--spacing-content) items-center justify-between gap-4 px-6">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          {ajustes?.nombreSitio || 'Claudia'}
          <span className="text-accent">.</span>
        </Link>

        <NavLinks enlaces={enlaces} />

        <div className="flex items-center gap-3">
          <LangToggle activo={locale} />

          {cv?.url && (
            <a
              href={cv.url}
              download
              className="bg-primary text-primary-foreground hover:bg-primary/90 hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:inline-flex"
            >
              <Download className="size-4" aria-hidden />
              {textos.descargarCV}
            </a>
          )}
        </div>
      </nav>
    </header>
  )
}
