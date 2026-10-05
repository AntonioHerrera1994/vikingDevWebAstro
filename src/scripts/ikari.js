

(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var visual = document.querySelector('.codice__visual');
  var copy   = document.querySelector('.codice__copy');

  if (!visual && !copy) return;

  if (noMotion) {
    if (visual) visual.classList.add('is-visible');
    if (copy)   copy.classList.add('is-visible');
    return;
  }

  var section = document.querySelector('.codice');
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