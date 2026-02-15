# Requisitos para lanzar (checklist)

Para los pasos a seguir, usa **[EMPIEZA_AQUI.md](./EMPIEZA_AQUI.md)**.

---

## Antes del primer lanzamiento

- [ ] **Node.js** instalado (desde https://nodejs.org, marcando "Add to PATH").
- [ ] Si la app usa **base de datos**: tener PostgreSQL y un archivo **`.env`** en la raíz con la línea que te hayan dado (ej. `DATABASE_URL=postgresql://...`). Luego, una vez, en la terminal: `npm run db:push`.

Con eso basta para hacer doble clic en **ABRIR_PAGINA.bat** y abrir http://localhost:5000 en el navegador.

---

## Comandos útiles (por si los necesitas)

| Qué quieres hacer | Comando (en la terminal, en la carpeta del proyecto) |
|-------------------|------------------------------------------------------|
| Instalar dependencias | `npm run instalar` |
| Abrir la página en tu PC | `npm run lanzar` (o doble clic en **ABRIR_PAGINA.bat**) |
| Compilar y ejecutar en modo producción | `npm run compilar-y-lanzar` |

Si algo falla, en **EMPIEZA_AQUI.md** hay una sección "Si algo no funciona".
