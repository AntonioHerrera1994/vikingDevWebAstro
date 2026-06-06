/* ============================================================
   Partners.js — VikingDev Redesign
   IntersectionObserver para la animación de entrada.
   Sin dependencias externas.
   ============================================================ */

(function () {
  'use strict';

  const section = document.querySelector('.partners');
  if (!section) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    section.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
})();