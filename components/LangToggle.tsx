'use client'

import { useTransition } from 'react'
import { cambiarIdioma } from '@/app/(frontend)/actions'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/locale'

/**
 * Selector de idioma ES / EN de la cabecera.
 */
export function LangToggle({ activo }: { activo: Locale }) {
  const [pendiente, iniciarTransicion] = useTransition()

  const seleccionar = (locale: Locale) => {
    if (locale === activo) return
    iniciarTransicion(() => {
      cambiarIdioma(locale)
    })
  }

  return (
    <div
      className="border-border bg-card flex items-center gap-0.5 rounded-full border p-0.5"
      role="group"
      aria-label="Idioma"
    >
      {(['es', 'en'] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => seleccionar(locale)}
          disabled={pendiente}
          aria-pressed={activo === locale}
          className={cn(
            'cursor-pointer rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors',
            activo === locale
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground',
            pendiente && 'opacity-60',
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}
