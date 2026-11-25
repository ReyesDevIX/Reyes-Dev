# Reyes-Dev

Soy **Ismael Reyes Pérez**, estudiante de 2.º de Desarrollo de Aplicaciones Web en Elda (Alicante). En este portfolio reúno mi formación, mi experiencia y los proyectos que estoy construyendo. El azul y los paisajes de montaña forman parte de su identidad visual.

[Cómo he construido Reyes-Dev](./COMO-TRABAJO.md) · [Mi CV en PDF](./public/CV-Ismael-Reyes.pdf)

## Qué puedes explorar

- **Relieve alpino interactivo.** Genero una malla de triángulos y la proyecto sobre un canvas. Puedes girar la montaña arrastrando o usando el deslizador con el teclado.
- **Parchís multijugador.** Es un juego web que desarrollo junto a un compañero. En la ficha explico su estado y las tecnologías que utilizamos. [Repositorio del juego](https://github.com/ReyesDevIX/Parchis)
- **Trayectoria.** En la portada presento mis estudios, experiencia y herramientas. La interfaz incluye tema claro y oscuro, navegación por teclado y animaciones que respetan la preferencia de movimiento reducido.

## Ejecutar en local

Uso Node.js 22.12 o posterior y npm. Desde una terminal:

```bash
git clone https://github.com/ReyesDevIX/Reyes-Dev.git
cd Reyes-Dev
npm ci
npm run dev
```

Abre la dirección que Vite indique como **Local**. Desde la portada puedes entrar en la ficha del juego. También puedes abrir directamente `/proyectos/parchis-multijugador`.

## Cómo está organizado

| Pieza | Decisión |
| --- | --- |
| [Contenido](./src/data/cv.ts) | Mantengo los datos públicos en un solo archivo. La tarjeta del proyecto y su ficha leen el mismo registro. |
| [Páginas](./src/pages) y [secciones](./src/sections) | Compongo la portada por secciones y uso React Router para que cada proyecto tenga una URL propia. |
| [Terreno](./src/components/terrain.ts) | Separo la geometría y la proyección del relieve de los controles de interacción. |
| [Animaciones](./src/components/MotionEnhancer.tsx) | Coordino con GSAP y ScrollTrigger la entrada de los títulos y las fichas del tablero. |
| [Estilos](./src/styles/global.css) | Comparto las variables de color entre temas y adapto la composición al ancho de pantalla. |

## Comprobaciones y despliegue

| Comando | Resultado |
| --- | --- |
| `npm run typecheck` | Comprueba los tipos de TypeScript. |
| `npm run build` | Comprueba los tipos y genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve la última compilación para revisarla en el navegador. |

El repositorio incluye la [configuración de Vercel](./vercel.json) con el comando de compilación, la carpeta de salida y la redirección necesaria para recargar las rutas internas.

## Dirección artística y validación

El rediseño utiliza la composición fotográfica *Cinema frame*, la paleta *Stone and blueprint* y Hanken Grotesk. La skill oficial está instalada en [.agents/skills/design-taste-frontend](./.agents/skills/design-taste-frontend/SKILL.md) y su revisión está fijada en `skills-lock.json`. La compilación importa el módulo de revelado fotográfico desde esa carpeta.

[Informe del rediseño](./.taste-skill/INFORME.md) · [Capturas originales](./.taste-skill/before/) · [Capturas finales](./.taste-skill/continuacion/)
