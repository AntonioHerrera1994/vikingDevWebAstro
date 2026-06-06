/* ============================================================
   Portfolio.js — VikingDev Redesign
   Inicializa un carrusel independiente por cada .portfolio__block.
   Funcionalidades:
     1. Flechas prev / next
     2. Dots de paginación clickeables
     3. Drag / swipe (mouse y touch)
     4. Teclado (← →) cuando el carrusel tiene foco
     5. ResizeObserver: recalcula al cambiar tamaño de ventana
     6. IntersectionObserver: animación de entrada por bloque
   ============================================================ */

(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ════════════════════════════════════════════════════════════
     FACTORY: inicializa un carrusel dado su .portfolio__block
     ════════════════════════════════════════════════════════════ */
  function initCarousel(block) {
    var track     = block.querySelector('.portfolio__track');
    var cards     = Array.from(block.querySelectorAll('.portfolio__card'));
    var prevBtn   = block.querySelector('.portfolio__arrow--prev');
    var nextBtn   = block.querySelector('.portfolio__arrow--next');
    var dotsWrap  = block.querySelector('.portfolio__dots');

    if (!track || !cards.length) return;

    /* ── Estado ─────────────────────────────────────────────── */
    var currentIndex  = 0;    // índice del primer card visible
    var visibleCount  = 1;    // cuántos cards se ven a la vez
    var cardWidth     = 0;    // ancho de un card + gap
    var maxIndex      = 0;    // índice máximo permitido
    var dots          = [];

    /* ── Calcular dimensiones ────────────────────────────────── */
    function measure() {
      var gap = parseInt(getComputedStyle(track).gap) || 24;
      var firstCard = cards[0];
      cardWidth = firstCard.offsetWidth + gap;

      /* Cuántos cards caben en el viewport */
      var viewportWidth = block.querySelector('.portfolio__viewport').offsetWidth;
      visibleCount = Math.max(1, Math.round(viewportWidth / cardWidth));
      visibleCount = Math.min(visibleCount, cards.length);

      maxIndex = Math.max(0, cards.length - visibleCount);

      /* Ajustar currentIndex si quedó fuera de rango */
      if (currentIndex > maxIndex) currentIndex = maxIndex;

      renderDots();
      goTo(currentIndex, false); /* sin animación al recalcular */
    }

    /* ── Render dots ─────────────────────────────────────────── */
    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      dots = [];

      /* Un dot por cada "página" (paso de visibleCount) */
      var pages = maxIndex + 1;
      if (pages <= 1) { dotsWrap.style.display = 'none'; return; }
      dotsWrap.style.display = '';

      for (var i = 0; i < pages; i++) {
        var btn = document.createElement('button');
        btn.className = 'portfolio__dot' + (i === currentIndex ? ' is-active' : '');
        btn.setAttribute('aria-label', 'Ir al proyecto ' + (i + 1));
        btn.setAttribute('type', 'button');
        btn.dataset.index = i;
        btn.addEventListener('click', onDotClick);
        dotsWrap.appendChild(btn);
        dots.push(btn);
      }
    }

    function onDotClick(e) {
      goTo(parseInt(e.currentTarget.dataset.index), true);
    }

    /* ── Ir a un índice ──────────────────────────────────────── */
    function goTo(index, animate) {
      if (animate === undefined) animate = true;

      currentIndex = Math.max(0, Math.min(index, maxIndex));

      var offset = -(currentIndex * cardWidth);

      if (animate && !noMotion) {
        track.style.transition = 'transform 420ms cubic-bezier(0.4, 0, 0.2, 1)';
      } else {
        track.style.transition = 'none';
      }
      track.style.transform = 'translateX(' + offset + 'px)';

      updateArrows();
      updateDots();
    }

    function updateArrows() {
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
    }

    function updateDots() {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === currentIndex);
      });
    }

    /* ── Event listeners: flechas ────────────────────────────── */
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(currentIndex - 1, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(currentIndex + 1, true);
      });
    }

    /* ── Teclado ─────────────────────────────────────────────── */
    block.setAttribute('tabindex', '0');
    block.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex - 1, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1, true); }
    });

    /* ── Drag / Swipe ────────────────────────────────────────── */
    var dragStartX   = 0;
    var dragCurrentX = 0;
    var isDragging   = false;
    var startOffset  = 0;

    /* Mouse */
    track.addEventListener('mousedown', function (e) {
      isDragging   = true;
      dragStartX   = e.clientX;
      startOffset  = -(currentIndex * cardWidth);
      track.style.transition = 'none';
      track.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      dragCurrentX = e.clientX;
      var delta = dragCurrentX - dragStartX;
      track.style.transform = 'translateX(' + (startOffset + delta) + 'px)';
    });

    window.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = '';
      var delta = e.clientX - dragStartX;
      snapAfterDrag(delta);
    });

    /* Touch */
    track.addEventListener('touchstart', function (e) {
      dragStartX  = e.touches[0].clientX;
      startOffset = -(currentIndex * cardWidth);
      track.style.transition = 'none';
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      dragCurrentX = e.touches[0].clientX;
      var delta = dragCurrentX - dragStartX;
      track.style.transform = 'translateX(' + (startOffset + delta) + 'px)';
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;
      var delta = e.changedTouches[0].clientX - dragStartX;
      snapAfterDrag(delta);
    });

    function snapAfterDrag(delta) {
      var threshold = cardWidth * 0.25; /* 25% del ancho = snap */
      if (delta < -threshold) {
        goTo(currentIndex + 1, true);
      } else if (delta > threshold) {
        goTo(currentIndex - 1, true);
      } else {
        goTo(currentIndex, true); /* volver al mismo */
      }
    }

    /* ── ResizeObserver ──────────────────────────────────────── */
    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(function () {
        measure();
      });
      ro.observe(block);
    } else {
      window.addEventListener('resize', measure, { passive: true });
    }

    /* ── Init ────────────────────────────────────────────────── */
    measure();
  }

  /* ════════════════════════════════════════════════════════════
     INTERSECTION OBSERVER — animar bloques al entrar
     ════════════════════════════════════════════════════════════ */
  var blocks = document.querySelectorAll('.portfolio__block');

  if (!blocks.length) return;

  if (noMotion) {
    blocks.forEach(function (b) {
      b.classList.add('is-visible');
      initCarousel(b);
    });
    return;
  }

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          /* Inicializar carrusel después de que el bloque sea visible
             para que offsetWidth esté disponible */
          setTimeout(function () {
            initCarousel(entry.target);
          }, 50);
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  blocks.forEach(function (b) {
    sectionObserver.observe(b);
  });

})();