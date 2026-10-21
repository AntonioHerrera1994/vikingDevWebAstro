// HL Antes/Después: interruptor "Sin CRM / Con HighLevel" (móvil) + revelado.
import { reveal } from '../utils/reveal.js';

const section = document.querySelector('[data-hl-ba]');

if (section) {
  reveal(section);

  const buttons = section.querySelectorAll('[data-ba-set]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const state = btn.dataset.baSet;
      section.dataset.state = state;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    });
  });
}
