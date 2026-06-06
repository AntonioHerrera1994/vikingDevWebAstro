(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Elementos ─────────────────────────────────────────── */
  var section  = document.querySelector('.pricing');
  var header   = document.querySelector('.pricing__header');
  var tabsWrap = document.querySelector('.pricing__tabs');
  var panels   = document.querySelector('.pricing__panels');
  var tabs     = Array.from(document.querySelectorAll('.pricing__tab'));
  var panelEls = Array.from(document.querySelectorAll('.pricing__panel'));

  if (!section) return;

  /* ════════════════════════════════════════════════════════════
     1. INTERSECTION OBSERVER — entrada animada
     ════════════════════════════════════════════════════════════ */
  function revealAll() {
    if (header)   header.classList.add('is-visible');
    if (tabsWrap) tabsWrap.classList.add('is-visible');
    if (panels)   panels.classList.add('is-visible');
    /* Inicializar scroll del panel activo */
    var activePanel = document.querySelector('.pricing__panel.is-active');
    if (activePanel) initScrollPanel(activePanel);
  }

  if (noMotion) {
    revealAll();
  } else {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealAll();
          obs.disconnect();
        }
      });
    }, { threshold: 0.08 }).observe(section);
  }

  /* ════════════════════════════════════════════════════════════
     2. TAB SWITCHING
     ════════════════════════════════════════════════════════════ */
  function activateTab(index) {
    tabs.forEach(function (tab, i) {
      var isActive = i === index;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    panelEls.forEach(function (panel, i) {
      var isActive = i === index;
      panel.classList.toggle('is-active', isActive);
      /* hidden para accesibilidad */
      if (isActive) {
        panel.removeAttribute('hidden');
        /* Inicializar scroll en el panel recién activado */
        setTimeout(function () { initScrollPanel(panel); }, 50);
        /* Scroll hint */
        if (!noMotion) {
          setTimeout(function () { scrollHint(panel); }, 400);
        }
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { activateTab(i); });
  });

  /* ── Teclado ← → ─────────────────────────────────────────── */
  tabs.forEach(function (tab, i) {
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        var next = (i + 1) % tabs.length;
        activateTab(next);
        tabs[next].focus();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        var prev = (i - 1 + tabs.length) % tabs.length;
        activateTab(prev);
        tabs[prev].focus();
      }
    });
  });

  /* ════════════════════════════════════════════════════════════
     3. SCROLL: fade + pill
     ════════════════════════════════════════════════════════════ */
  function initScrollPanel(panel) {
    var list = panel.querySelector('.pricing__features');
    var wrap = panel.querySelector('.pricing__features-wrap');
    if (!list || !wrap) return;

    /* Sin overflow: ocultar indicadores */
    if (list.scrollHeight <= list.clientHeight + 4) {
      wrap.classList.add('no-overflow');
      wrap.classList.remove('is-bottom');
      return;
    }

    wrap.classList.remove('no-overflow');

    function checkBottom() {
      var atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 8;
      wrap.classList.toggle('is-bottom', atBottom);
    }

    /* Resetear al cambiar de tab */
    list.scrollTop = 0;
    wrap.classList.remove('is-bottom');

    /* Remover listener previo para no acumular */
    list.removeEventListener('scroll', list._checkBottom);
    list._checkBottom = checkBottom;
    list.addEventListener('scroll', checkBottom, { passive: true });

    checkBottom();
  }

  /* ════════════════════════════════════════════════════════════
     4. SCROLL HINT — programmatic bounce
     ════════════════════════════════════════════════════════════ */
  function scrollHint(panel) {
    var list = panel.querySelector('.pricing__features');
    if (!list || list.scrollHeight <= list.clientHeight + 4) return;

    list.scrollTo({ top: 32, behavior: 'smooth' });
    setTimeout(function () {
      list.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  }

})();