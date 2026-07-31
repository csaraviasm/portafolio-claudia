'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Enlace = { etiqueta?: string | null; ruta?: string | null; id?: string | null }

/**
 * Enlaces de navegación. En escritorio se muestran en fila;
 * en móvil se pliegan detrás del botón de menú.
 */
export function NavLinks({ enlaces }: { enlaces: Enlace[] }) {
  const [abierto, setAbierto] = useState(false)
  const pathname = usePathname()

  const esActivo = (ruta: string) =>
    ruta === '/' ? pathname === '/' : pathname.startsWith(ruta)

  return (
    <>
      {/* Escritorio */}
      <ul className="hidden items-center gap-7 md:flex">
        {enlaces.map((enlace) => {
          if (!enlace.ruta || !enlace.etiqueta) return null
          return (
            <li key={enlace.id ?? enlace.ruta}>
              <Link
                href={enlace.ruta}
                className={cn(
                  'text-sm font-medium transition-colors',
                  esActivo(enlace.ruta)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {enlace.etiqueta}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Móvil */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-label="Menú"
        className="text-foreground cursor-pointer md:hidden"
      >
        {abierto ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {abierto && (
        <div className="border-border bg-card fixed inset-x-0 top-16 z-40 border-b p-6 md:hidden">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            {enlaces.map((enlace) => {
              if (!enlace.ruta || !enlace.etiqueta) return null
              return (
                <li key={enlace.id ?? enlace.ruta}>
                  <Link
                    href={enlace.ruta}
                    onClick={() => setAbierto(false)}
                    className={cn(
                      'text-base font-medium',
                      esActivo(enlace.ruta) ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
