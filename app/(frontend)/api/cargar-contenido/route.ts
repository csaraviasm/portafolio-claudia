import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { cargarContenidoInicial } from '@/lib/contenido-inicial'

/**
 * Carga inicial de contenido desde el navegador.
 *
 * Rellena el panel con los textos, experiencia, formación y skills del sitio,
 * en español e inglés, sin necesidad de usar la terminal.
 *
 * Solo funciona con una sesión de administradora iniciada: sin ella devuelve 401.
 * Es idempotente, así que puede repetirse sin duplicar nada.
 *
 * Ruta temporal: se elimina una vez cargado el contenido.
 */
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET() {
  const payload = await getPayload({ config })

  // Comprueba que quien llama sea una usuaria autenticada del panel.
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    return Response.json(
      { error: 'Necesitas haber iniciado sesión en /admin para usar esta ruta.' },
      { status: 401 },
    )
  }

  try {
    const cargado = await cargarContenidoInicial(payload)

    return Response.json({
      ok: true,
      mensaje: 'Contenido cargado correctamente.',
      cargado,
      siguientePaso: 'Entra a /admin y sube las imágenes desde la sección Archivos.',
    })
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 },
    )
  }
}
