# Diseño y movimiento en Reyes Dev

La frase «Diseño interfaces. Las convierto en código.» abre el portfolio. Le siguen un caso de producto, un caso de diseño del propio sitio, las competencias respaldadas por el trabajo y el contacto.

## Dirección visual

La exploración partió de tres composiciones: una pantalla de producto, una portada tipográfica y un catálogo de casos. La portada tipográfica funciona como presentación personal y el formato de catálogo organiza el trabajo. Hanken se sirve localmente. El blanco frío y el negro separan el perfil de la muestra de trabajo y el verde ácido se reserva para el signo, la acción principal del Parchís y el cierre. Las cuatro piezas del signo reaparecen en la portada, en el póster de Reyes Dev y en el contacto.

## Secuencia

1. Dos máscaras revelan el nombre. Las cuatro piezas del signo entran con un retardo breve. En escritorio, el nombre se contrae y el signo se desplaza ligeramente cuando se abandona la portada.
2. Parchís mantiene el texto y el enlace visibles mientras el tablero se endereza, gana escala y abre su máscara. El tramo fijado se activa en pantallas de al menos 960 × 680 y solo cuando la escena cabe.
3. El póster de Reyes Dev cambia de composición y su monograma se revela con una máscara lateral. El contacto cierra con un revelado vertical.
4. El menú, los botones y los iconos usan transiciones breves. En pantallas pequeñas los casos se apilan. Con movimiento reducido toda la página se muestra en su estado de reposo.

`useGSAP` acota los selectores al contenido principal. Los cambios de ruta o de media query revierten su contexto, los ScrollTriggers y los listeners registrados. El desplazamiento conserva el comportamiento nativo. El tablero es una ilustración del Parchís; la ficha explica el estado real del prototipo y enlaza a su código.
