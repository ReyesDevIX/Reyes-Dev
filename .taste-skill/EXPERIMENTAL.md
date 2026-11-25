# Rediseño experimental de Reyes Dev

## Dirección y contenido

Portada tipográfica de blanco frío, tinta negra y verde ácido. El nombre se revela por palabras y un signo geométrico de cuatro piezas entra con un compás propio. En escritorio, la salida de la portada desplaza el signo y contrae el nombre. El tramo fijado del Parchís cambia el recorte, el giro y la escala del tablero. El póster de Reyes Dev se descubre con un corte lateral y el contacto con un revelado vertical. El tablero es una ilustración editorial del proyecto. La ficha y el repositorio explican el alcance del prototipo.

Se retiraron las fotos de paisaje, el canvas y su código, el control de giro y los iconos y metadatos asociados. La identidad usa una única paleta en esta versión. Se mantienen el retrato, el CV, los casos, la formación y los canales de contacto.

## Skills aplicadas

- [Taste Skill](../.agents/skills/design-taste-frontend/SKILL.md) generó opciones de composición y guio la revisión de copia, composición y rendimiento.
- [GSAP React](../.agents/skills/gsap-react/SKILL.md), [ScrollTrigger](../.agents/skills/gsap-scrolltrigger/SKILL.md) y [Timeline](../.agents/skills/gsap-timeline/SKILL.md) orientaron el alcance, la limpieza, las pausas y la secuencia. El repositorio oficial aportó ocho skills.
- [Motion Design de LottieFiles](../.agents/skills/motion-design/SKILL.md) guio el ritmo de entradas, menús e iconos. El instalador mostró la etiqueta «Critical Risk» de Snyk. Se usaron las pautas de coreografía en Markdown; no se ejecutaron comandos sugeridos por esa skill ni se añadió runtime de Lottie.
- [Creative Direction](../.agents/skills/creative-direction/SKILL.md), [Kinetic Typography](../.agents/skills/kinetic-typography/SKILL.md) y [Transitions](../.agents/skills/transitions/SKILL.md) guiaron la secuencia visual, las máscaras de palabras y los cambios de composición.

Las doce skills nuevas se instalaron en `.agents/skills` con el agente `codex` y figuran en `skills-lock.json`. En esta sesión se leyeron sus archivos directamente. Abre una nueva sesión de Codex en el repositorio si el selector aún no muestra las incorporaciones. React, Vite, GSAP y la configuración de Vercel se mantienen. Las pruebas de navegador usaron herramientas temporales fuera del proyecto.

## Verificación

- `npm run typecheck` y `npm run build` pasaron con Node 24.16.0. El proyecto no incluye scripts de lint ni de test.
- Chrome probó la salida de producción en 320, 390, 768, 1024 y 1440 px. Se comprobó foco del enlace de salto, apertura y Escape del menú con teclado, el CTA en la primera pantalla, recarga de la ficha, retorno a proyectos, descarga real del PDF y dirección de correo. El tramo fijado se desmonta y se vuelve a montar al redimensionar. El tablero produjo tres transformaciones distintas. Los cinco anchos quedaron sin desbordamiento y la pasada completa no registró errores de consola. La portada básica también funcionó con JavaScript desactivado. [Registro de Chrome](./experimental/browser.txt)
- Los seis destinos externos de GitHub, YouTube y Trayectoria devolvieron HTTP 200.
- [Taste Copy](./experimental/copy.txt) analiza el HTML renderizado. [Taste Perf](./experimental/perf.txt) mide la compilación local, no datos de campo. [Taste Layout](./experimental/layout.txt) conserva observaciones sobre alturas de sección, bordes asimétricos y aparición de secciones contiguas. Se ajustó la altura del arte a 320 px. La composición mantiene secciones de altura variable y deja asomar Proyectos en pantallas móviles altas.

## Capturas

- [Fase anterior](./continuacion/completa-1440.png)
- [Escritorio](./experimental/completa-1440.png) y [móvil](./experimental/completa-390.png)
- Parchís al [inicio](./experimental/parchis-inicio.png), [a mitad](./experimental/parchis-mitad.png) y [al final](./experimental/parchis-final.png)
- [Transición al caso Reyes Dev](./experimental/transicion-reyes.png)

## Publicación

[PR #2](https://github.com/ReyesDevIX/Reyes-Dev/pull/2) · [Preview de Vercel](https://reyes-dev-git-feat-experimental-motion-redesign-ireyes-dev.vercel.app). GitHub confirmó el despliegue previo. Chrome obtuvo una redirección al inicio de sesión de Vercel al abrir la portada, la ficha y el PDF. Las pruebas funcionales completas corresponden a la compilación local.
