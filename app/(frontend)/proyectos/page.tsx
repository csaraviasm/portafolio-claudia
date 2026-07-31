import { getPayload } from 'payload'
import config from '@/payload.config'
import { ProjectCard } from '@/components/ProjectCard'
import { obtenerLocale, t } from '@/lib/locale'

/**
 * Grilla de proyectos.
 * Solo se listan los marcados como "Publicado" en el panel.
 */
export default async function ProyectosPage() {
  const locale = await obtenerLocale()
  const payload = await getPayload({ config })
  const textos = t(locale)

  const [proyectos, ajustes] = await Promise.all([
    payload.find({
      collection: 'proyectos',
      where: { publicado: { equals: true } },
      sort: 'orden',
      depth: 1,
      locale,
      limit: 50,
    }),
    payload.findGlobal({ slug: 'ajustes', depth: 0, locale }),
  ])

  return (
    <section className="mx-auto max-w-(--spacing-content) px-6 py-12 lg:py-16">
      <div className="mb-10 max-w-2xl space-y-3">
        <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
          {locale === 'es' ? 'Proyectos' : 'Projects'}
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-balance lg:text-4xl">
          {locale === 'es' ? 'Trabajo seleccionado' : 'Selected work'}
        </h1>
      </div>

      {proyectos.docs.length === 0 ? (
        <p className="text-muted-foreground">{textos.sinProyectos}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.docs.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      )}
    </section>
  )
}
