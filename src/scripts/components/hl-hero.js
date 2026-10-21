// HL Hero: pausa las animaciones del pipeline cuando no está en pantalla (ahorra batería y CPU)
// y activa la preselección del cotizador para el botón "Solicita una demo".
import '../utils/quoter-select.js';

const visual = document.querySelector('[data-hl-hero-visual]');

if (visual && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(([entry]) => {
    visual.classList.toggle('is-paused', !entry.isIntersecting);
  });
  io.observe(visual);

  document.addEventListener('visibilitychange', () => {
    visual.classList.toggle('is-paused', document.hidden);
  });
}
