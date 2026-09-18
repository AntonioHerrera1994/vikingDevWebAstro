(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var section  = document.querySelector('.pricing');
  var header   = document.querySelector('.pricing__header');
  var blocks   = document.querySelectorAll('.pricing__block');

  if (!section) return;

  function reveal() {
    if (header) header.classList.add('is-visible');
    blocks.forEach(function (block) {
      block.classList.add('is-visible');
    });
  }

  if (noMotion) {
    reveal();
  } else {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { reveal(); obs.disconnect(); }
      });
    }, { threshold: 0.08 }).observe(section);
  }

  /* ════════════════════════════════════════════════════════════
     QUICK NAV — muestra solo el bloque seleccionado, oculta el resto
     ════════════════════════════════════════════════════════════ */
  var navBtns = Array.from(document.querySelectorAll('.pricing__quicknav-btn'));
  var navTargets = navBtns.map(function (btn) {
    return document.getElementById(btn.dataset.target);
  });

  function activateNav(index) {
    navBtns.forEach(function (btn, i) {
      var isActive = i === index;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    navTargets.forEach(function (target, i) {
      if (!target) return;
      if (i === index) {
        target.removeAttribute('hidden');
      } else {
        target.setAttribute('hidden', '');
      }
    });

    /* Llevar la vista al inicio del bloque activo */
    if (navTargets[index]) {
      navTargets[index].scrollIntoView({ behavior: noMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  if (navBtns.length) {
    /* Estado inicial: solo el primer bloque visible */
    navTargets.forEach(function (target, i) {
      if (target && i !== 0) target.setAttribute('hidden', '');
    });

    navBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function () { activateNav(i); });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          var next = (i + 1) % navBtns.length;
          activateNav(next);
          navBtns[next].focus();
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          var prev = (i - 1 + navBtns.length) % navBtns.length;
          activateNav(prev);
          navBtns[prev].focus();
        }
      });
    });
  }

})();