import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Locale } from '@/lib/locale'

/**
 * Pie de página. El texto se edita en Ajustes del sitio.
 */
export async function Footer({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config })
  const ajustes = await payload.findGlobal({ slug: 'ajustes', depth: 0, locale })

  return (
    <footer className="border-border/60 border-t py-6">
      <div className="text-muted-foreground mx-auto max-w-(--spacing-content) px-6 text-center text-sm">
        {ajustes?.textoPie || '© 2026 Claudia Saravia Matias'}
      </div>
    </footer>
  )
}
