(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var section    = document.querySelector('.quoter');
  var leftCol    = document.querySelector('.quoter__left');
  var rightCol   = document.querySelector('.quoter__right');
  var checkboxes = document.querySelectorAll('.quoter__checkbox');
  var totalEl    = document.getElementById('quoter-total');
  var ctaLink    = document.getElementById('quoter-cta');
  var steps      = document.querySelectorAll('.quoter__step');

  if (!section) return;

  /* ── 1. Entrada animada ──────────────────────────────────── */
  if (noMotion) {
    if (leftCol)  leftCol.classList.add('is-visible');
    if (rightCol) rightCol.classList.add('is-visible');
  } else {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (leftCol)  leftCol.classList.add('is-visible');
          if (rightCol) rightCol.classList.add('is-visible');
          obs.disconnect();
        }
      });
    }, { threshold: 0.10 }).observe(section);
  }

  /* ── 2. Calculadora ─────────────────────────────────────── */
  function calcTotal() {
    var total = 0;
    checkboxes.forEach(function (cb) {
      if (cb.checked) total += parseInt(cb.dataset.price || 0, 10);
    });
    return total;
  }

  function formatMXN(num) {
    return '$' + num.toLocaleString('es-MX') + ' MXN';
  }

  function updateTotal() {
    var total = calcTotal();
    if (!totalEl) return;

    var hasCustom = Array.from(checkboxes).some(function (cb) {
      return cb.checked && cb.dataset.label === 'Proyecto a la Medida';
    });

    totalEl.textContent = hasCustom && total === 0
      ? 'Cotización personalizada'
      : formatMXN(total) + (hasCustom ? ' + cotización esp.' : '');

    if (!noMotion) {
      totalEl.classList.add('is-bump');
      clearTimeout(totalEl._bumpTimeout);
      totalEl._bumpTimeout = setTimeout(function () {
        totalEl.classList.remove('is-bump');
      }, 220);
    }

    updateCTA();
  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', updateTotal);
  });

  /* ── 3. CTA WhatsApp — mensaje natural ──────────────────── */
  function buildNaturalMessage(selected) {
    if (selected.length === 0) {
      return 'Hola VikingDev! Vengo del cotizador de su web y me gustaría recibir más información sobre sus servicios. ¡Gracias!';
    }

    // Clasificar servicios por tipo
    var webServices  = ['Landing Page', 'Página Web Completa', 'Tienda E-Commerce', 'Proyecto a la Medida'];
    var adsServices  = ['Meta Ads (no incluye inversión)', 'Google Ads (no incluye inversión)'];
    var otherServices = ['Consultoría Digital'];

    var web   = selected.filter(function (s) { return webServices.indexOf(s) !== -1; });
    var ads   = selected.filter(function (s) { return adsServices.indexOf(s) !== -1; });
    var other = selected.filter(function (s) { return otherServices.indexOf(s) !== -1; });

    // Nombres cortos para el mensaje
    var friendlyName = {
      'Landing Page': 'una landing page',
      'Página Web Completa': 'una página web completa',
      'Tienda E-Commerce': 'una tienda en línea',
      'Proyecto a la Medida': 'un proyecto a la medida',
      'Meta Ads (no incluye inversión)': 'campañas en Meta Ads',
      'Google Ads (no incluye inversión)': 'campañas en Google Ads',
      'Consultoría Digital': 'consultoría digital'
    };

    var parts = [];
    web.forEach(function (s)   { parts.push(friendlyName[s]); });
    ads.forEach(function (s)   { parts.push(friendlyName[s]); });
    other.forEach(function (s) { parts.push(friendlyName[s]); });

    var serviceList = parts.length === 1
      ? parts[0]
      : parts.slice(0, -1).join(', ') + ' y ' + parts[parts.length - 1];

    return 'Hola VikingDev! Vengo del cotizador de su web y me gustaría trabajar ' + serviceList + '. ¿Me pueden dar más información? ¡Gracias!';
  }

  function updateCTA() {
    if (!ctaLink) return;

    var selected = [];
    checkboxes.forEach(function (cb) {
      if (cb.checked) selected.push(cb.dataset.label || '');
    });

    var msg = encodeURIComponent(buildNaturalMessage(selected));
    ctaLink.href = 'https://wa.me/526632477816?text=' + msg;
  }

  updateCTA();

  /* ── 4. Pasos — scroll activo ───────────────────────────── */
  if (steps.length && !noMotion) {
    var stepObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('is-active');
      });
    }, { threshold: 0.6, rootMargin: '0px 0px -10% 0px' });

    steps.forEach(function (step) { stepObserver.observe(step); });
  } else {
    steps.forEach(function (s) { s.classList.add('is-active'); });
  }

})();