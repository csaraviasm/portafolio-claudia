import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import { obtenerLocale, t } from '@/lib/locale'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

/** Busca el proyecto por su dirección web. */
async function obtenerProyecto(slug: string, locale: 'es' | 'en') {
  const payload = await getPayload({ config })
  const resultado = await payload.find({
    collection: 'proyectos',
    where: { slug: { equals: slug }, publicado: { equals: true } },
    depth: 2,
    locale,
    limit: 1,
  })
  return resultado.docs[0] ?? null
}

/** Título y vista previa social propios de cada proyecto. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await obtenerLocale()
  const proyecto = await obtenerProyecto(slug, locale)

  if (!proyecto) return {}

  const portada = typeof proyecto.portada === 'object' ? proyecto.portada : null

  return {
    title: proyecto.titulo,
    description: proyecto.resumen ?? undefined,
    openGraph: {
      title: proyecto.titulo,
      description: proyecto.resumen ?? undefined,
      images: portada?.sizes?.og?.url ? [portada.sizes.og.url] : undefined,
    },
  }
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params
  const locale = await obtenerLocale()
  const proyecto = await obtenerProyecto(slug, locale)
  const textos = t(locale)

  if (!proyecto) notFound()

  const portada = typeof proyecto.portada === 'object' ? proyecto.portada : null

  return (
    <article className="mx-auto max-w-(--spacing-content) px-6 py-10 lg:py-14">
      <Link
        href="/proyectos"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {textos.volverProyectos}
      </Link>

      <header className="mb-10 max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-secondary text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
            {proyecto.anio}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-balance lg:text-4xl">
          {proyecto.titulo}
        </h1>

        {proyecto.resumen && (
          <p className="text-muted-foreground text-lg text-pretty">{proyecto.resumen}</p>
        )}

        {proyecto.enlaceExterno && (
          <a
            href={proyecto.enlaceExterno}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            {textos.verEnlace}
            <ExternalLink className="size-4" aria-hidden />
          </a>
        )}
      </header>

      {portada?.url && (
        <div className="bg-secondary relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={portada.sizes?.hero?.url ?? portada.url}
            alt={portada.alt || proyecto.titulo}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 1080px"
            className="object-cover"
          />
        </div>
      )}

      {/* Métricas de impacto */}
      {proyecto.metricas && proyecto.metricas.length > 0 && (
        <section className="mb-12">
          <h2 className="text-accent mb-4 text-xs font-semibold tracking-[0.18em] uppercase">
            {textos.impacto}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proyecto.metricas.map((metrica, i) => (
              <div
                key={metrica.id ?? i}
                className="border-border bg-card rounded-2xl border p-5"
              >
                <div className="text-primary text-2xl font-extrabold">{metrica.valor}</div>
                <div className="text-muted-foreground mt-1 text-sm">{metrica.descripcion}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contenido del caso */}
      {proyecto.contenido && (
        <div className="prose-portafolio mb-12 max-w-3xl">
          <RichText data={proyecto.contenido} />
        </div>
      )}

      {/* Galería */}
      {proyecto.galeria && proyecto.galeria.length > 0 && (
        <section>
          <h2 className="text-accent mb-4 text-xs font-semibold tracking-[0.18em] uppercase">
            {textos.galeria}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {proyecto.galeria.map((item, i) => {
              const img = typeof item.imagen === 'object' ? item.imagen : null
              if (!img?.url) return null

              return (
                <figure key={item.id ?? i} className="space-y-2">
                  <div className="bg-secondary relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={img.sizes?.card?.url ?? img.url}
                      alt={img.alt || ''}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="text-muted-foreground text-sm">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        </section>
      )}
    </article>
  )
}
