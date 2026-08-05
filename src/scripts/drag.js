(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ════════════════════════════════════════════════════════════
     FACTORY: inicializa un carrusel dado su .portfolio__block
     ════════════════════════════════════════════════════════════ */
  function initCarousel(block) {
    var track      = block.querySelector('.portfolio__track');
    var allCards   = Array.from(block.querySelectorAll('.portfolio__card'));
    var emptyMsg   = block.querySelector('.portfolio__empty');
    var prevBtn    = block.querySelector('.portfolio__arrow--prev');
    var nextBtn    = block.querySelector('.portfolio__arrow--next');
    var dotsWrap   = block.querySelector('.portfolio__dots');

    if (!track || !allCards.length) return;

    /* ── Estado ─────────────────────────────────────────────── */
    var cards         = allCards.slice(); // cards actualmente visibles (según filtro)
    var currentIndex   = 0;
    var visibleCount    = 1;
    var cardWidth       = 0;
    var maxIndex        = 0;
    var dots            = [];

    /* ── Calcular dimensiones ────────────────────────────────── */
    function measure() {
      if (!cards.length) {
        if (dotsWrap) dotsWrap.style.display = 'none';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        track.style.transition = 'none';
        track.style.transform = 'translateX(0px)';
        return;
      }

      var gap = parseInt(getComputedStyle(track).gap) || 24;
      var firstCard = cards[0];
      cardWidth = firstCard.offsetWidth + gap;

      var viewportWidth = block.querySelector('.portfolio__viewport').offsetWidth;
      visibleCount = Math.max(1, Math.round(viewportWidth / cardWidth));
      visibleCount = Math.min(visibleCount, cards.length);

      maxIndex = Math.max(0, cards.length - visibleCount);

      if (currentIndex > maxIndex) currentIndex = maxIndex;

      renderDots();
      goTo(currentIndex, false);
    }

    /* ── Render dots ─────────────────────────────────────────── */
    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      dots = [];

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
      if (!cards.length) return;
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

    /* ── Filtro por categoría ────────────────────────────────── */
    function applyFilter(category) {
      allCards.forEach(function (card) {
        var match = category === 'todos' || card.dataset.category === category;
        card.style.display = match ? '' : 'none';
      });

      cards = allCards.filter(function (card) {
        return card.style.display !== 'none';
      });

      if (emptyMsg) emptyMsg.hidden = cards.length > 0;

      currentIndex = 0;
      measure();
    }

    /* Expone applyFilter para el control global del filtro */
    block._applyFilter = applyFilter;

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

    track.addEventListener('mousedown', function (e) {
      if (!cards.length) return;
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

    track.addEventListener('touchstart', function (e) {
      if (!cards.length) return;
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
      var threshold = cardWidth * 0.25;
      if (delta < -threshold) {
        goTo(currentIndex + 1, true);
      } else if (delta > threshold) {
        goTo(currentIndex - 1, true);
      } else {
        goTo(currentIndex, true);
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
  } else {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
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
  }

  /* ════════════════════════════════════════════════════════════
     FILTRO GLOBAL — aplica a ambos carruseles a la vez
     ════════════════════════════════════════════════════════════ */
  var filterSelects = document.querySelectorAll('[data-filter-select]');

  function applyGlobalFilter(category) {
    blocks.forEach(function (block) {
      if (typeof block._applyFilter === 'function') {
        block._applyFilter(category);
      }
    });
  }

  filterSelects.forEach(function (select) {
    select.addEventListener('change', function (e) {
      var category = e.target.value;
      filterSelects.forEach(function (s) { s.value = category; });
      applyGlobalFilter(category);
    });
  });

})();