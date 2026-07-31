# Arquitectura — Portafolio Claudia Saravia

Documento de referencia para el estado actual del sistema y el plan de migración a CMS.
Sirve como contexto base para cualquier persona o asistente que retome el desarrollo.

Última revisión: 31 de julio de 2026.

---

## Parte 1 — Estado actual (Fase 1, en producción)

### 1.1 Diagrama del pipeline

```
  Editar archivos          git push main            Deploy automático
  en local          ──▶    GitHub               ──▶  Vercel        ──▶  claudiasaravia.com
  (HTML/CSS/JS)            csaraviasm/                (Hobby, free)      (DNS en Hostinger)
                           portafolio-claudia
```

Sin build step. Vercel sirve los archivos tal cual están en el repo.

### 1.2 Verificación del pipeline

| Componente | Estado | Detalle verificado |
|---|---|---|
| Repositorio GitHub | OK | `csaraviasm/portafolio-claudia`, público, rama `main`, 2 commits |
| Autoría de commits | OK | Ambos commits firmados como `Claudia Saravia Matias <csaravia.sm@gmail.com>` |
| Sincronización local ↔ remoto | OK | `main` alineado con `origin/main`, sin divergencia |
| Proyecto Vercel | OK | `portafolio-claudia`, equipo `Portafolio personal`, plan Hobby |
| Último deploy | OK | Estado `READY`, target `production` |
| Dominio apex | OK | `claudiasaravia.com` → redirect 308 → `www` |
| Dominio www | OK | `www.claudiasaravia.com` sirviendo producción, HTTPS válido |
| DNS Hostinger | OK | `A @ → 216.198.79.1` · `CNAME www → *.vercel-dns-017.com` |
| Correo del dominio | OK | `hey@claudiasaravia.com` — envío (SMTP) y recepción (reenvío) activos |
| Contenido servido | OK | Las 4 páginas responden; el PDF del CV se descarga correctamente |
| Referencias a herramientas de IA en el código | Limpio | Sin coincidencias en HTML/CSS/JS/commits |

### 1.3 Hallazgos a corregir

**H1 — Archivos sueltos sin versionar (bajo)**
En la carpeta de trabajo hay tres archivos fuera del repositorio:
`portfolio.html` y `status-panel.html` (borradores obsoletos de una versión anterior de una sola página) y `enlazar-correo-gmail.md` (guía operativa, no es parte del sitio).
No afectan producción porque nunca se subieron, pero ensucian el `git status` y algún día alguien los va a subir por error.
*Acción:* añadirlos a `.gitignore` o borrarlos.

**H2 — Roadmap del README desactualizado (bajo)**
La sección 9 marca "Dominio propio conectado" como pendiente cuando ya está en producción.
*Acción:* actualizar los checkboxes.

**H3 — Sin favicon ni metadatos sociales (medio)**
Las páginas no declaran `favicon`, `og:image`, `og:title` ni `og:description`. Al compartir el enlace en LinkedIn o WhatsApp aparece sin imagen ni descripción — para un portafolio que se comparte con reclutadores, esto pesa.
*Acción:* añadir favicon y bloque Open Graph. Se resuelve de forma definitiva en la Fase 2 con metadata generada desde el CMS.

Ninguno de los tres bloquea nada. El pipeline está sano y listo para trabajar sobre él.

---

## Parte 2 — Fase 2: migración a Next.js + Payload CMS

### 2.1 El objetivo, en una frase

Que el contenido (proyectos, textos, imágenes, CV) se edite desde un panel de administración
en el navegador, y que el código solo contenga funcionalidad y diseño — nunca contenido.

### 2.2 Por qué Payload y no otro CMS

Payload 3 se instala **dentro** del mismo proyecto Next.js, en la carpeta `app/`.
No es un servicio externo al que le pides datos por API: es parte de tu aplicación.
Consecuencias prácticas:

- Un solo repositorio, un solo deploy, un solo dominio. El panel vive en `/admin`.
- Sin límites de plan ni cuotas de API de terceros (es open source, self-hosted en tu Vercel).
- El contenido es tuyo, en tu base de datos. Si algún día migras, exportas y listo.
- Soporta español/inglés de forma nativa (localization), lo que reemplaza el diccionario
  `TRANSLATIONS` actual por campos traducibles en el panel.

### 2.3 Stack propuesto

