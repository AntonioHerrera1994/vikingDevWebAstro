(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ════════════════════════════════════════════════════════════
     1. ANIMACIONES DE ENTRADA
     ════════════════════════════════════════════════════════════ */

  /* ── CTA band ────────────────────────────────────────────── */
  var ctaInner = document.querySelector('.footer__cta-inner');

  if (ctaInner) {
    if (noMotion) {
      ctaInner.classList.add('is-visible');
    } else {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            ctaInner.classList.add('is-visible');
            obs.disconnect();
          }
        });
      }, { threshold: 0.3 }).observe(ctaInner);
    }
  }

  /* ── Brand + nav cols ────────────────────────────────────── */
  var footerCols = document.querySelectorAll('.footer__brand, .footer__nav');

  if (footerCols.length) {
    if (noMotion) {
      footerCols.forEach(function (col) { col.classList.add('is-visible'); });
    } else {
      var footerBody = document.querySelector('.footer__body');

      if (footerBody) {
        new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              footerCols.forEach(function (col) {
                col.classList.add('is-visible');
              });
              obs.disconnect();
            }
          });
        }, { threshold: 0.15 }).observe(footerBody);
      }
    }
  }

  /* ════════════════════════════════════════════════════════════
     2. SMOOTH SCROLL para links internos del footer
        (los navegadores modernos lo hacen con CSS scroll-smooth,
         pero esto es fallback para Safari y links con href="#id")
     ════════════════════════════════════════════════════════════ */
  var internalLinks = document.querySelectorAll(
    '.footer__nav-link[href^="#"], .footer__cta-btn[href^="#"]'
  );

  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      var target   = document.getElementById(targetId);

      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: noMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      /* Mover el foco al target para accesibilidad */
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    });
  });

})();