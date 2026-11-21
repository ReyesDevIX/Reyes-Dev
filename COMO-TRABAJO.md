# Cómo he construido Reyes-Dev

Soy Ismael Reyes Pérez y estudio 2.º de Desarrollo de Aplicaciones Web. Quería que alguien que visitase mi portfolio pudiera hacer tres cosas enseguida: conocer qué estoy aprendiendo, ver un proyecto real y descargar mi currículum. Elegí el azul y las montañas porque me gustan los paisajes y quería que la web tuviera algo mío desde la portada.

## Del portfolio anterior a Reyes-Dev

Empecé revisando qué merecía conservar de mi portfolio anterior. Aproveché mi retrato y los datos de formación, experiencia y proyectos. Después rehíce la interfaz en una carpeta independiente. Así pude probar decisiones de diseño y volver a consultar el original durante el desarrollo.

Organicé la portada en secciones que se recorren haciendo scroll. Para el Parchís multijugador, que desarrollo junto a un compañero, preparé una página propia. Desde ella se puede visitar el repositorio del juego. En la tarjeta y en la ficha indico que sigue en desarrollo.

## Cómo organizo el código

Uso React con TypeScript y Vite. Guardo los datos públicos en `src/data/cv.ts` y los componentes que los presentan en `src/sections` y `src/components`. Por ejemplo, cuando actualizo las tecnologías del Parchís, edito una sola lista. La tarjeta de la portada y la página del proyecto leen el mismo registro.

Uso React Router para que la ficha tenga una dirección que pueda compartir directamente. Configuré Vercel para que al recargar esa dirección se abra la aplicación. Mantengo el currículum público como un PDF independiente y lo preparo sin mi número de teléfono.

## Cómo resolví la montaña y las animaciones

La portada empezó con una imagen de montaña. Al verla, preferí que el visitante pudiera explorar el relieve. En `terrain.ts` genero una malla de triángulos, calculo la altura de sus vértices y doy a cada cara un tono según su orientación y altura. Después proyecto esas caras sobre un canvas. Distingo la nieve, la roca y las zonas bajas con el color.

Separé el cálculo del terreno de los controles. Puedo girar el macizo arrastrando o usando un deslizador con el teclado. La geometría se genera al montar el componente y el dibujo se actualiza al girar o cambiar el tamaño. Así evito consumir recursos mientras la montaña está quieta.

Con GSAP y ScrollTrigger coordiné la entrada del nombre y la llegada de las fichas al tablero del Parchís. Para quienes prefieren reducir el movimiento, los contenidos se presentan sin esas animaciones. Uso variables CSS para que la selección de texto, el marco del retrato y los colores de la interfaz se adapten al tema claro u oscuro.

## Cómo trabajo y qué compruebo

Trabajo por cambios concretos. En este proyecto utilicé la IA como apoyo para analizar el código, implementar alternativas y depurar problemas. Yo marqué la dirección visual y fui ajustando el resultado según lo que veía: pedí más presencia en las animaciones, sustituí la fotografía por un relieve interactivo y cambié la descarga del CV a PDF.

Distingo entre compilar y comprobar lo que ve una persona. Cuando detecté problemas con los estilos, revisé cómo se cargaba la hoja CSS y si también se servía desde la ruta del Parchís. Para el CV comprobé tanto el tipo de archivo descargado como el contenido de la copia pública. Mi revisión visual incluye recorrer la portada en móvil, abrir la ficha directamente, cambiar de tema y llegar a los controles con el teclado.
