// HL Automatización: revelado + los nodos del flujo se "encienden" uno tras otro.
import { reveal } from '../utils/reveal.js';

const section = document.querySelector('[data-hl-flow]');

if (section) {
  reveal(section);

  const list = section.querySelector('[data-hl-flow-nodes]');
  const nodes = list ? Array.from(list.children) : [];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (nodes.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-active'));
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          nodes.forEach((node, i) => {
            setTimeout(() => node.classList.add('is-active'), i * 450);
          });
        },
        { threshold: 0.35 }
      );
      io.observe(list);
    }
  }
}
