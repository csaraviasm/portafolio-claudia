import { Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { obtenerLocale, t } from '@/lib/locale'

/**
 * Página de contacto. Todos los datos se editan en el global "Contacto".
 */
export default async function ContactoPage() {
  const locale = await obtenerLocale()
  const payload = await getPayload({ config })
  const textos = t(locale)

  const [contacto, ajustes] = await Promise.all([
    payload.findGlobal({ slug: 'contacto', depth: 0, locale }),
    payload.findGlobal({ slug: 'ajustes', depth: 1, locale }),
  ])

  const cv = typeof ajustes?.cv === 'object' ? ajustes.cv : null

  return (
    <section className="mx-auto max-w-(--spacing-content) px-6 py-12 lg:py-16">
      <div className="mb-10 max-w-2xl space-y-3">
        {contacto?.eyebrow && (
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            {contacto.eyebrow}
          </span>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-balance lg:text-4xl">
          {contacto?.titulo}
        </h1>
        {contacto?.subtitulo && (
          <p className="text-muted-foreground text-lg text-pretty">{contacto.subtitulo}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacto?.email && (
          <a
            href={`mailto:${contacto.email}`}
            className="group border-border bg-card hover:border-primary/40 flex items-center gap-4 rounded-2xl border p-5 transition-colors"
          >
            <span className="bg-secondary text-primary flex size-11 shrink-0 items-center justify-center rounded-full">
              <Mail className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="text-muted-foreground block text-xs tracking-wider uppercase">
                {locale === 'es' ? 'Correo' : 'Email'}
              </span>
              <span className="block truncate text-sm font-medium">{contacto.email}</span>
            </span>
          </a>
        )}

        {contacto?.telefono && (
          <a
            href={`tel:${contacto.telefono.replace(/\s/g, '')}`}
            className="group border-border bg-card hover:border-primary/40 flex items-center gap-4 rounded-2xl border p-5 transition-colors"
          >
            <span className="bg-secondary text-primary flex size-11 shrink-0 items-center justify-center rounded-full">
              <Phone className="size-5" aria-hidden />
            </span>
            <span>
              <span className="text-muted-foreground block text-xs tracking-wider uppercase">
                {locale === 'es' ? 'Teléfono' : 'Phone'}
              </span>
              <span className="block text-sm font-medium">{contacto.telefono}</span>
            </span>
          </a>
        )}

        {contacto?.ubicacion && (
          <div className="border-border bg-card flex items-center gap-4 rounded-2xl border p-5">
            <span className="bg-secondary text-primary flex size-11 shrink-0 items-center justify-center rounded-full">
              <MapPin className="size-5" aria-hidden />
            </span>
            <span>
              <span className="text-muted-foreground block text-xs tracking-wider uppercase">
                {locale === 'es' ? 'Ubicación' : 'Location'}
              </span>
              <span className="block text-sm font-medium">{contacto.ubicacion}</span>
            </span>
          </div>
        )}

        {(contacto?.redes ?? []).map((red, i) => {
          if (!red.url) return null
          return (
            <a
              key={red.id ?? i}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border bg-card hover:border-primary/40 flex items-center gap-4 rounded-2xl border p-5 transition-colors"
            >
              <span className="bg-secondary text-primary flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {(red.plataforma ?? '').slice(0, 2).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-xs tracking-wider uppercase">
                  {red.plataforma}
                </span>
                <span className="block truncate text-sm font-medium">{red.etiqueta}</span>
              </span>
              <ExternalLink
                className="text-muted-foreground group-hover:text-primary size-4 shrink-0"
                aria-hidden
              />
            </a>
          )
        })}
      </div>

      {cv?.url && (
        <div className="border-border bg-card mt-8 flex flex-col items-center gap-4 rounded-2xl border p-8 text-center">
          <h2 className="text-lg font-semibold">
            {locale === 'es'
              ? '¿Prefieres ver todo en un documento?'
              : 'Prefer everything in one document?'}
          </h2>
          <a
            href={cv.url}
            download
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          >
            <Download className="size-4" aria-hidden />
            {textos.descargarCV}
          </a>
        </div>
      )}
    </section>
  )
}
