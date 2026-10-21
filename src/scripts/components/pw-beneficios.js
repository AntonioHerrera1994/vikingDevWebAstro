// PW Beneficios: revelado al hacer scroll + spotlight que sigue al cursor.
import { reveal } from '../utils/reveal.js';

const section = document.querySelector('[data-pw-benefits]');

if (section) {
  reveal(section);

  if (window.matchMedia('(pointer: fine)').matches) {
    section.querySelectorAll('[data-spotlight]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
      });
    });
  }
}
