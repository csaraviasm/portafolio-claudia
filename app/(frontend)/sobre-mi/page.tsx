import Image from 'next/image'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import { obtenerLocale } from '@/lib/locale'

const ETIQUETAS_CATEGORIA_SKILL: Record<string, { es: string; en: string }> = {
  herramientas: { es: 'Herramientas', en: 'Tools' },
  ux: { es: 'Product & UX Design', en: 'Product & UX Design' },
  competencias: { es: 'Competencias', en: 'Competencies' },
}

/**
 * Sobre mí: biografía, cifras, experiencia, formación y skills.
 */
export default async function SobreMiPage() {
  const locale = await obtenerLocale()
  const payload = await getPayload({ config })

  const [sobreMi, experiencia, formacion, skills] = await Promise.all([
    payload.findGlobal({ slug: 'sobre-mi', depth: 1, locale }),
    payload.find({ collection: 'experiencia', sort: 'orden', locale, limit: 50 }),
    payload.find({ collection: 'formacion', sort: 'orden', locale, limit: 50 }),
    payload.find({ collection: 'skills', sort: 'orden', locale, limit: 100 }),
  ])

  const foto = typeof sobreMi?.foto === 'object' ? sobreMi.foto : null

  // Agrupa las skills por categoría para mostrarlas en bloques.
  const skillsPorCategoria = skills.docs.reduce<Record<string, typeof skills.docs>>(
    (acc, skill) => {
      const cat = skill.categoria ?? 'herramientas'
      acc[cat] = acc[cat] ? [...acc[cat], skill] : [skill]
      return acc
    },
    {},
  )

  return (
    <div className="mx-auto max-w-(--spacing-content) space-y-16 px-6 py-12 lg:py-16">
      {/* Biografía */}
      <section className="grid gap-10 lg:grid-cols-[280px_1fr]">
        {foto?.url && (
          <div className="bg-secondary relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={foto.sizes?.card?.url ?? foto.url}
              alt={foto.alt || ''}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          {sobreMi?.eyebrow && (
            <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
              {sobreMi.eyebrow}
            </span>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight text-balance lg:text-4xl">
            {sobreMi?.titulo}
          </h1>
          {sobreMi?.biografia && (
            <div className="prose-portafolio text-muted-foreground">
              <RichText data={sobreMi.biografia} />
            </div>
          )}
        </div>
      </section>

      {/* Cifras destacadas */}
      {sobreMi?.estadisticas && sobreMi.estadisticas.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sobreMi.estadisticas.map((stat, i) => (
            <div key={stat.id ?? i} className="border-border bg-card rounded-2xl border p-6">
              <div className="text-primary text-3xl font-extrabold">{stat.valor}</div>
              <div className="text-muted-foreground mt-2 text-sm leading-snug">
                {stat.etiqueta}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experiencia */}
      {experiencia.docs.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight">
            {locale === 'es' ? 'Experiencia' : 'Experience'}
          </h2>

          <div className="space-y-4">
            {experiencia.docs.map((puesto) => (
              <div key={puesto.id} className="border-border bg-card rounded-2xl border p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold">
                      {puesto.icono && <span className="mr-2">{puesto.icono}</span>}
                      {puesto.rol}
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      {puesto.empresa}
                      {puesto.ubicacion && (
                        <span className="text-muted-foreground"> · {puesto.ubicacion}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-muted-foreground text-sm">{puesto.fechaTexto}</span>
                </div>

                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {puesto.descripcion}
                </p>

                {puesto.logros && puesto.logros.length > 0 && (
                  <ul className="text-muted-foreground mt-3 space-y-1.5 text-sm">
                    {puesto.logros.map((logro, i) => (
                      <li key={logro.id ?? i} className="flex gap-2">
                        <span className="text-accent mt-1.5 block size-1 shrink-0 rounded-full bg-current" />
                        {logro.texto}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.docs.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight">
            {locale === 'es' ? 'Herramientas y habilidades' : 'Tools and skills'}
          </h2>

          <div className="space-y-5">
            {Object.entries(skillsPorCategoria).map(([categoria, lista]) => (
              <div key={categoria} className="space-y-2">
                <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  {ETIQUETAS_CATEGORIA_SKILL[categoria]?.[locale] ?? categoria}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lista.map((skill) => (
                    <span
                      key={skill.id}
                      className="border-border bg-card rounded-full border px-4 py-1.5 text-sm"
                    >
                      <span className="font-medium">{skill.nombre}</span>
                      {skill.nivel && (
                        <span className="text-muted-foreground"> · {skill.nivel}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formación */}
      {formacion.docs.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight">
            {locale === 'es' ? 'Educación y certificaciones' : 'Education and certifications'}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {formacion.docs.map((item) => (
              <div key={item.id} className="border-border bg-card rounded-2xl border p-5">
                <h3 className="text-sm font-semibold">{item.titulo}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {item.institucion}
                  {item.ubicacion && ` · ${item.ubicacion}`}
                </p>
                <span className="text-primary mt-2 inline-block text-sm font-medium">
                  {item.anio}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
