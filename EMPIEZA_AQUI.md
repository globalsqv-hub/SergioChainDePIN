# Empieza aquí – Guía sencilla

Todo lo que necesitas hacer, sin conocimientos de programación.

---

## 1. Ver la página en tu ordenador

**Opción más fácil:** haz **doble clic** en el archivo:

**`ABRIR_PAGINA.bat`**

(Está en la carpeta del proyecto, junto a este archivo.)

- Se abrirá una ventana negra: es normal. Espera a que diga algo como *"serving on port 5000"*.
- Luego abre tu navegador (Chrome, Edge, etc.) y escribe en la barra de direcciones:  
  **http://localhost:5000**  
- Verás la página. Para cerrarla, cierra la ventana negra.

**Si no tienes Node.js instalado:** la ventana te avisará. Entra en **https://nodejs.org**, descarga la versión recomendada, instala (marca "Add to PATH" si te lo pregunta) y vuelve a hacer doble clic en `ABRIR_PAGINA.bat`.

---

## 2. Subir tus cambios a GitHub

Cuando hayas modificado algo y quieras guardarlo en GitHub:

1. Abre la **terminal** (o **Símbolo del sistema**) en la carpeta del proyecto.  
   *(En Cursor: menú Terminal → Nueva terminal.)*

2. Escribe estos tres comandos **uno detrás de otro** (pulsa Enter después de cada uno):

   ```
   git add .
   ```
   *(Añade todos los cambios.)*

   ```
   git commit -m "Mis cambios"
   ```
   *(Puedes cambiar "Mis cambios" por una frase corta que describa lo que hiciste.)*

   ```
   git push origin main
   ```
   *(Sube todo a GitHub. Si te pide usuario y contraseña, usa tu cuenta de GitHub.)*

   Si tu rama se llama **master** en lugar de **main**, usa en el último comando:  
   `git push origin master`

Con eso ya estarán tus cambios en GitHub.

---

## 3. Poner la web en internet (Vercel)

Para que cualquiera pueda entrar a tu página con un enlace (por ejemplo `https://tu-proyecto.vercel.app`):

1. Entra en **https://vercel.com** e inicia sesión (con tu cuenta de **GitHub**).

2. Pulsa **"Add New"** → **"Project"**.

3. Elige el **repositorio** de tu proyecto (el que tiene esta web). Si no aparece, conecta primero tu cuenta de GitHub con Vercel.

4. Pulsa **"Deploy"** (o "Implementar"). No hace falta cambiar opciones; Vercel usará la configuración del proyecto.

5. Espera unos minutos. Al terminar te dará un **enlace** (por ejemplo `https://web-vista-doble.vercel.app`). Ese es el enlace público de tu página.

**Si la página usa base de datos:** en el proyecto de Vercel ve a **Settings** → **Environment Variables** y añade las variables que te hayan indicado (por ejemplo `DATABASE_URL`). Luego haz un nuevo **Redeploy** desde la pestaña "Deployments".

Cada vez que subas cambios a GitHub (paso 2), Vercel puede **actualizar solo** la web; en la configuración del proyecto puedes activar "Deploy when you push to GitHub".

---

## Si algo no funciona

| Problema | Qué hacer |
|----------|-----------|
| "npm no se reconoce" o "node no se reconoce" | Instala Node.js desde https://nodejs.org (y marca "Add to PATH"). Reinicia el ordenador y prueba de nuevo. |
| La ventana del .bat se cierra enseguida | Abre la terminal en la carpeta del proyecto y escribe: `npm run instalar` y luego `npm run lanzar`. Así verás el mensaje de error. |
| "DATABASE_URL must be set" | La app necesita una base de datos. Crea un archivo `.env` en la carpeta del proyecto con la línea que te hayan dado (ej. `DATABASE_URL=postgresql://...`). |
| No veo mi página en Vercel | Comprueba que el repositorio está bien conectado y que el último "Deploy" ha terminado en verde. Revisa en "Deployments" si hay algún error. |

---

## Resumen en una frase

- **Ver la página en tu PC:** doble clic en **ABRIR_PAGINA.bat** y abre **http://localhost:5000** en el navegador.  
- **Subir a GitHub:** en la terminal: `git add .` → `git commit -m "Texto"` → `git push origin main`.  
- **Ponerla en internet:** en **vercel.com** → Add New Project → eliges el repo → Deploy.
