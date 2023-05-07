let isDragging = false;
let dragStartY;
let ball = document.querySelector('#ball');

ball.addEventListener('mousedown', function(e) {
  isDragging = true;
  dragStartY = e.clientY;
});

document.addEventListener('mousemove', function(e) {
  if (isDragging) {
    // Calcular la cantidad de desplazamiento vertical
    let delta = dragStartY - e.clientY;

    // Limitar la posición de la bolita dentro de la barra
    let maxTop = document.querySelector('#bar').offsetHeight - ball.offsetHeight;
    let newTop = Math.min(Math.max(ball.offsetTop - delta, 0), maxTop);

    // Actualizar la posición de la bolita y el número
    ball.style.top = newTop + 'px';
    document.querySelector('#number').value = Math.round(5000 * (maxTop - newTop) / maxTop);
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});