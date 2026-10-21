// HL Industrias: pestañas accesibles (clic, flechas, Inicio/Fin) + revelado.
import { reveal } from '../utils/reveal.js';

const section = document.querySelector('[data-hl-ind]');

if (section) {
  reveal(section);

  const tabs = Array.from(section.querySelectorAll('[role="tab"]'));

  const select = (tab, focus = false) => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const keys = {
        ArrowRight: (i + 1) % tabs.length,
        ArrowLeft: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      select(tabs[keys[e.key]], true);
    });
  });
}
