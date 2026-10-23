
import { reveal } from '../utils/reveal.js';
import '../utils/quoter-select.js';

const section = document.querySelector('[data-ia-plans]');

if (section) {
  reveal(section);

  const buttons = Array.from(section.querySelectorAll('[data-period]'));
  const notes = section.querySelectorAll('[data-annual-note]');

  // Anual = 10 meses (2 meses gratis). Mostramos el equivalente mensual y el total anual.
  const prices = Array.from(section.querySelectorAll('[data-monthly]'));
  const mxn = (n) => `$${Math.round(n).toLocaleString('es-MX')}`;

  const setPeriod = (period) => {
    const annual = period === 'anual';
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.period === period)));
    prices.forEach((el) => {
      const monthly = Number(el.dataset.monthly);
      el.textContent = annual ? mxn((monthly * 10) / 12) : mxn(monthly);
    });
    notes.forEach((n) => (n.hidden = !annual));
  };

  buttons.forEach((b) => b.addEventListener('click', () => setPeriod(b.dataset.period)));
}
