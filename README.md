# OS2

Escritorio educativo para segundo de primaria.

- Normal: 20 misiones de mouse, imágenes, carpetas, notas y una diapositiva.
- Avanzado: 30 misiones de organización, copiar y cortar, frases cortas y tres diapositivas.
- Barra de tareas, menú Inicio, globitos con instrucciones, tolerancia ortográfica y reinicio por modo.

Las actividades y los archivos se simulan en el navegador. Al recargar se inicia una partida nueva.


## Puntos - Segundo

Acceso de un clic desde el escritorio a `actividades/puntos/`. Adaptación del juego de OS1, con los diez dibujos originales y 265 puntos en total. La dificultad adicional está en las series numéricas y el uso de los botones, manteniendo los contornos conocidos:

- Dibujos 1-2: números consecutivos (1, 2, 3...), botón izquierdo.
- Dibujos 3-4: impares (1, 3, 5...), botón derecho.
- Dibujos 5-7: de tres en tres (3, 6, 9...), alternando izquierdo y derecho.
- Dibujos 8-10: de cuatro en cuatro (4, 8, 12...), alternando izquierdo y derecho.

El mouse guía se ve desde el primer punto y en todos los dibujos y modos. El botón que deben pulsar se ilumina con su LED: verde a la izquierda y morado a la derecha. El texto también identifica el botón, sin depender solo del color. La guía cambia después de cada punto correcto. Los errores de número o de botón no avanzan el dibujo; no hay temporizador.

Mantiene los modos Explorador (ayuda visual), Investigador y Experto. El sonido empieza apagado. Teclado: Enter o espacio para izquierdo, Mayús+Enter o Mayús+espacio para derecho. El progreso usa `os2-puntos-v1`, separado del juego de OS1. Se conserva por navegador; no hay sincronización escolar. El evento `os2-puntos:completed` incluye serie, números inicial/final, intentos y errores de la partida.

Pruebas: `node tests/puntos.cjs` comprueba los 265 puntos, series, LED, ambos botones, alternancia, teclado, errores sin avance, desbloqueos, reinicio y almacenamiento independiente.
