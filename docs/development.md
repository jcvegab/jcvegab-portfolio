# Desarrollo

## Instalacion

```bash
npm install
```

Requisitos:

- Node.js >= 24.0.0
- npm >= 11.0.0

## Comandos

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor local con Turbopack |
| `npm run build` | Build de Next.js y export estatico |
| `npm run lint` | Biome check sobre `src/` |
| `npm run format` | Formato Biome sobre `src/` |
| `npm run type-check` | TypeScript sin emitir archivos |
| `npm run test` | Vitest run |
| `npm run test:watch` | Vitest watch |
| `npm run test:coverage` | Vitest con coverage |

## Convenciones

- TypeScript en modo no estricto por configuracion actual del repositorio.
- Imports con alias `@/*` hacia `src/*`.
- Estilos en SCSS global. No Tailwind ni CSS modules.
- Biome controla formato y lint.
- Tests unitarios junto al codigo en carpetas `__tests__`.
- Componentes compartidos se exportan desde `src/components/index.ts`.
- Layouts se registran en `src/layouts/index.ts`.

## Validacion Antes De Commit

```bash
npm run lint
npm run type-check
npm run test
```

La misma secuencia corre en CI.

## Build Estatico

`npm run build` genera salida estatica en `out/` por `output: 'export'`.

Consideraciones:

- No agregar API routes ni dependencias de servidor.
- Usar imagenes compatibles con export estatico.
- Mantener `trailingSlash: true` para rutas generadas.
