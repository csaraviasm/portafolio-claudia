import { cookies } from 'next/headers'

/**
 * Idiomas disponibles en el sitio.
 * Para añadir uno nuevo hay que declararlo también en payload.config.ts.
 */
export type Locale = 'es' | 'en'

export const LOCALES: Locale[] = ['es', 'en']
export const LOCALE_POR_DEFECTO: Locale = 'es'
export const COOKIE_IDIOMA = 'idioma'

/**
 * Devuelve el idioma activo de quien está visitando el sitio.
 *
 * Se guarda en una cookie al pulsar ES/EN en la cabecera, de modo que
 * la elección se recuerda entre páginas y entre visitas.
 */
export async function obtenerLocale(): Promise<Locale> {
  const store = await cookies()
  const valor = store.get(COOKIE_IDIOMA)?.value

  return LOCALES.includes(valor as Locale) ? (valor as Locale) : LOCALE_POR_DEFECTO
}

/**
 * Textos de la interfaz que no son contenido editable.
 *
 * Son las pocas etiquetas que no tiene sentido gestionar desde el panel
 * (botones de sistema, mensajes de estado). Todo el resto del texto del sitio
 * vive en Payload y se edita ahí.
 */
export const UI = {
  es: {
    verProyecto: 'Ver proyecto',
    volverProyectos: 'Volver a proyectos',
    descargarCV: 'Descargar CV',
    menu: 'Menú',
    cerrar: 'Cerrar',
    sinProyectos: 'Todavía no hay proyectos publicados.',
    galeria: 'Galería',
    impacto: 'Impacto',
    verEnlace: 'Ver en vivo',
  },
  en: {
    verProyecto: 'View project',
    volverProyectos: 'Back to projects',
    descargarCV: 'Download CV',
    menu: 'Menu',
    cerrar: 'Close',
    sinProyectos: 'No published projects yet.',
    galeria: 'Gallery',
    impacto: 'Impact',
    verEnlace: 'View live',
  },
} as const

export function t(locale: Locale) {
  return UI[locale]
}
