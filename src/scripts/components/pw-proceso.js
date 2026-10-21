// PW Proceso: revelado + línea de tiempo que se llena al hacer scroll.
import { reveal } from '../utils/reveal.js';

const section = document.querySelector('[data-pw-process]');

if (section) {
  reveal(section);

  const list = section.querySelector('[data-pw-process-list]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (list && !reduce) {
    let ticking = false;

    const update = () => {
      const rect = list.getBoundingClientRect();
      const viewMid = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (viewMid - rect.top) / rect.height));
      list.style.setProperty('--progress', progress.toFixed(3));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Solo escucha el scroll mientras la sección está cerca de la pantalla
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
    io.observe(list);
  }
}
