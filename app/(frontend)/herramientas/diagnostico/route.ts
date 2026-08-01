/**
 * Ruta temporal de diagnóstico de configuración.
 *
 * Informa si las variables de entorno necesarias llegan al servidor,
 * sin revelar sus valores. Se elimina una vez verificado el arranque.
 */
export const dynamic = 'force-dynamic'

export function GET() {
  const revisar = (nombre: string) => {
    const valor = process.env[nombre]
    return {
      definida: typeof valor === 'string' && valor.length > 0,
      longitud: valor?.length ?? 0,
    }
  }

  return Response.json({
    PAYLOAD_SECRET: revisar('PAYLOAD_SECRET'),
    DATABASE_URL: revisar('DATABASE_URL'),
    BLOB_READ_WRITE_TOKEN: revisar('BLOB_READ_WRITE_TOKEN'),
    entorno: process.env.VERCEL_ENV ?? 'desconocido',
  })
}
