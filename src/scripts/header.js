

(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Config ─────────────────────────────────────────────── */
  var CARD_STAGGER   = 180;  // ms entre el inicio de cada card
  var DRAW_DURATION  = 800;  // ms para trazar todos los paths de una card
  var PATH_STAGGER   = 60;   // ms entre cada path dentro de una card
  var FILL_DELAY     = 200;  // ms después del último path para mostrar fill
  var LABEL_DELAY    = 100;  // ms después del fill para el label

  /* ─── Elementos ──────────────────────────────────────────── */
  var cards = document.querySelectorAll('.hero__illus-card');

  if (!cards.length) return;

  /* ─── Reduced motion: mostrar todo sin animación ─────────── */
  if (noMotion) {
    cards.forEach(function (card) {
      card.classList.add('is-ready', 'fill-visible', 'label-visible');
      var strokeSVG = card.querySelector('.hero__svg--stroke');
      if (strokeSVG) {
        var paths = strokeSVG.querySelectorAll('path, line, rect, circle, polyline, polygon');
        paths.forEach(function (p) {
          p.style.strokeDasharray = 'none';
          p.style.strokeDashoffset = '0';
        });
      }
    });
    return;
  }

  /* ─── Parallax del blob ──────────────────────────────────── */
  var blob = document.querySelector('.hero__blob');
  if (blob) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          blob.style.transform = 'translateY(' + window.scrollY * 0.25 + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── 3D tilt en hover de cada card ─────────────────────── */
  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var xPct = (e.clientX - rect.left) / rect.width  - 0.5;
      var yPct = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform =
        'translateY(-6px) perspective(600px) rotateX(' + (yPct * -5) + 'deg) rotateY(' + (xPct * 5) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ══════════════════════════════════════════════════════════
     FUNCIÓN PRINCIPAL: animar una card
     ══════════════════════════════════════════════════════════ */
  function animateCard(card, cardIndex) {

    var strokeSVG = card.querySelector('.hero__svg--stroke');
    if (!strokeSVG) return;

    var paths = Array.from(
      strokeSVG.querySelectorAll('path, line, rect, circle, polyline, polygon')
    );

    /* 1. Hacer visible la card */
    card.classList.add('is-ready');

    /* 2. Calcular longitudes y preparar cada path */
    paths.forEach(function (el) {
      var len;
      try {
        len = el.getTotalLength ? el.getTotalLength() : 300;
      } catch (e) {
        len = 300;
      }
      /* Redondear hacia arriba para no dejar gaps */
      len = Math.ceil(len) + 2;
      el.style.setProperty('--path-len', len);
      el.style.strokeDasharray  = len;
      el.style.strokeDashoffset = len;
    });

    /* 3. Lanzar el trazado con stagger entre paths */
    var totalDrawTime = 0;

    paths.forEach(function (el, pathIndex) {
      var delay = pathIndex * PATH_STAGGER;
      totalDrawTime = Math.max(totalDrawTime, delay + DRAW_DURATION);

      /* Forzar reflow para que la asignación de dashoffset se aplique
         antes de iniciar la transición */
      el.getBoundingClientRect();

      el.style.transition =
        'stroke-dashoffset ' + DRAW_DURATION + 'ms cubic-bezier(0.4, 0, 0.2, 1) ' + delay + 'ms';
      el.style.strokeDashoffset = '0';
    });

    /* 4. Fill SVG fade-in después del último trazo */
    setTimeout(function () {
      card.classList.add('fill-visible');
    }, totalDrawTime + FILL_DELAY);

    /* 5. Label slide-up */
    setTimeout(function () {
      card.classList.add('label-visible');
    }, totalDrawTime + FILL_DELAY + LABEL_DELAY);
  }

  /* ══════════════════════════════════════════════════════════
     TRIGGER: IntersectionObserver → animar cards con stagger
     ══════════════════════════════════════════════════════════ */
  var section = document.querySelector('.hero');

  if (!section) return;

  /* Preparar paths antes de que el observer dispare
     (setear dasharray/dashoffset sin animación todavía) */
  cards.forEach(function (card) {
    var strokeSVG = card.querySelector('.hero__svg--stroke');
    if (!strokeSVG) return;
    var paths = strokeSVG.querySelectorAll('path, line, rect, circle, polyline, polygon');
    paths.forEach(function (el) {
      var len;
      try { len = el.getTotalLength ? el.getTotalLength() : 300; }
      catch (e) { len = 300; }
      len = Math.ceil(len) + 2;
      el.style.strokeDasharray  = len;
      el.style.strokeDashoffset = len;
    });
  });

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        /* Lanzar cada card con su stagger */
        cards.forEach(function (card, i) {
          setTimeout(function () {
            animateCard(card, i);
          }, i * CARD_STAGGER);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);

})();