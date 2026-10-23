// IA Hero: la conversación decorativa solo se anima cuando el hero está en pantalla.
const visual = document.querySelector('[data-ia-hero-visual]');

if (visual && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(([entry]) => {
    visual.classList.toggle('is-paused', !entry.isIntersecting);
  });
  io.observe(visual);
}
