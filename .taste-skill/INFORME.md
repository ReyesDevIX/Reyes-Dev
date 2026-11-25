# Rediseño de Reyes Dev

## Dirección y contenido

La composición conserva la fotografía de montaña, la paleta piedra y azul, Hanken Grotesk, el tablero fijado en escritorio, el revelado fotográfico y el relieve 2D. La propuesta profesional y el acceso a proyectos quedan visibles desde la portada, incluido el formato de 320 × 640 px. El contacto reúne correo, CV, GitHub y YouTube.

La ficha del Parchís describe la necesidad, la interfaz, el papel de Ismael y el estado del prototipo. El repositorio del juego contiene un cliente para explorar acceso y sala con jugadores simulados. La arquitectura prevista separa cliente, servidor y reglas. Reyes Dev se presenta como segundo caso de estudio con el relieve que se puede probar en la propia página. El trabajo en Joseda Education y en Vinalopó Parques Infantiles figura en Trayectoria con el alcance documentado.

- [Repositorio del Parchís](https://github.com/ReyesDevIX/Parchis)
- [Código del cliente del Parchís](https://github.com/ReyesDevIX/Parchis/blob/main/parchis-online/packages/cliente/src/main.js)
- [Skill oficial instalada](../.agents/skills/design-taste-frontend/SKILL.md). Versión 2.5.1, fijada en `skills-lock.json`. Esta continuación reutiliza la instalación y las dependencias de la fase anterior.

## Comprobaciones

- **Compilación.** `npm run typecheck` y `npm run build` ejecutados con Node 24.16.0. El proyecto no define scripts de lint ni de tests automatizados.
- **Navegador.** Chrome sobre los archivos de producción con la política de Vercel. Pruebas a 320, 390, 768, 1024 y 1440 px, sin desbordamiento ni errores de consola. Se comprobó el enlace de salto, el foco y Escape en el menú móvil, el control y restablecimiento del relieve, la descarga del PDF, el destino de correo, la recarga de la ficha, la navegación hacia atrás y el cambio de tamaño de una escena fijada a una composición sin fijar. [Registro de Chrome](./continuacion/browser.txt)
- **Movimiento.** Tres transformaciones distintas al inicio, a mitad y al final del tablero. Con movimiento reducido, el tablero permanece en el flujo y los contenidos son visibles. [Inicio](./continuacion/parchis-inicio.png) · [Mitad](./continuacion/parchis-medio.png) · [Final](./continuacion/parchis-fin.png)
- **Rendimiento.** Taste Perf registró cero fallos y avisos. Fueron mediciones locales, sin datos de campo. [Salida de Taste Perf](./continuacion/perf-final.txt)
- **Texto.** Taste Copy Lint registró cero fallos y avisos sobre el HTML generado por React. [Salida de Copy Lint](./continuacion/copy.txt)

Los seis destinos públicos de proyectos, trayectoria y redes devolvieron HTTP 200. El enlace de correo apunta al buzón del portfolio.

## Cómo interpretar los hallazgos de Taste

- **Errores técnicos.** Las pruebas de navegación, descarga y ejecución no detectaron errores de JavaScript. La preview sí requiere autenticación de Vercel.
- **Usabilidad.** La revisión visual inicial colocaba la acción principal por debajo del primer pliegue a 320 px. Se acortó el encuadre en pantallas estrechas y Chrome volvió a comprobar que el botón entra completo. La comprobación de consistencia también señaló el contraste de 6,22:1 en el cierre frente al umbral 7:1 de Taste. Se oscureció el azul y se verificó un contraste de 7,65:1 en la compilación final.
- **Composición.** Las herramientas siguen señalando alturas que no son múltiplos del viewport, bordes de columnas asimétricas y secciones vecinas que aparecen en un mismo encuadre. La revisión en navegador comprobó el recorrido y el acceso al contenido en los cinco tamaños. [Comprobación de composición](./continuacion/layout.txt) · [Consistencia](./continuacion/consistency.txt)
- **Decisiones creativas.** Se conservan la fijación del tablero, su transformación al desplazar y el revelado del retrato. El validador aplica reglas de páginas de servicios que marcan ese movimiento como fallo. El gate de la fase anterior quedó abierto con 52 hallazgos. En esta continuación, la primera ronda marcó 56 y la segunda 55, con 22 avisos. El gate sigue sin aprobar. No se aplicaron exenciones. [Primera ronda](./continuacion/gate.txt) · [Segunda ronda](./continuacion/gate-final.txt)

## Capturas y publicación

- **Antes:** [Portada original publicada en escritorio](./before/vercel-1440.png) · [Compilación original en móvil](./before/original-390.png).
- **Después:** [Escritorio](./continuacion/completa-1440.png) · [1024 px](./continuacion/completa-1024.png) · [768 px](./continuacion/completa-768.png) · [390 px](./continuacion/completa-390.png) · [320 px](./continuacion/completa-320.png) · [Ficha de Parchís](./continuacion/ficha-parchis.png).
- **GitHub y Vercel:** [PR #1](https://github.com/ReyesDevIX/Reyes-Dev/pull/1) · [Preview de Vercel](https://reyes-dev-git-feat-taste-portfolio-redesign-ireyes-dev.vercel.app). Vercel confirmó el despliegue de preview. Chrome recibió una redirección a la pantalla de inicio de sesión al abrir la portada, la ficha y el PDF.
