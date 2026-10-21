// PW Hero: inclinación sutil del navegador siguiendo el cursor (solo escritorio).
const visual = document.querySelector('[data-pw-hero-visual]');

if (visual) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (!reduce && finePointer) {
    let frame = null;

    visual.addEventListener('pointermove', (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        visual.style.setProperty('--mx', x.toFixed(3));
        visual.style.setProperty('--my', y.toFixed(3));
      });
    });

    visual.addEventListener('pointerleave', () => {
      visual.style.setProperty('--mx', '0');
      visual.style.setProperty('--my', '0');
    });
  }
}
