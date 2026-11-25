# Reyes Dev

Portfolio de Ismael Reyes Pérez, estudiante de Desarrollo de Aplicaciones Web en Alicante. Reúne mi trabajo de diseño de interfaces y desarrollo frontend, mi trayectoria y mi CV.

- [Portfolio](https://reyes-dev.vercel.app/) y [CV en PDF](./public/CV-Ismael-Reyes.pdf)
- [Decisiones de diseño y motion](./COMO-TRABAJO.md)
- [Pruebas y capturas del rediseño experimental](./.taste-skill/EXPERIMENTAL.md)

## Desarrollo local

Requiere Node.js 22.12+ y npm.

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

React Router sirve la portada y la ficha de Parchís. Vite genera los archivos en `dist/` y [Vercel](./vercel.json) resuelve los enlaces directos a las rutas. El HTML inicial conserva el perfil y las acciones básicas durante la carga de JavaScript.

La identidad y los componentes viven en `src/`. Los contenidos de la ficha de Parchís comparten el registro de `src/data/cv.ts`. La escena editorial se controla en `src/components/MotionEnhancer.tsx`.
