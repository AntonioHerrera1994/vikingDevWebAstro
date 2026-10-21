// AD Canales: revelado + inclinación 3D sutil de las tarjetas al pasar el cursor.
import { reveal } from '../utils/reveal.js';

const section = document.querySelector('[data-camp-ch]');

if (section) {
  reveal(section);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  if (!reduce && fine) {
    section.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--tx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        card.style.setProperty('--ty', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tx', '0');
        card.style.setProperty('--ty', '0');
      });
    });
  }
}