| Capa | Elección | Por qué |
|---|---|---|
| Framework | Next.js (App Router) + React 19 | Requisito de Payload 3; mismo hosting que ya usas |
| CMS | Payload 3 | Panel de admin incluido, se instala en el mismo proyecto |
| Estilos | Tailwind CSS v4 | Estándar de la industria, sin CSS suelto que mantener |
| Componentes | shadcn/ui | El código de cada componente entra en tu repo y lo puedes editar |
| Iconos | lucide-react | Set consistente, importación individual, sin peso muerto |
| Base de datos | Postgres en Neon | Plan gratuito, integración nativa con Vercel, escala a cero |
| Almacenamiento de archivos | Vercel Blob | Imágenes y PDFs subidos desde el panel |
| Hosting | Vercel (mismo proyecto) | Ya configurado, deploy automático desde `main` |
| Lenguaje | TypeScript | Payload genera tipos de tus colecciones: el editor avisa de errores antes de ejecutar |

Todo el stack tiene plan gratuito suficiente para un portafolio personal.

**Por qué shadcn/ui y no una librería de componentes tradicional.**
shadcn/ui no se instala como dependencia: al añadir un componente, su código fuente se
copia a `components/ui/` dentro de tu repositorio. Es tuyo y lo puedes modificar línea
a línea. No hay que pelearse con los estilos de una librería ajena ni esperar a que
sus mantenedores acepten un cambio. Para un portafolio de diseñadora —donde el
detalle visual es el argumento de venta— esto es la diferencia entre poder ejecutar
tus propuestas o tener que adaptarlas a lo que la librería permite.

**Los tokens de diseño están conectados.**
Los colores del sitio actual (`--accent: #2347f2`, `--accent-2: #ea6a55`, etc.) ya están
traducidos al formato que consumen los componentes de shadcn, en
`app/(frontend)/globals.css`. Consecuencia práctica: cualquier componente que instales
sale con tu identidad visual desde el primer render, sin retoques. Y si un día cambias
la paleta, se edita un solo bloque y cambia el sitio entero.

### 2.4 Cómo se organiza el contenido en el panel

Payload separa el contenido en dos tipos. Entender esta distinción es lo único
conceptualmente nuevo:

- **Colecciones** — cosas de las que hay *muchas* y que se crean y borran.
  Ejemplo: proyectos. Hoy tienes 3, mañana 7.
- **Globales** — contenido único que solo se edita.
  Ejemplo: el texto del hero. Hay uno solo y siempre existe.

#### Colecciones propuestas

**`Proyectos`** — el corazón del portafolio

| Campo | Tipo | Para qué sirve |
|---|---|---|
| Título | Texto (ES/EN) | Nombre del proyecto |
| Slug | Texto | URL del caso: `/proyectos/lotobola` |
| Año | Texto | "2025" |
| Categoría | Selección | Product Design · Design System · Visual Design |
| Resumen | Texto largo (ES/EN) | Descripción corta para la grilla |
| Imagen de portada | Imagen | La que aparece en la tarjeta |
| Galería | Varias imágenes | Pantallas, mockups, proceso |
| Contenido del caso | Editor enriquecido (ES/EN) | El caso completo: reto, proceso, resultado |
| Métricas | Lista repetible | Pares número + descripción ("54.54%" + "reducción...") |
| Orden | Número | Controla la posición en la grilla |
| Publicado | Sí/No | Permite dejar casos en borrador sin que se vean |

Esto te habilita algo que hoy no tienes: **páginas de detalle por proyecto**.
Hoy las tarjetas no llevan a ningún lado.

**`Experiencia`** — cada puesto de trabajo
Rol · Empresa · Ubicación · Fecha inicio · Fecha fin · Descripción · Icono · Orden

**`Formación`** — educación y certificaciones
Título · Institución · Año · Tipo (grado / certificación / idioma)

**`Skills`** — herramientas y habilidades
Nombre · Nivel (avanzado/intermedio/básico) · Categoría · Orden

**`Media`** — biblioteca de archivos, única fuente de verdad
Toda imagen y PDF del sitio vive aquí: portadas de proyectos, galerías, foto de perfil,
CV, y también **los assets de identidad** (favicon, imagen para redes, iconos de la app móvil).
Nada de esto va en una carpeta `/public` del código: si es un archivo, se sube por el panel.
Payload genera automáticamente las versiones y tamaños que cada uso necesita.

**`Usuarios`** — quién entra al panel
Solo tú al inicio. Permite invitar a alguien más si algún día lo necesitas.

#### Globales propuestos

