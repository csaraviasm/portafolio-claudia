import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/**
 * Forma mínima de un proyecto que necesita la tarjeta.
 *
 * No se importa de `payload-types` a propósito: ese archivo se genera al
 * ejecutar `npm run generate:types` y no existe en una instalación limpia,
 * lo que haría fallar el primer build.
 */
type ProyectoTarjeta = {
  id: string | number
  slug: string
  titulo: string
  anio: string
  categoria: string
  resumen?: string | null
  portada?:
    | { url?: string | null; alt?: string | null; sizes?: { card?: { url?: string | null } } }
    | string
    | number
    | null
}

const ETIQUETAS_CATEGORIA: Record<string, string> = {
  'product-design': 'Product Design',
  'design-system': 'Design System',
  'visual-design': 'Visual Design',
  'ux-research': 'UX Research',
}

/**
 * Tarjeta de proyecto en la grilla. Enlaza a la página de detalle.
 */
export function ProjectCard({ proyecto }: { proyecto: ProyectoTarjeta }) {
  const portada = typeof proyecto.portada === 'object' ? proyecto.portada : null
  const miniatura = portada?.sizes?.card?.url ?? portada?.url

  return (
    <Link
      href={`/proyectos/${proyecto.slug}`}
      className="group border-border bg-card hover:border-primary/40 flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="bg-secondary relative aspect-[4/3] overflow-hidden">
        {miniatura && (
          <Image
            src={miniatura}
            alt={portada?.alt || proyecto.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-secondary text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
            {proyecto.anio}
          </span>
          <span className="border-border text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium">
            {ETIQUETAS_CATEGORIA[proyecto.categoria] ?? proyecto.categoria}
          </span>
        </div>

        <h3 className="text-base leading-snug font-semibold text-balance">{proyecto.titulo}</h3>

        {proyecto.resumen && (
          <p className="text-muted-foreground line-clamp-2 text-sm">{proyecto.resumen}</p>
        )}

        <ArrowUpRight className="text-primary mt-auto size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  )
}
