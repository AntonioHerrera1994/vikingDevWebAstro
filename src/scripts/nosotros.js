const slide = document.querySelector('.slide');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
let posicionActual = 0;
const anchoElemento = 150; // Ancho de cada elemento

btnSiguiente.addEventListener('click', () => {
  posicionActual -= anchoElemento; 
  slide.style.transform = `translateX(${posicionActual}px)`;

  // Reinicia la posición al llegar al final
  if (posicionActual < -(anchoElemento * (slide.children.length - 2))) { 
    posicionActual = 0; 
  }
});

btnAnterior.addEventListener('click', () => {
  posicionActual += anchoElemento;
  slide.style.transform = `translateX(${posicionActual}px)`;

  // Vuelve al final al llegar al inicio
  if (posicionActual > 0) {
    posicionActual = -(anchoElemento * (slide.children.length - 2));
  }
});