**`Inicio`** — eyebrow, título, subtítulo, texto de los botones, imagen del hero
**`Sobre mí`** — foto, párrafos de bio, texto introductorio
**`Contacto`** — correo, teléfono, ubicación, LinkedIn, Behance
**`Ajustes del sitio`** — nombre del sitio, PDF del CV, textos SEO por defecto

**`Marca`** — identidad visual y presencia móvil
Concentra los assets que definen cómo se ve el sitio *fuera* del sitio:

| Campo | Tipo | Dónde se ve |
|---|---|---|
| Logo | Media | Cabecera del sitio |
| Icono base | Media | Origen de favicon e iconos de la app |
| Imagen para redes (OG) | Media | Al compartir el enlace en LinkedIn, WhatsApp, Slack |
| Título para redes | Texto (ES/EN) | Titular de la vista previa al compartir |
| Descripción para redes | Texto (ES/EN) | Bajada de la vista previa al compartir |
| Nombre de la app | Texto | Etiqueta bajo el icono en la pantalla del teléfono |
| Color del tema | Color | Barra del navegador en móvil |
| Color de fondo | Color | Pantalla de carga al abrir la app |

Todo esto se edita desde el panel. Cambias el icono en `/admin` y el favicon del sitio
y el icono en el teléfono cambian solos, sin tocar código ni hacer deploy.

### 2.4.1 Acceso desde el teléfono (PWA)

El sitio se configura como aplicación instalable: desde el navegador del móvil,
"Añadir a pantalla de inicio" deja un icono junto al resto de tus apps. Al abrirlo
arranca a pantalla completa, sin barra de navegador — se siente como una app nativa.

Útil exactamente para lo que buscas: enseñar tu portafolio en una reunión o consultarlo
rápido sin escribir la URL.

Implementación: el archivo `manifest` que exige el navegador **no es un archivo estático**,
se genera al vuelo leyendo el global `Marca`. Los iconos se sirven desde la colección Media
en los tamaños que cada dispositivo pide (192px y 512px para Android, `apple-touch-icon`
de 180px para iPhone). Consecuencia práctica: el icono de tu app es un campo editable,
no algo que haya que pedirle a un desarrollador.

### 2.4.2 Assets que hacen falta

Bloqueante para favicon, redes sociales e icono móvil. Con estos tres se genera todo lo demás:

| Asset | Formato | Notas |
|---|---|---|
| Icono / marca | SVG, o PNG 1024×1024 | Fondo transparente. De aquí salen favicon y los iconos de la app. Debe leerse bien a 32px: si el logo completo no funciona tan pequeño, sirve un monograma (la "C" con el punto, por ejemplo) |
| Imagen para redes (OG) | PNG o JPG 1200×630 | Lo que se ve al compartir el enlace. Suele llevar nombre + rol + un fondo de marca |
| Colores de tema y fondo | Dos códigos hex | Sugerencia a partir del sitio actual: tema `#2347f2`, fondo `#f7f7f5` |

Se cargan en Media desde el panel una vez esté montado. Mientras tanto quedan como
pendiente abierto y no bloquean el resto de la migración.

### 2.5 Cómo se ve tu día a día después de migrar

| Lo que quieres hacer | Hoy | Después |
|---|---|---|
| Agregar un proyecto | Editar HTML + CSS, commit, push | `/admin` → Proyectos → Crear → Guardar |
| Cambiar una foto | Reemplazar archivo, commit, push | Subirla desde el panel |
| Corregir un texto | Buscar la clave en `script.js` en ES y EN | Editarlo en el campo, con selector de idioma |
| Reordenar la grilla | Mover bloques de HTML a mano | Cambiar el número de orden |
| Ocultar algo temporalmente | Borrar o comentar el HTML | Desmarcar "Publicado" |
| Actualizar el CV | Reemplazar el PDF, commit, push | Subir el nuevo PDF en Ajustes |

**Lo único que seguirá siendo código:** el diseño, las animaciones, la estructura de las
páginas y cualquier funcionalidad nueva. Que es exactamente el reparto que buscas.

### 2.6 Estructura de carpetas resultante

