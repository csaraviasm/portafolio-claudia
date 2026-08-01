/**
 * Sincroniza el esquema de la base de datos con las colecciones definidas en
 * `payload.config.ts`, creando las tablas que falten.
 *
 * Por qué existe:
 * Payload solo sincroniza el esquema automáticamente en modo desarrollo. En un
 * despliegue el proceso normal serían migraciones versionadas, que requieren
 * generarlas a mano en un entorno local conectado a la base de datos.
 *
 * Para un sitio de una sola autora, con el esquema definido íntegramente en el
 * código y sin ediciones manuales de la base, sincronizar en cada build es
 * equivalente y elimina un paso manual frágil.
 *
 * Se ejecuta como parte de `npm run build`. Es idempotente: si el esquema ya
 * coincide, no hace nada.
 *
 * Si el proyecto crece o lo editan varias personas, conviene cambiar a
 * migraciones versionadas (`npm run migrate:create`) y quitar este paso.
 */

// Debe fijarse antes de importar la configuración: es lo que habilita la
// sincronización de esquema en el adaptador de base de datos.
process.env.NODE_ENV = 'development'

async function sincronizarEsquema() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')

  console.log('Sincronizando esquema de la base de datos...')

  const payload = await getPayload({ config })

  // La inicialización dispara la sincronización. Se cierra la conexión para
  // que el proceso de build no quede esperando.
  await payload.db.destroy?.()

  console.log('Esquema sincronizado.')
  process.exit(0)
}

sincronizarEsquema().catch((error) => {
  console.error('No se pudo sincronizar el esquema:', error)
  process.exit(1)
})
