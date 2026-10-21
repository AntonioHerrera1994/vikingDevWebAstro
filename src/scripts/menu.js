(function () {
  'use strict';

  /* ─── Elementos ─────────────────────────────────────────── */
  const nav        = document.getElementById('main-nav');
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!nav || !hamburger || !mobileMenu) return;

  /* ─── 1. Scroll: shrink nav ─────────────────────────────── */
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // ejecutar al cargar por si la página empieza con scroll

  /* ─── 2. Hamburger toggle ───────────────────────────────── */
  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = hamburger.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  }

  hamburger.addEventListener('click', toggleMenu);

  /* ─── 3a. Cierre al hacer click en links del menú móvil ── */
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ─── 3b. Cierre al hacer click fuera del nav ───────────── */
  document.addEventListener('click', function (e) {
    if (
      hamburger.classList.contains('is-open') &&
      !nav.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ─── 4. Cierre con tecla Escape ────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus(); // devolver el foco al botón (accesibilidad)
    }
  });

  /* ─── 5. Resetear estado al redimensionar a desktop ─────── */
  const mediaQuery = window.matchMedia('(min-width: 768px)');

  function onResize(mq) {
    if (mq.matches && hamburger.classList.contains('is-open')) {
      closeMenu();
    }
  }

  // Usar addEventListener si está disponible, si no addListener (Safari antiguo)
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', onResize);
  } else {
    mediaQuery.addListener(onResize);
  }

  /* ─── 6. Dropdown "Servicios" (escritorio) ──────────────── */
  const dd = nav.querySelector('[data-nav-dd]');

  if (dd) {
    const trigger = dd.querySelector('[data-nav-dd-trigger]');
    const panel   = dd.querySelector('[data-nav-dd-panel]');
    const items   = Array.from(panel.querySelectorAll('a'));
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let closeTimer = null;
    let openedAt = 0;

    function openDd() {
      clearTimeout(closeTimer);
      if (dd.classList.contains('is-open')) return;
      dd.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      openedAt = Date.now();
    }

    function closeDd(returnFocus) {
      clearTimeout(closeTimer);
      if (!dd.classList.contains('is-open')) return;
      dd.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) trigger.focus();
    }

    // Clic / toque: abre o cierra. Si se acaba de abrir por hover, el clic no lo cierra.
    trigger.addEventListener('click', function () {
      if (dd.classList.contains('is-open')) {
        if (Date.now() - openedAt > 400) closeDd(false);
      } else {
        openDd();
      }
    });

    // Hover en escritorio, con pequeño retraso al salir
    if (canHover) {
      dd.addEventListener('mouseenter', openDd);
      dd.addEventListener('mouseleave', function () {
        closeTimer = setTimeout(function () { closeDd(false); }, 180);
      });
    }

    // Teclado: flecha abajo entra al panel, flechas recorren, Escape cierra
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDd();
        items[0] && items[0].focus();
      }
    });

    panel.addEventListener('keydown', function (e) {
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(i + 1) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (i <= 0) trigger.focus();
        else items[i - 1].focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dd.classList.contains('is-open')) {
        closeDd(dd.contains(document.activeElement));
      }
    });

    // Cierra al hacer clic fuera o al sacar el foco del dropdown con Tab
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) closeDd(false);
    });

    dd.addEventListener('focusout', function (e) {
      if (!dd.contains(e.relatedTarget)) closeDd(false);
    });

    // Cierra al elegir una opción (útil si el destino es la misma página con #ancla)
    items.forEach(function (link) {
      link.addEventListener('click', function () { closeDd(false); });
    });
  }

  /* ─── 7. Acordeón "Servicios" (menú móvil) ──────────────── */
  const acc = mobileMenu.querySelector('[data-nav-acc]');

  if (acc) {
    const accTrigger = acc.querySelector('[data-nav-acc-trigger]');

    accTrigger.addEventListener('click', function () {
      const open = !acc.classList.contains('is-open');
      acc.classList.toggle('is-open', open);
      accTrigger.setAttribute('aria-expanded', String(open));
    });
  }
})();
