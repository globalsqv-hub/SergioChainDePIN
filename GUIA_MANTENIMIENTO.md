# SergioChain DePIN - Guía de Mantenimiento

Esta guía explica cómo modificar el escaparate de **SergioChain DePIN**.

## 1. Modificar Textos e Imágenes de Proyectos

Los datos de los proyectos y las oportunidades de ganancias se encuentran en el archivo:
`server/storage.ts`

### Añadir o Modificar Proyectos
Busca la función `seedData()` dentro de `server/storage.ts`. Verás un array llamado `demoProjects`.

Cada proyecto tiene este formato:
```typescript 
{
  name: "Nombre del Proyecto",
  slug: "nombre-unico",
  description: "Breve descripción en español.",
  category: "Categoría (Wireless, Storage, etc.)",
  chain: "Red (Solana, Ethereum, etc.)",
  token: "TICKER",
  marketCap: "$100M",
  imageUrl: "URL de la imagen",
  featured: true, // true para que aparezca destacado
  referralUrl: "https://..." // opcional: enlace de afiliado/referido
}
```

**Importante:** Si modificas el esquema de la base de datos (p. ej. nuevas columnas en `shared/schema.ts`), ejecuta `npm run db:push` para aplicar los cambios.

### Modificar Oportunidades de Ganancia
En el mismo archivo, verás el array `demoEarn`. Cada oportunidad tiene este formato:
```typescript
{
  projectName: "Nombre del Proyecto",
  category: "Categoría",
  type: "Tipo (Hardware, App, etc.)",
  estimatedEarnings: "$X / día",
  hardwareCost: "$X",
  roi: "X días",
  difficulty: "Low / Medium / High"
}
```

## 2. Cambiar Imágenes Estáticas (Logo y Fondo)

Las imágenes principales están en la carpeta `attached_assets` y se importan en el frontend. 

- **Logo:** `attached_assets/logo.svg` (importado en `Navbar.tsx`)
- **Fondo:** `attached_assets/fondo.svg` (usado en `client/src/index.css`)

Reemplaza esos archivos por tus propias imágenes. Puedes usar `.svg` o `.jpg`; si cambias la extensión, actualiza la ruta en el código.

## 3. Estilos y Colores
El tema "Cyberpunk" se define en `client/src/index.css` y las variables de color en `tailwind.config.ts`. Los colores principales son:
- **Cian Neón:** `#00f0ff` (Primario)
- **Verde Neón:** `#00ff9d` (Secundario)
- **Azul SergioChain:** Se aplica mediante clases de Tailwind (ej. `text-blue-500`).
