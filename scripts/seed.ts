/**
 * Carga inicial de contenido desde la terminal.
 *
 * Alternativa al endpoint /api/cargar-contenido para quien prefiera la línea
 * de comandos. Ambos usan la misma lógica.
 *
 * Uso:
 *   npm run seed
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { cargarContenidoInicial } from '../lib/contenido-inicial'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Cargando contenido inicial...\n')
  const cargado = await cargarContenidoInicial(payload)

  for (const item of cargado) {
    console.log(`  ${item}`)
  }

  console.log('\nListo. Entra a /admin y sube las imágenes desde el panel.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Error al cargar el contenido:', error)
  process.exit(1)
})
