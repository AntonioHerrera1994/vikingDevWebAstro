// Revela con animación los elementos [data-reveal] dentro de `root`.
//
// Seguro ante bloqueadores: el CSS solo oculta [data-reveal] cuando <html> tiene
// la clase "reveal-ready", y esa clase la pone este script. Si el script no carga
// (bloqueador de anuncios, error de red), el contenido se ve normal, sin animación.
//
// Uso: import { reveal } from '../utils/reveal.js'; reveal(document.querySelector('.mi-seccion'));
export function reveal(root, { threshold = 0.15 } = {}) {
  if (!root) return;
  const items = Array.from(root.querySelectorAll('[data-reveal]'));
  if (!items.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Lo que ya está en pantalla se muestra de inmediato (evita parpadeo al cargar)
  const vh = window.innerHeight;
  items.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) el.classList.add('is-visible');
  });

  document.documentElement.classList.add('reveal-ready');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { threshold, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el, i) => {
    if (el.classList.contains('is-visible')) return;
    el.style.setProperty('--reveal-delay', `${(i % 4) * 80}ms`);
    io.observe(el);
  });
}
