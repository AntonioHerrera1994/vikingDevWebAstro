// AD Inversión: calculadora de gestión + presupuesto publicitario.
// "Cotizar con este presupuesto" marca en el cotizador la gestión elegida.
import { reveal } from '../utils/reveal.js';
import '../utils/quoter-select.js';

const section = document.querySelector('[data-camp-inv]');

if (section) {
  reveal(section);

  const form = section.querySelector('[data-camp-inv-calc]');
  const range = form.querySelector('input[type="range"]');
  const radios = Array.from(form.querySelectorAll('input[name="camp-plan"]'));
  const out = {
    budget: form.querySelector('[data-out-budget]'),
    fee: form.querySelector('[data-out-fee]'),
    ads: form.querySelector('[data-out-ads]'),
    total: form.querySelector('[data-out-total]'),
    barFee: form.querySelector('[data-bar-fee]'),
    barBudget: form.querySelector('[data-bar-budget]'),
  };
  const cta = form.querySelector('.camp-inv__cta');

  const mxn = (n) => `$${n.toLocaleString('es-MX')}`;

  const update = () => {
    const budget = Number(range.value);
    const selected = radios.find((r) => r.checked) || radios[0];
    const fee = Number(selected.value);
    const total = fee + budget;

    const min = Number(range.min);
    const max = Number(range.max);
    range.style.setProperty('--fill', `${((budget - min) / (max - min)) * 100}%`);

    out.budget.textContent = mxn(budget);
    out.fee.textContent = mxn(fee);
    out.ads.textContent = mxn(budget);
    out.total.textContent = `${mxn(total)} MXN`;
    out.barFee.style.flexBasis = `${(fee / total) * 100}%`;
    out.barBudget.style.flexBasis = `${(budget / total) * 100}%`;

    cta.dataset.quoterSelect = selected.dataset.quoter; // data-label del checkbox en el cotizador
  };

  range.addEventListener('input', update);
  radios.forEach((r) => r.addEventListener('change', update));
  form.addEventListener('submit', (e) => e.preventDefault());
  update();
}
