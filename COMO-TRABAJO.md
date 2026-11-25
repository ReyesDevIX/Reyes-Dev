# Cómo está construido Reyes-Dev

## De la fotografía al relieve

La portada utiliza la fotografía de cumbre que ya estaba en el repositorio. El encuadre deja la cresta a la derecha y el nombre se asienta sobre un recorte de color piedra. En móvil la foto ocupa la parte superior y el nombre, la profesión y las acciones quedan debajo. El enlace «Explorar relieve» lleva a la maqueta que se podía manipular en la portada anterior.

Hanken Grotesk se sirve desde el mismo dominio. El archivo WebP para pantallas pequeñas pesa 30 402 bytes. La versión grande pesa 166 030 bytes. El retrato utiliza su propia imagen WebP de 20 006 bytes.

## Proyecto y trayectoria

La portada y la ficha de Parchís leen la misma entrada de `src/data/cv.ts`. El tablero es una ilustración del proyecto en desarrollo. Su ficha contiene las decisiones de arquitectura, las tecnologías y el enlace al repositorio. En la portada, la biografía y las herramientas acompañan al retrato. Los detalles desplegables reúnen la experiencia, los idiomas y la formación complementaria.

## Movimiento y controles

`MotionEnhancer.tsx` coordina la máscara del nombre, el encuadre de la fotografía y la secuencia del tablero mediante GSAP y ScrollTrigger. El tablero se fija durante una fracción de pantalla cuando hay espacio suficiente. En pantallas estrechas o bajas se lee como una composición vertical. El retrato incorpora el módulo oficial `picture-develops` de Taste. El título de contacto se descubre al aproximarse a la sección.

`useGSAP` y `matchMedia` limpian las animaciones al cambiar de ruta o de preferencia. Con movimiento reducido se muestran directamente las composiciones finales. El desplazamiento es nativo. El relieve responde al arrastre, a las flechas del teclado en el deslizador y al botón de restablecimiento. Su canvas 2D se redibuja al cambiar el tamaño o la orientación.

## Compilación y revisión

React Router resuelve la portada, la ficha y las rutas desconocidas. Vercel sirve la aplicación desde `dist/` y redirige las rutas internas al documento de entrada. Las políticas de seguridad, el PDF público y las direcciones de los proyectos se mantienen en el repositorio.

Ejecuta `npm ci`, `npm run typecheck` y `npm run build`. Con `npm run preview` puedes recorrer el resultado compilado. La rama incluye el informe de validación y las capturas en [.taste-skill](./.taste-skill/).

## Presentación profesional

La portada empieza con la propuesta de trabajo y enlaza a los casos y al contacto. La ficha de Parchís cubre la necesidad, la interfaz, la colaboración técnica y el punto en el que se encuentra el prototipo. El propio Reyes Dev sirve como segundo caso con código público y el relieve se puede probar desde la página. En Joseda Education y Vinalopó Parques Infantiles, la responsabilidad y el trabajo realizado se explican en Trayectoria.
