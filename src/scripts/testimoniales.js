(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Elementos ─────────────────────────────────────────── */
  var section    = document.querySelector('.testi');
  var header     = document.querySelector('.testi__header');
  var carousel   = document.querySelector('.testi__carousel');
  var viewport   = document.querySelector('.testi__viewport');
  var track      = document.getElementById('testi-track');
  var dotsWrap   = document.getElementById('testi-dots');
  var prevBtn    = document.getElementById('testi-prev');
  var nextBtn    = document.getElementById('testi-next');
  var progressBar = document.getElementById('testi-progress');

  if (!section || !track) return;

  var slides     = Array.from(track.querySelectorAll('.testi__slide'));
  var total      = slides.length;
  var current    = 0;
  var dots       = [];
  var autoTimer  = null;
  var isPaused   = false;
  var AUTOPLAY_MS = 5000; // ms por slide

  /* ════════════════════════════════════════════════════════════
     1. INTERSECTION OBSERVER — entrada animada
     ════════════════════════════════════════════════════════════ */
  function reveal() {
    if (header)   header.classList.add('is-visible');
    if (carousel) carousel.classList.add('is-visible');
    buildDots();
    goTo(0, false);
    if (!noMotion) startAutoplay();
  }

  if (noMotion) {
    reveal();
  } else {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { reveal(); obs.disconnect(); }
      });
    }, { threshold: 0.15 }).observe(section);
  }

  /* ════════════════════════════════════════════════════════════
     2. CARRUSEL — ir a índice
     ════════════════════════════════════════════════════════════ */
  function goTo(index, animate) {
    if (animate === undefined) animate = true;

    current = (index + total) % total;

    /* ── Clases is-active ── */
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
    });

    /* ── Centrar el slide activo en el viewport ── */
    centerActiveSlide(animate);

    /* ── Accent colors ── */
    syncAccent();

    /* ── Dots ── */
    updateDots();
  }

  function centerActiveSlide(animate) {
    if (!viewport || !track) return;

    var activeSlide = slides[current];
    if (!activeSlide) return;

    /* Offset para centrar: (viewport width - slide width) / 2 */
    var viewW  = viewport.offsetWidth;
    var slideW = activeSlide.offsetWidth;
    var gap    = parseInt(getComputedStyle(track).gap) || 24;

    /* Suma de anchos + gaps de slides anteriores */
    var offsetLeft = 0;
    for (var i = 0; i < current; i++) {
      offsetLeft += slides[i].offsetWidth + gap;
    }

    /* Centro del slide activo relativo al track */
    var slideCenter = offsetLeft + slideW / 2;
    var translateX  = -(slideCenter - viewW / 2);

    if (!animate || noMotion) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 480ms cubic-bezier(0.4, 0, 0.2, 1)';
    }

    track.style.transform = 'translateX(' + translateX + 'px)';
  }

  /* ════════════════════════════════════════════════════════════
     3. AUTOPLAY + PROGRESS BAR
     ════════════════════════════════════════════════════════════ */
  function startAutoplay() {
    clearAutoplay();
    resetProgress();

    /* Trigger el progress bar animation */
    requestAnimationFrame(function () {
      if (progressBar) {
        progressBar.style.transition = 'width ' + AUTOPLAY_MS + 'ms linear';
        progressBar.style.width = '100%';
      }
    });

    autoTimer = setTimeout(function () {
      if (!isPaused) {
        goTo(current + 1, true);
        startAutoplay();
      }
    }, AUTOPLAY_MS);
  }

  function clearAutoplay() {
    clearTimeout(autoTimer);
  }

  function resetProgress() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
  }

  function pauseAutoplay() {
    if (isPaused) return;
    isPaused = true;
    clearAutoplay();
    if (carousel) carousel.classList.add('is-paused');
    /* Congelar la barra en su posición actual */
    if (progressBar) {
      var computed = getComputedStyle(progressBar).width;
      progressBar.style.transition = 'none';
      progressBar.style.width = computed;
    }
  }

  function resumeAutoplay() {
    if (!isPaused) return;
    isPaused = false;
    if (carousel) carousel.classList.remove('is-paused');
    if (!noMotion) startAutoplay();
  }

  /* Pausa en hover */
  if (carousel) {
    carousel.addEventListener('mouseenter', pauseAutoplay);
    carousel.addEventListener('mouseleave', resumeAutoplay);
    carousel.addEventListener('focusin',    pauseAutoplay);
    carousel.addEventListener('focusout',   resumeAutoplay);
  }

  /* ════════════════════════════════════════════════════════════
     4. FLECHAS + DOTS
     ════════════════════════════════════════════════════════════ */
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(current - 1, true);
      if (!noMotion) startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(current + 1, true);
      if (!noMotion) startAutoplay();
    });
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    dots = [];

    slides.forEach(function (_, i) {
      var btn = document.createElement('button');
      btn.className = 'testi__dot' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Ver testimonio ' + (i + 1));
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.setAttribute('type', 'button');
      btn.dataset.index = i;

      btn.addEventListener('click', function () {
        goTo(i, true);
        if (!noMotion) startAutoplay();
      });

      dotsWrap.appendChild(btn);
      dots.push(btn);
    });
  }

  function updateDots() {
    dots.forEach(function (dot, i) {
      var isActive = i === current;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  /* ════════════════════════════════════════════════════════════
     5. ACCENT COLOR SYNC
        El dot activo y la progress bar toman el color del
        testimonial activo (data-accent del slide)
     ════════════════════════════════════════════════════════════ */
  function syncAccent() {
    var activeSlide = slides[current];
    if (!activeSlide) return;
    var accent = activeSlide.dataset.accent || 'var(--color-secondary-container)';

    /* Progress bar */
    if (progressBar) {
      progressBar.style.background = accent;
    }

    /* Dot activo */
    if (dotsWrap) {
      dotsWrap.style.setProperty('--dot-active-color', accent);
      dots.forEach(function (dot, i) {
        if (i === current) {
          dot.style.background = accent;
        } else {
          dot.style.background = '';
        }
      });
    }
  }

  /* ════════════════════════════════════════════════════════════
     6. DRAG (mouse) y SWIPE (touch)
     ════════════════════════════════════════════════════════════ */
  var dragStartX  = 0;
  var isDragging  = false;
  var dragMoved   = false;
  var startTranslateX = 0;

  function getCurrentTranslateX() {
    var style = window.getComputedStyle(track);
    var matrix = new DOMMatrix(style.transform);
    return matrix.m41;
  }

  /* Mouse */
  track.addEventListener('mousedown', function (e) {
    isDragging  = true;
    dragMoved   = false;
    dragStartX  = e.clientX;
    startTranslateX = getCurrentTranslateX();
    track.style.transition = 'none';
    track.style.cursor = 'grabbing';
    pauseAutoplay();
  });

  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var delta = e.clientX - dragStartX;
    if (Math.abs(delta) > 4) dragMoved = true;
    track.style.transform = 'translateX(' + (startTranslateX + delta) + 'px)';
  });

  window.addEventListener('mouseup', function (e) {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = '';

    if (dragMoved) {
      var delta = e.clientX - dragStartX;
      snapFromDrag(delta);
    }
    resumeAutoplay();
  });

  /* Touch */
  track.addEventListener('touchstart', function (e) {
    dragStartX  = e.touches[0].clientX;
    startTranslateX = getCurrentTranslateX();
    isDragging  = true;
    dragMoved   = false;
    track.style.transition = 'none';
    pauseAutoplay();
  }, { passive: true });

  track.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    var delta = e.touches[0].clientX - dragStartX;
    if (Math.abs(delta) > 4) dragMoved = true;
    track.style.transform = 'translateX(' + (startTranslateX + delta) + 'px)';
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    if (!isDragging) return;
    isDragging = false;
    if (dragMoved) {
      var delta = e.changedTouches[0].clientX - dragStartX;
      snapFromDrag(delta);
    }
    resumeAutoplay();
  });

  function snapFromDrag(delta) {
    var threshold = 60; /* px mínimos para cambiar slide */
    if (delta < -threshold) {
      goTo(current + 1, true);
    } else if (delta > threshold) {
      goTo(current - 1, true);
    } else {
      goTo(current, true); /* volver al mismo */
    }
    if (!noMotion) startAutoplay();
  }

  /* ════════════════════════════════════════════════════════════
     7. TECLADO ← →
     ════════════════════════════════════════════════════════════ */
  section.setAttribute('tabindex', '-1');
  document.addEventListener('keydown', function (e) {
    /* Solo si el foco está dentro de la sección */
    if (!section.contains(document.activeElement)) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(current - 1, true);
      if (!noMotion) startAutoplay();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(current + 1, true);
      if (!noMotion) startAutoplay();
    }
  });

  /* ════════════════════════════════════════════════════════════
     8. RESIZE — recentrar al cambiar tamaño
     ════════════════════════════════════════════════════════════ */
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(function () {
      goTo(current, false);
    }).observe(viewport || section);
  }

})();