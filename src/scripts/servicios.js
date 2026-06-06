(function () {
  'use strict';

  /* ─── Preferencia de movimiento ─────────────────────────── */
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Elementos del DOM ─────────────────────────────────── */
  const section   = document.querySelector('.services');
  const header    = document.querySelector('.services__header');
  const cards     = document.querySelectorAll('.services__card');

  const modal     = document.getElementById('services-modal');
  const backdrop  = document.getElementById('modal-backdrop');
  const panel     = document.getElementById('modal-panel');
  const closeBtn  = document.getElementById('modal-close');

  const modalImg      = document.getElementById('modal-img');
  const modalImgTag   = document.getElementById('modal-img-tag');
  const modalTitle    = document.getElementById('modal-title');
  const modalDesc     = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalPrice    = document.getElementById('modal-price');
  const modalCta      = document.getElementById('modal-cta');

  if (!section || !modal) return;

  /* ════════════════════════════════════════════════════════════
     1. INTERSECTION OBSERVER — animaciones de entrada
     ════════════════════════════════════════════════════════════ */

  function revealHeader() {
    if (header) header.classList.add('is-visible');
  }

  function revealCards() {
    cards.forEach(function (card) {
      card.classList.add('is-visible');
    });
  }

  if (noMotion) {
    revealHeader();
    revealCards();
  } else {
    /* Header */
    if (header) {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { revealHeader(); obs.disconnect(); }
        });
      }, { threshold: 0.3 }).observe(header);
    }

    /* Cards: trigger cuando la sección entra al 10% */
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { revealCards(); obs.disconnect(); }
      });
    }, { threshold: 0.1 }).observe(section);
  }

  /* ════════════════════════════════════════════════════════════
     2. MODAL: abrir
     ════════════════════════════════════════════════════════════ */

  /* Elemento que disparó la apertura (para devolver foco al cerrar) */
  var lastFocused = null;

  function openModal(card) {
    /* Leer datos del dataset */
    var d = card.dataset;
    var features;
    try { features = JSON.parse(d.features); } catch (e) { features = []; }

    /* Rellenar imagen —
       Con <Image> de Astro el src procesado está en el <img> del card,
       no en data-img. Lo leemos directamente del elemento renderizado. */
    var cardImg = card.querySelector('img');
    modalImg.src    = cardImg ? cardImg.src : '';
    modalImg.alt    = d.imgAlt || (cardImg ? cardImg.alt : '');
    modalImgTag.textContent = d.tag || '';

    /* Rellenar texto */
    modalTitle.textContent = d.title || '';
    modalDesc.textContent  = d.desc  || '';
    modalPrice.textContent = d.from  || '';

    /* CTA */
    modalCta.textContent = d.cta || 'Solicitar información';
    modalCta.href        = d.ctaHref || '#cotizador';

    /* Features list */
    modalFeatures.innerHTML = '';
    features.forEach(function (feat) {
      var li   = document.createElement('li');
      li.className = 'svc-modal__feature';

      var check = document.createElement('span');
      check.className = 'svc-modal__check';
      check.setAttribute('aria-hidden', 'true');

      var text = document.createTextNode(feat);

      li.appendChild(check);
      li.appendChild(text);
      modalFeatures.appendChild(li);
    });

    /* Mostrar modal */
    lastFocused = document.activeElement;

    requestAnimationFrame(function () {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
      if (panel) panel.scrollTop = 0;
    });
  }

  /* ════════════════════════════════════════════════════════════
     3. MODAL: cerrar
     ════════════════════════════════════════════════════════════ */

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    /* Esperar transición antes de ocultar del DOM */
    var duration = noMotion ? 0 : 380;
    setTimeout(function () {
      
      /* Devolver foco al card que lo abrió */
      if (lastFocused) lastFocused.focus();
    }, duration);
  }

  /* ════════════════════════════════════════════════════════════
     4. EVENT LISTENERS
     ════════════════════════════════════════════════════════════ */

  /* Click / Enter / Space en las cards */
  cards.forEach(function (card) {
    card.addEventListener('click', function () { openModal(card); });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  /* Botón cerrar */
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  /* Backdrop */
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  /* Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* ════════════════════════════════════════════════════════════
     5. TRAP FOCO dentro del modal (accesibilidad)
     ════════════════════════════════════════════════════════════ */

  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;

    var focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ════════════════════════════════════════════════════════════
     6. SWIPE DOWN para cerrar (mobile sheet)
     ════════════════════════════════════════════════════════════ */

  var touchStartY = 0;
  var touchCurrentY = 0;
  var isDragging = false;

  panel.addEventListener('touchstart', function (e) {
    /* Solo activar swipe si estamos en el tope del scroll del panel */
    if (panel.scrollTop > 0) return;
    touchStartY   = e.touches[0].clientY;
    isDragging    = true;
  }, { passive: true });

  panel.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    touchCurrentY = e.touches[0].clientY;
    var delta = touchCurrentY - touchStartY;

    /* Solo permitir arrastre hacia abajo */
    if (delta > 0 && panel.scrollTop === 0) {
      panel.style.transform = 'translateY(' + delta + 'px)';
      panel.style.transition = 'none';
    }
  }, { passive: true });

  panel.addEventListener('touchend', function () {
    if (!isDragging) return;
    isDragging = false;

    var delta = touchCurrentY - touchStartY;
    panel.style.transition = '';

    if (delta > 120) {
      /* Suficiente para cerrar */
      panel.style.transform = '';
      closeModal();
    } else {
      /* Volver a la posición original */
      panel.style.transform = '';
    }

    touchStartY   = 0;
    touchCurrentY = 0;
  });

})();