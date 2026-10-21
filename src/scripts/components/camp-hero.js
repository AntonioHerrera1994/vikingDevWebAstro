// AD Hero: pausa las animaciones del visual cuando no está en pantalla.
const visual = document.querySelector('[data-camp-hero-visual]');

if (visual && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(([entry]) => {
    visual.classList.toggle('is-paused', !entry.isIntersecting);
  });
  io.observe(visual);

  document.addEventListener('visibilitychange', () => {
    visual.classList.toggle('is-paused', document.hidden);
  });
}
