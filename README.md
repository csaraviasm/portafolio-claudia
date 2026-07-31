# Portafolio — Claudia Saravia Matias

Sitio web personal (portafolio UX/UI) de Claudia Saravia Matias. Producto digital estático, multi-página, bilingüe (ES/EN), sincronizado con un archivo maestro de diseño en Figma.

**Producción:** ver el dominio configurado en Vercel (proyecto `portafolio-claudia`, equipo `Portafolio personal`).

---

## 1. Stack técnico

| Capa | Tecnología |
|---|---|
| Markup / estilos | HTML5 + CSS3 puro (sin framework, sin preprocesador) |
| Interactividad | JavaScript vanilla (ES6+), sin dependencias externas |
| Tipografía | Google Fonts — Poppins |
| Hosting / CI-CD | Vercel (deploy automático en cada push a `main`) |
| Control de versiones | GitHub — `csaraviasm/portafolio-claudia` |
| Diseño fuente de verdad | Figma (ver sección 6) |

No hay build step, no hay `package.json`, no hay bundler. Cada `.html` es una página independiente que importa el mismo `style.css` y `script.js`. Esto es intencional: mantiene el sitio simple, rápido y fácil de auditar mientras se mantiene como landing/portafolio estático.

> **Fase 2 planeada:** migración a Next.js + Payload CMS (headless) para que el contenido (proyectos, experiencia, textos) sea editable desde un panel de administración en lugar de directamente en el código. Ver sección 8.

---

## 2. Estructura del proyecto

```
/
├── index.html          # Página de inicio (hero, no-scroll)
├── proyectos.html       # Grilla de proyectos (no-scroll)
├── sobre-mi.html         # Experiencia, skills, educación
├── contacto.html         # Sobre mí (resumen), stats, contacto
├── style.css            # Única hoja de estilos del sitio completo
├── script.js             # i18n + interacciones (idioma, menú, scroll reveal, nav activo)
├── assets/
│   ├── hero-visual.jpg   # Ilustración del hero (reemplazable, ver sección 5)
│   └── CV-Claudia-Saravia.pdf
├── .gitignore
└── README.md             # Este archivo
```

No hay carpetas `src/`, `dist/` ni `public/`: los archivos en la raíz **son** el sitio servido tal cual por Vercel.

---

## 3. Cómo correrlo localmente

No requiere instalación de dependencias. Basta un servidor estático simple:

```bash
cd portafolio-claudia
python3 -m http.server 8000
# abrir http://localhost:8000
```

o con Node (si está instalado):

```bash
npx serve .
```

Abrir directamente `index.html` con doble clic también funciona, salvo por rutas relativas de fuentes que requieren `http://` en algunos navegadores.

---

## 4. Sistema de idiomas (i18n)

Todo el texto visible vive en un único diccionario dentro de `script.js`:

```js
const TRANSLATIONS = {
  es: { "nav.inicio": "Inicio", ... },
  en: { "nav.inicio": "Home", ... }
};
```

En el HTML, cualquier elemento de texto usa un atributo `data-i18n="clave"` (o `data-i18n-html="clave"` si el texto incluye HTML embebido, como `<span>` de color):

```html
<h2 data-i18n="projects.title">Trabajo seleccionado</h2>
```

`applyLanguage()` en `script.js` recorre el DOM y reemplaza el contenido según el idioma activo (guardado en `localStorage`). **Para editar un texto:** buscar la clave en `TRANSLATIONS` (existe en `es` y debe existir también en `en`) y editar el valor — nunca el HTML directamente, o el texto se perderá al cambiar de idioma.

---

## 5. Convenciones de diseño

Variables globales en `style.css` (`:root`):

```css
--bg: #f7f7f5;        /* fondo general */
--card: #ffffff;       /* fondo de tarjetas */
--border: #e5e5e0;
--text: #17171a;
--text-muted: #6b6b74;
--accent: #2347f2;     /* azul primario — botones, links activos */
--accent-2: #ea6a55;   /* coral — acentos, eyebrows */
--maxw: 1080px;         /* ancho máximo de contenido */
```

