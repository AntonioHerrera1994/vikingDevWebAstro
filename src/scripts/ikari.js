/* ============================================================
   Ikari.js — VikingDev Redesign
   IntersectionObserver para animar .ikari__visual y .ikari__copy
   al entrar al viewport. Sin dependencias.
   ============================================================ */

(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var visual = document.querySelector('.ikari__visual');
  var copy   = document.querySelector('.ikari__copy');

  if (!visual && !copy) return;

  /* En reduced-motion mostramos todo de inmediato */
  if (noMotion) {
    if (visual) visual.classList.add('is-visible');
    if (copy)   copy.classList.add('is-visible');
    return;
  }

  /* Un solo observer para la sección completa */
  var section = document.querySelector('.ikari');
  if (!section) return;

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (visual) visual.classList.add('is-visible');
          if (copy)   copy.classList.add('is-visible');
          obs.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(section);
})();