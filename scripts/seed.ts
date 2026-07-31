/**
 * Carga inicial de contenido.
 *
 * Rellena el panel con el contenido que hoy está en el sitio, en español e inglés,
 * para no tener que teclearlo a mano. Se ejecuta una sola vez con:
 *
 *     npm run seed
 *
 * Es seguro repetirlo: actualiza lo que ya existe en lugar de duplicarlo.
 * Las imágenes NO se cargan aquí — se suben desde el panel, que es más cómodo.
 */
import { getPayload } from 'payload'
import config from '../payload.config'

/** Convierte texto plano al formato del editor enriquecido. */
function parrafos(textos: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: textos.map((texto) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
          { type: 'text', text: texto, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
        ],
      })),
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Cargando contenido inicial...\n')

  // ── Ajustes del sitio ───────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'ajustes',
    locale: 'es',
    data: {
      nombreSitio: 'Claudia',
      textoPie: '© 2026 Claudia Saravia Matias — UX/UI Designer, Lima, Perú.',
      navegacion: [
        { etiqueta: 'Inicio', ruta: '/' },
        { etiqueta: 'Proyectos', ruta: '/proyectos' },
        { etiqueta: 'Sobre mí', ruta: '/sobre-mi' },
        { etiqueta: 'Contacto', ruta: '/contacto' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'ajustes',
    locale: 'en',
    data: {
      textoPie: '© 2026 Claudia Saravia Matias — UX/UI Designer, Lima, Peru.',
      navegacion: [
        { etiqueta: 'Home', ruta: '/' },
        { etiqueta: 'Projects', ruta: '/proyectos' },
        { etiqueta: 'About', ruta: '/sobre-mi' },
        { etiqueta: 'Contact', ruta: '/contacto' },
      ],
    },
  })
  console.log('  Ajustes del sitio')

  // ── Marca ───────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'marca',
    locale: 'es',
    data: {
      nombreApp: 'Claudia Saravia — Portafolio',
      nombreCorto: 'Claudia',
      colorTema: '#2347f2',
      colorFondo: '#f7f7f5',
      tituloSocial: 'Claudia Saravia — Product Designer UX/UI',
      descripcionSocial:
        'Diseño productos digitales centrados en el usuario: investigación, arquitectura de información, design systems e interfaces que convierten.',
    },
  })

  await payload.updateGlobal({
    slug: 'marca',
    locale: 'en',
    data: {
      tituloSocial: 'Claudia Saravia — Product Designer UX/UI',
      descripcionSocial:
        'I design user-centered digital products: research, information architecture, design systems and interfaces that convert.',
    },
  })
  console.log('  Marca e identidad')

  // ── Página de inicio ────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'inicio',
    locale: 'es',
    data: {
      eyebrow: 'UX/UI Designer · Lima, Perú',
      titulo: 'Product Designer enfocada en UX/UI',
      subtitulo:
        'Diseño productos digitales centrados en el usuario: investigación, arquitectura de información, design systems e interfaces que convierten.',
      botones: [{ texto: 'Ver proyectos', enlace: '/proyectos', estilo: 'primario' }],
    },
  })

  await payload.updateGlobal({
    slug: 'inicio',
    locale: 'en',
    data: {
      eyebrow: 'UX/UI Designer · Lima, Peru',
      titulo: 'Product Designer focused on UX/UI',
      subtitulo:
        'I design user-centered digital products: research, information architecture, design systems and interfaces that convert.',
      botones: [{ texto: 'View projects', enlace: '/proyectos', estilo: 'primario' }],
    },
  })
  console.log('  Página de inicio')

  // ── Sobre mí ────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'sobre-mi',
    locale: 'es',
    data: {
      eyebrow: 'Sobre mí',
      titulo: 'Diseño con intención, no solo con estética',
      biografia: parrafos([
        'Soy Claudia Saravia Matias, diseñadora UX/UI de Lima, Perú, con formación en Diseño Profesional Gráfico (UPC).',
        'Actualmente diseño el producto de Lotobola desde cero: experiencia, flujos críticos y las bases del sistema de diseño.',
        'Trabajo de cerca con equipos de desarrollo, negocio y data, traduciendo necesidades en decisiones de diseño medibles.',
      ]) as never,
      estadisticas: [
        { valor: '54.54%', etiqueta: 'Reducción en tiempo de espera de trámites estudiantiles' },
        { valor: '+73%', etiqueta: 'Incremento en el CES anual' },
        { valor: '33%', etiqueta: 'Mejora en eficiencia operativa' },
        { valor: '91', etiqueta: 'Tipos de trámites estructurados' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'sobre-mi',
    locale: 'en',
    data: {
      eyebrow: 'About me',
      titulo: 'Design with intent, not just aesthetics',
      biografia: parrafos([
        'I am Claudia Saravia Matias, a UX/UI designer from Lima, Peru, with a degree in Professional Graphic Design (UPC).',
        'I currently design the Lotobola product from the ground up: experience, critical flows and the foundations of the design system.',
        'I work closely with engineering, business and data teams, turning needs into measurable design decisions.',
      ]) as never,
      estadisticas: [
        { valor: '54.54%', etiqueta: 'Reduction in student request waiting time' },
        { valor: '+73%', etiqueta: 'Increase in annual CES' },
        { valor: '33%', etiqueta: 'Improvement in operational efficiency' },
        { valor: '91', etiqueta: 'Types of processes structured' },
      ],
    },
  })
  console.log('  Sobre mí')

  // ── Contacto ────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'contacto',
    locale: 'es',
    data: {
      eyebrow: 'Contacto',
      titulo: 'Hablemos de tu próximo proyecto',
      subtitulo:
        'Estoy disponible para nuevas oportunidades y colaboraciones como UX/UI Designer.',
      email: 'hey@claudiasaravia.com',
      telefono: '+51 972 929 971',
      ubicacion: 'Lima, Perú',
      redes: [
        {
          plataforma: 'linkedin',
          etiqueta: '/claudia-sm',
          url: 'https://www.linkedin.com/in/claudia-sm/',
        },
        {
          plataforma: 'behance',
          etiqueta: '/cs.matias',
          url: 'https://behance.net/cs.matias',
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'contacto',
    locale: 'en',
    data: {
      eyebrow: 'Contact',
      titulo: "Let's talk about your next project",
      subtitulo: 'I am available for new opportunities and collaborations as a UX/UI Designer.',
      ubicacion: 'Lima, Peru',
    },
  })
  console.log('  Contacto')

  // ── Experiencia ─────────────────────────────────────────────────────────
  const puestos = [
    {
      empresa: 'Lotobola',
      ubicacion: 'Lima, Perú',
      icono: '💼',
      orden: 1,
      es: {
        rol: 'UX/UI Designer',
        fechaTexto: 'Mar 2025 — Actualidad',
        descripcion:
          'Creación del producto digital desde cero: definición de la experiencia, flujos críticos y bases del sistema de diseño.',
        logros: [
          'Diseño del producto web y mobile desde la etapa inicial.',
          'Creación y evolución del Design System.',
          'Diseño de flujos de compra, onboarding y participación en sorteos.',
        ],
      },
      en: {
        rol: 'UX/UI Designer',
        fechaTexto: 'Mar 2025 — Present',
        descripcion:
          'Building the digital product from scratch: experience definition, critical flows and design system foundations.',
        logros: [
          'Web and mobile product design from the initial stage.',
          'Creation and evolution of the Design System.',
          'Design of purchase, onboarding and raffle participation flows.',
        ],
      },
    },
    {
      empresa: 'InLearning · Intercorp',
      ubicacion: 'Lima, Perú',
      icono: '📊',
      orden: 2,
      es: {
        rol: 'UI Designer',
        fechaTexto: '2023 — Feb 2024',
        descripcion:
          'Optimización de flujos educativos complejos y mejora continua de la experiencia a partir de data e insights.',
        logros: [
          'Actualización y mantenimiento del Design System institucional.',
          'Rediseño de procesos basado en insights de usuario.',
          'QA de diseño antes de cada despliegue.',
        ],
      },
      en: {
        rol: 'UI Designer',
        fechaTexto: '2023 — Feb 2024',
        descripcion:
          'Optimization of complex educational flows and continuous experience improvement based on data and insights.',
        logros: [
          'Maintenance of the institutional Design System.',
          'Process redesign based on user insights.',
          'Design QA before each release.',
        ],
      },
    },
    {
      empresa: 'InLearning · Intercorp',
      ubicacion: 'Lima, Perú',
      icono: '🎓',
      orden: 3,
      es: {
        rol: 'Visual Designer → Practicante Profesional',
        fechaTexto: '2022 — 2023',
        descripcion:
          'Crecimiento interno desde practicante hasta Product Designer, con foco en interfaces y continuidad visual.',
        logros: [],
      },
      en: {
        rol: 'Visual Designer → Professional Intern',
        fechaTexto: '2022 — 2023',
        descripcion:
          'Internal growth from intern to Product Designer, focused on interfaces and visual consistency.',
        logros: [],
      },
    },
  ]

  for (const puesto of puestos) {
    const existente = await payload.find({
      collection: 'experiencia',
      where: { empresa: { equals: puesto.empresa }, orden: { equals: puesto.orden } },
      limit: 1,
    })

    const base = {
      empresa: puesto.empresa,
      ubicacion: puesto.ubicacion,
      icono: puesto.icono,
      orden: puesto.orden,
      ...puesto.es,
      logros: puesto.es.logros.map((texto) => ({ texto })),
    }

    const id =
      existente.docs[0]?.id ??
      (await payload.create({ collection: 'experiencia', locale: 'es', data: base })).id

    if (existente.docs[0]) {
      await payload.update({ collection: 'experiencia', id, locale: 'es', data: base })
    }

    await payload.update({
      collection: 'experiencia',
      id,
      locale: 'en',
      data: { ...puesto.en, logros: puesto.en.logros.map((texto) => ({ texto })) },
    })
  }
  console.log(`  Experiencia (${puestos.length} puestos)`)

  // ── Formación ───────────────────────────────────────────────────────────
  const estudios = [
    {
      institucion: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
      anio: '2022',
      tipo: 'grado' as const,
      ubicacion: 'Lima, Perú',
      orden: 1,
      es: 'Bachiller en Diseño Profesional Gráfico',
      en: "Bachelor's in Professional Graphic Design",
    },
    {
      institucion: 'REPENSAR',
      anio: '2024',
      tipo: 'certificacion' as const,
      ubicacion: 'Online',
      orden: 2,
      es: 'UI Avanzado',
      en: 'Advanced UI',
    },
    {
      institucion: 'IDAT — PACHAQTEC',
      anio: '2023',
      tipo: 'certificacion' as const,
      ubicacion: 'Online',
      orden: 3,
      es: 'Experiencia de Usuario UX',
      en: 'User Experience UX',
    },
    {
      institucion: 'Programa We Talk (UPC)',
      anio: '2021',
      tipo: 'idioma' as const,
      ubicacion: 'Lima, Perú',
      orden: 4,
      es: 'Inglés Intermedio',
      en: 'Intermediate English',
    },
  ]

  for (const estudio of estudios) {
    const existente = await payload.find({
      collection: 'formacion',
      where: { institucion: { equals: estudio.institucion }, anio: { equals: estudio.anio } },
      limit: 1,
    })

    const base = {
      institucion: estudio.institucion,
      anio: estudio.anio,
      tipo: estudio.tipo,
      ubicacion: estudio.ubicacion,
      orden: estudio.orden,
      titulo: estudio.es,
    }

    const id =
      existente.docs[0]?.id ??
      (await payload.create({ collection: 'formacion', locale: 'es', data: base })).id

    if (existente.docs[0]) {
      await payload.update({ collection: 'formacion', id, locale: 'es', data: base })
    }

    await payload.update({
      collection: 'formacion',
      id,
      locale: 'en',
      data: { titulo: estudio.en },
    })
  }
  console.log(`  Formación (${estudios.length} entradas)`)

  // ── Skills ──────────────────────────────────────────────────────────────
  const habilidades = [
    { es: 'Figma', en: 'Figma', nivel: 'avanzado', categoria: 'herramientas' },
    { es: 'Adobe Suite', en: 'Adobe Suite', nivel: 'intermedio', categoria: 'herramientas' },
    { es: 'Office / PowerPoint', en: 'Office / PowerPoint', categoria: 'herramientas' },
    { es: 'UX Research', en: 'UX Research', categoria: 'ux' },
    {
      es: 'Design Systems & Atomic Design',
      en: 'Design Systems & Atomic Design',
      categoria: 'ux',
    },
    { es: 'Wireframing & Prototyping', en: 'Wireframing & Prototyping', categoria: 'ux' },
    { es: 'Diseño centrado en el usuario', en: 'User-centered design', categoria: 'ux' },
    { es: 'QA de diseño', en: 'Design QA', categoria: 'ux' },
    {
      es: 'Trabajo colaborativo multidisciplinario',
      en: 'Cross-functional collaboration',
      categoria: 'competencias',
    },
    {
      es: 'Comunicación con stakeholders',
      en: 'Stakeholder communication',
      categoria: 'competencias',
    },
    { es: 'Pensamiento analítico', en: 'Analytical thinking', categoria: 'competencias' },
  ] as const

  for (const [i, skill] of habilidades.entries()) {
    const existente = await payload.find({
      collection: 'skills',
      where: { nombre: { equals: skill.es } },
      locale: 'es',
      limit: 1,
    })

    const base = {
      nombre: skill.es,
      categoria: skill.categoria,
      nivel: 'nivel' in skill ? skill.nivel : undefined,
      orden: i + 1,
    }

    const id =
      existente.docs[0]?.id ??
      (await payload.create({ collection: 'skills', locale: 'es', data: base as never })).id

    if (existente.docs[0]) {
      await payload.update({ collection: 'skills', id, locale: 'es', data: base as never })
    }

    await payload.update({
      collection: 'skills',
      id,
      locale: 'en',
      data: { nombre: skill.en },
    })
  }
  console.log(`  Skills (${habilidades.length} entradas)`)

  console.log('\nListo. Entra a /admin y sube las imágenes desde el panel.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Error al cargar el contenido:', error)
  process.exit(1)
})
