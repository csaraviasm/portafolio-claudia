import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Mail, Linkedin } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { obtenerLocale } from '@/lib/locale'
import { cn } from '@/lib/utils'

/**
 * Página de inicio.
 * Todo el texto y la imagen vienen del global "Página de inicio" del panel.
 */
export default async function Home() {
  const locale = await obtenerLocale()
  const payload = await getPayload({ config })

  const [inicio, contacto, ajustes] = await Promise.all([
    payload.findGlobal({ slug: 'inicio', depth: 1, locale }),
    payload.findGlobal({ slug: 'contacto', depth: 0, locale }),
    payload.findGlobal({ slug: 'ajustes', depth: 1, locale }),
  ])

  const imagen = typeof inicio?.imagen === 'object' ? inicio.imagen : null
  const cv = typeof ajustes?.cv === 'object' ? ajustes.cv : null

  return (
    <section className="mx-auto max-w-(--spacing-content) px-6 py-10 lg:py-16">
      <div className="border-border bg-card grid overflow-hidden rounded-3xl border shadow-sm lg:grid-cols-2">
        {/* Columna de texto */}
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-center lg:p-14">
          <div className="max-w-md space-y-5">
            {inicio?.eyebrow && (
              <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
                {inicio.eyebrow}
              </span>
            )}

            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-balance lg:text-[2.75rem]">
              {inicio?.titulo}
            </h1>

            {inicio?.subtitulo && (
              <p className="text-muted-foreground text-base leading-relaxed text-pretty">
                {inicio.subtitulo}
              </p>
            )}
          </div>

          {/* Botones definidos en el panel */}
          <div className="flex w-full max-w-xs flex-col items-center gap-3">
            {(inicio?.botones ?? []).map((boton, i) => {
              if (!boton.enlace || !boton.texto) return null
              const esPrimario = boton.estilo !== 'secundario'

              return (
                <Link
                  key={boton.id ?? i}
                  href={boton.enlace}
                  className={cn(
                    'inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors',
                    esPrimario
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border text-foreground hover:bg-secondary border',
                  )}
                >
                  {boton.texto}
                  {esPrimario && <ArrowRight className="size-4" aria-hidden />}
                </Link>
              )
            })}

            {cv?.url && (
              <a
                href={cv.url}
                download
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
              >
                <Download className="size-4" aria-hidden />
                {locale === 'es' ? 'Descargar CV' : 'Download CV'}
              </a>
            )}
          </div>

          {/* Enlaces de contacto */}
          <div className="flex items-center gap-3">
            {contacto?.email && (
              <a
                href={`mailto:${contacto.email}`}
                aria-label="Email"
                className="border-border text-muted-foreground hover:border-primary hover:text-primary inline-flex size-10 items-center justify-center rounded-full border transition-colors"
              >
                <Mail className="size-4" aria-hidden />
              </a>
            )}

            {(contacto?.redes ?? []).map((red, i) => {
              if (!red.url) return null
              return (
                <a
                  key={red.id ?? i}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={red.plataforma ?? 'Enlace'}
                  className="border-border text-muted-foreground hover:border-primary hover:text-primary inline-flex size-10 items-center justify-center rounded-full border text-xs font-semibold transition-colors"
                >
                  {red.plataforma === 'linkedin' ? (
                    <Linkedin className="size-4" aria-hidden />
                  ) : (
                    (red.plataforma ?? '').slice(0, 2).toUpperCase()
                  )}
                </a>
              )
            })}
          </div>
        </div>

        {/* Columna visual */}
        {imagen?.url && (
          <div className="bg-secondary relative min-h-[320px] lg:min-h-[520px]">
            <Image
              src={imagen.url}
              alt={imagen.alt || ''}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