**Imagen del hero:** reemplazar directamente `assets/hero-visual.jpg` (mismo nombre de archivo) — no requiere ningún cambio de código. Relación de aspecto recomendada: retrato, similar a 1080×1456.

**Layout "sin scroll":** `index.html` y `proyectos.html` usan `body.home` / `body.no-scroll` respectivamente — un patrón CSS que fuerza el contenido a caber en el alto del viewport (ver comentarios `/* SIN SCROLL */` en `style.css`). `sobre-mi.html` y `contacto.html` son páginas de scroll normal.

---

## 6. Sincronización con Figma

El diseño fuente vive en un archivo de Figma (4 frames: Inicio, Proyectos, Sobre mí, Contacto) usando estilos de texto compartidos con prefijo `Portfolio/*` (Eyebrow, Section Title, Body, Button, Card Title). Cualquier cambio de tipografía/espaciado en Figma debe replicarse manualmente en `style.css` — no hay sincronización automática. Al pedirle a un asistente que replique un cambio de Figma, conviene dar el node-id o captura de pantalla del frame afectado.

---

## 7. Deploy y flujo de trabajo

- **Repositorio:** `github.com/csaraviasm/portafolio-claudia`, rama `main`.
- **Hosting:** Vercel, importado directamente desde el repo de GitHub — cada push a `main` dispara un deploy automático a producción.
- **Flujo de trabajo:** los cambios se preparan y confirman (commit) localmente/asistido, y el push final a `main` lo autoriza siempre Claudia Saravia (autora de todos los commits — ver `git log`). Ningún cambio queda en producción sin ese push explícito.
- **Dominio propio:** DNS gestionado en Hostinger, apuntando a Vercel (ver instrucciones entregadas aparte).

---

## 8. Para otro asistente / LLM que retome este proyecto

Si estás retomando este proyecto (Claude, ChatGPT, u otro modelo), esto es lo que necesitas saber antes de tocar código:

1. **No hay backend ni base de datos todavía.** Todo el contenido está hardcodeado en los `.html` y en `TRANSLATIONS` (`script.js`). No inventes llamadas a APIs que no existen.
2. **Un solo `style.css` global.** No crear hojas de estilo por página. Usar las variables CSS existentes en `:root` en vez de colores/tamaños sueltos.
3. **Todo texto visible debe pasar por el sistema i18n** (`data-i18n` / `data-i18n-html` + entrada en `TRANSLATIONS.es` y `TRANSLATIONS.en`). Nunca dejar texto sin su contraparte en ambos idiomas.
4. **No agregar dependencias/build tools** sin que el proyecto lo pida explícitamente (por ejemplo, al migrar a Payload en la Fase 2). Mientras el sitio sea estático, mantenerlo sin `npm install`.
5. **No hacer `git push` sin que la dueña del proyecto (Claudia) lo confirme explícitamente.** Preparar los cambios (branch/commit) y esperar la autorización antes de subir a `main`, ya que cada push dispara un deploy automático a producción.
6. **Nunca dejar referencias a herramientas de IA/asistentes en el código, commits o comentarios** (nombres de modelos, menciones de "generado por IA", etc.) — el repositorio debe verse como trabajo humano estándar, auditable como cualquier repositorio profesional.
7. **Antes de rediseñar algo**, revisar si el cambio ya existe en Figma (sección 6) — el sitio debe mantenerse sincronizado con el diseño fuente, no divergir por iniciativa propia del código.

---

## 9. Roadmap

- [x] Sitio estático multi-página con i18n ES/EN
- [x] Deploy a producción (Vercel)
- [x] Dominio propio conectado (Hostinger → Vercel)
- [x] Correo del dominio (`hey@claudiasaravia.com`) enlazado a Gmail
- [ ] Favicon y metadatos Open Graph
- [ ] Migración a Next.js + Payload CMS (contenido editable sin tocar código)
- [ ] Páginas de detalle por proyecto
- [ ] Panel de administración para proyectos/experiencia/skills

El plan detallado de la Fase 2 (stack, colecciones, etapas y riesgos) está en
[`ARQUITECTURA.md`](./ARQUITECTURA.md).
