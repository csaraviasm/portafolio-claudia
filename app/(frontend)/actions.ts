'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { COOKIE_IDIOMA, type Locale } from '@/lib/locale'

/**
 * Guarda el idioma elegido en una cookie y refresca la página.
 * Se llama desde el selector ES/EN de la cabecera.
 */
export async function cambiarIdioma(locale: Locale) {
  const store = await cookies()

  store.set(COOKIE_IDIOMA, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // un año
    sameSite: 'lax',
  })

  revalidatePath('/', 'layout')
}