```
/
├── app/
│   ├── (frontend)/              # El sitio público
│   │   ├── page.tsx              # Inicio
│   │   ├── proyectos/
│   │   │   ├── page.tsx          # Grilla de proyectos
│   │   │   └── [slug]/page.tsx   # Detalle de cada proyecto  ← nuevo
│   │   ├── sobre-mi/page.tsx
│   │   ├── contacto/page.tsx
│   │   └── layout.tsx            # Header, footer, selector de idioma
│   │
│   └── (payload)/               # El panel de administración
│       └── admin/                # No se toca: lo genera Payload
│
├── collections/                  # Definición de qué campos tiene cada cosa
│   ├── Proyectos.ts
│   ├── Experiencia.ts
│   ├── Formacion.ts
│   ├── Skills.ts
│   ├── Media.ts
│   └── Usuarios.ts
│
├── globals/                      # Definición del contenido único
│   ├── Inicio.ts
│   ├── SobreMi.ts
│   ├── Contacto.ts
│   └── Ajustes.ts
│
├── components/
│   ├── ui/                       # Componentes de shadcn — código editable, es tuyo
│   ├── Header.tsx
│   ├── ProjectCard.tsx
│   └── ...
│
├── lib/
│   ├── utils.ts                  # Utilidad `cn()` que usan los componentes
│   └── metadata.ts               # Favicon y vista previa social, leídos del panel
│
├── payload.config.ts             # Configuración central del CMS
├── components.json               # Configuración de shadcn
└── package.json
```

Los estilos no viven en una carpeta aparte: los tokens están en
`app/(frontend)/globals.css` y el resto se escribe con clases de Tailwind
directamente en cada componente.

**Regla de oro para mantener esto ordenado:**
si es *contenido*, va en el panel. Si es *comportamiento o apariencia*, va en el código.
Ante la duda: ¿lo cambiarías tú sin ayuda técnica? Entonces es contenido.

### 2.7 Plan de migración por etapas

Cada etapa deja el sitio funcionando. Nada se rompe en el camino.

**Etapa 0 — Higiene (30 min)**
Resolver H1 y H2. H3 (favicon y Open Graph) se resuelve directamente en la Fase 2,
gestionado desde el panel — no tiene sentido implementarlo dos veces.

**Etapa 1 — Andamiaje (medio día)**
Crear la base de datos en Neon, instalar Next.js + Payload en una rama aparte,
definir colecciones y globales, verificar que `/admin` abre y guarda datos.
El sitio en producción sigue intacto durante toda esta etapa.

**Etapa 2 — Migrar el diseño (1–2 días)**
Convertir las 4 páginas actuales a componentes de Next.js, conservando el CSS
y el diseño exactamente igual. En este punto el sitio se ve idéntico pero lee del CMS.

**Etapa 3 — Cargar el contenido (2–3 horas, lo haces tú)**
Entrar al panel y subir proyectos, experiencia, skills, imágenes y CV.
Es el momento en que aprendes a usar la herramienta con contenido real.

**Etapa 4 — Páginas de detalle (medio día)**
Construir la vista individual de cada proyecto, que hoy no existe.

**Etapa 4.5 — Identidad y app móvil (2 horas)**
Cargar los assets de marca en Media, conectar favicon y Open Graph a los campos del panel,
generar el manifest y dejar el sitio instalable en el teléfono. Requiere los assets de 2.4.2.

**Etapa 5 — Publicar (1 hora)**
Merge a `main`, configurar las variables de entorno en Vercel, verificar el dominio.
Deploy con la posibilidad de volver atrás en un clic si algo sale mal.

### 2.8 Riesgos y cómo se controlan

| Riesgo | Control |
|---|---|
| Romper el sitio en producción durante la migración | Todo el trabajo ocurre en una rama separada; `main` no se toca hasta el final |
| Perder contenido si falla la base de datos | Neon incluye backups automáticos; el contenido también vive en el repo hasta la Etapa 3 |
| Que el panel quede expuesto | Payload exige autenticación; `/admin` no es accesible sin cuenta |
| Costos inesperados | Todo el stack en plan gratuito; Vercel en Hobby no permite cargos por uso |
| Que la migración quede a medias | Cada etapa es un entregable funcional; se puede pausar sin dejar el proyecto roto |

---

## Parte 3 — Reglas de trabajo vigentes

Aplican tanto a la Fase 1 como a la Fase 2:

1. Ningún `git push` a `main` sin autorización explícita de la dueña del proyecto.
   Cada push despliega a producción.
2. Todos los commits van a nombre de Claudia Saravia.
3. Sin referencias a herramientas de IA o asistentes en código, comentarios o mensajes
   de commit. El repositorio debe ser auditable como cualquier repositorio profesional.
4. Todo texto visible debe existir en español e inglés.
5. Sin dependencias nuevas fuera de las que exige la fase en curso.
6. El diseño en Figma es la fuente de verdad visual. No divergir por iniciativa del código.
