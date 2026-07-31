# Arrancar el panel por primera vez

Todo lo que se podía dejar hecho, ya está hecho. Queda esto, que necesita tu terminal.

**Tiempo estimado: 15 minutos.** No necesitas entender los comandos: cópialos y pégalos
uno por uno, esperando a que cada uno termine antes del siguiente.

Si algo falla, no hace falta que me mandes capturas: copia el texto rojo que salga y
pégalo en el chat.

---

## Cómo abrir la Terminal

1. Pulsa `Cmd` + barra espaciadora.
2. Escribe `Terminal` y pulsa Enter.
3. Se abre una ventana negra o blanca con texto. Ahí van los comandos.

Para pegar en la Terminal: `Cmd` + `V`, luego Enter.

---

## Paso 1 — Ir a la carpeta del proyecto

Copia y pega esto, luego Enter:

```bash
cd ~/Library/Application\ Support/Claude/local-agent-mode-sessions/36acc72d-7c85-4a2b-8772-faa86358bc68/44dd8a4a-45ec-4086-904f-414840febc5d/local_b5f8eb5b-94dc-4634-8919-d7906db21442/outputs
```

Para confirmar que estás en el sitio correcto, pega esto:

```bash
ls
```

Debes ver una lista que incluye `payload.config.ts`, `collections`, `globals`.
Si no ves eso, avísame antes de seguir.

---

## Paso 2 — Cambiar a la rama de trabajo

El sitio actual sigue funcionando en la rama principal. El trabajo nuevo está en otra
rama, para no romper nada:

```bash
git checkout feat/payload-cms
```

---

## Paso 3 — Instalar el proyecto

Esto descarga todo lo que el proyecto necesita. **Tarda entre 2 y 5 minutos** y escupe
mucho texto: es normal.

```bash
npm install
```

Cuando termine verás algo como `added 400 packages`. Si aparecen avisos amarillos
(`warn`), ignóralos: son normales.

---

## Paso 4 — Generar la clave de seguridad

Payload necesita una clave secreta para proteger el acceso al panel. Este comando la
genera al azar:

```bash
openssl rand -base64 32
```

Te va a devolver una línea de letras y números, algo así:

```
K7xR2mNpQ8vT4wY6zA1bC3dE5fG7hJ9kL0mN2pQ4rS6=
```

**Cópiala entera** (selecciónala con el ratón y `Cmd`+`C`). La usas en el paso siguiente.
No la compartas con nadie.

---

## Paso 5 — Guardar la clave en Vercel

1. Abre esta dirección en Chrome:
   https://vercel.com/portafolio-personal1/portafolio-claudia/settings/environment-variables

2. Clic en **Add Environment Variable** (arriba a la derecha).

3. Rellena:
   - **Key:** `PAYLOAD_SECRET`
   - **Value:** pega la clave del paso anterior
   - **Environments:** deja marcados los tres (Production, Preview, Development)

4. Clic en **Save**.

---

## Paso 6 — Traer la configuración a tu Mac

Vuelve a la Terminal. Este comando instala la herramienta de Vercel:

```bash
npm install -g vercel
```

Ahora conecta tu carpeta con el proyecto de Vercel:

```bash
vercel link
```

Te hará algunas preguntas. Responde así:

| Pregunta | Respuesta |
|---|---|
| Set up "…/outputs"? | escribe `y` y Enter |
| Which scope? | elige **Portafolio personal** con las flechas y Enter |
| Link to existing project? | escribe `y` y Enter |
| What's the name of your existing project? | escribe `portafolio-claudia` y Enter |

Por último, descarga las claves:

```bash
vercel env pull .env.local
```

Esto crea un archivo con todas las contraseñas de la base de datos. Es privado y no se
sube a GitHub: ya está protegido.

---

## Paso 7 — Arrancar el panel

```bash
npm run dev
```

Espera hasta ver un mensaje con `Ready` y `http://localhost:3000`.

**Deja esta ventana de Terminal abierta.** Mientras esté abierta, el sitio funciona en tu
Mac. Si la cierras, se apaga.

Ahora abre en Chrome:

```
http://localhost:3000/admin
```

Te va a pedir crear tu cuenta de administradora:
- **Nombre:** Claudia
- **Email:** `hey@claudiasaravia.com` (o el que prefieras)
- **Contraseña:** la que quieras, **apúntala**

Esta es la cuenta con la que entrarás al panel siempre.

---

## Paso 8 — Cargar tu contenido automáticamente

Abre una **segunda ventana** de Terminal (`Cmd`+`N` desde la Terminal) y pega:

```bash
cd ~/Library/Application\ Support/Claude/local-agent-mode-sessions/36acc72d-7c85-4a2b-8772-faa86358bc68/44dd8a4a-45ec-4086-904f-414840febc5d/local_b5f8eb5b-94dc-4634-8919-d7906db21442/outputs
npm run seed
```

Esto rellena el panel con tu experiencia, formación, skills y todos los textos del sitio,
en español e inglés. No tienes que teclear nada de eso.

Cuando termine, recarga `http://localhost:3000/admin` y vas a ver todo cargado.

---

## Paso 9 — Subir las imágenes

Esto sí es manual, pero es lo divertido. En el panel:

1. **Archivos** → arrastra tus imágenes y el PDF del CV.
   A cada una ponle un texto alternativo (una frase describiendo la imagen).

2. **Página de inicio** → campo "Imagen del hero" → elige la que subiste.

3. **Ajustes del sitio** → campo "CV en PDF" → elige el PDF.

4. **Marca e identidad** → sube el icono y la imagen para redes cuando los tengas.

5. **Proyectos** → "Crear nuevo" por cada caso. Rellena portada, resumen, galería y
   métricas. Marca **Publicado** cuando esté listo.

Recuerda: arriba a la derecha del panel hay un selector **ES / EN**. Cambia a EN y
rellena la versión en inglés de cada texto.

---

## Paso 10 — Avísame

Cuando tengas contenido cargado, me dices y yo hago la revisión, el merge a la rama
principal y el despliegue a producción.

---

## Si algo sale mal

| Síntoma | Qué hacer |
|---|---|
| `command not found: npm` | Pega `brew install node` y repite el paso 3 |
| `permission denied` en el paso 6 | Pega `sudo npm install -g vercel` y escribe tu contraseña del Mac |
| El panel dice "error connecting to database" | Falta el paso 6. Revisa que exista `.env.local` con `ls -a` |
| `npm run dev` da error de puerto ocupado | Pega `npx kill-port 3000` y repite |
| Cualquier otra cosa | Copia el texto del error y pégamelo en el chat |
