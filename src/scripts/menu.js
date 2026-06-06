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
})();