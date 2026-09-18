(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var section    = document.querySelector('.quoter');
  var leftCol    = document.querySelector('.quoter__left');
  var rightCol   = document.querySelector('.quoter__right');
  var checkboxes = document.querySelectorAll('.quoter__checkbox');
  var totalEl    = document.getElementById('quoter-total');
  var totalLabelEl = document.getElementById('quoter-total-label');
  var ctaLink    = document.getElementById('quoter-cta');
  var steps      = document.querySelectorAll('.quoter__step');

  var ikariCheckbox = document.getElementById('ikari-checkbox');
  var ikariLabel     = document.getElementById('ikari-check-label');

  if (!section) return;

  /* Precio combinado especial cuando se seleccionan ambos Ads */
  var ADS_BUNDLE_PRICE = 2500;

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
  function getSelectedAdsCount() {
    var count = 0;
    checkboxes.forEach(function (cb) {
      if (cb.checked && cb.dataset.group === 'ads') count++;
    });
    return count;
  }

  function hasWebSelected() {
    var found = false;
    checkboxes.forEach(function (cb) {
      if (cb.checked && cb.dataset.group === 'web') found = true;
    });
    return found;
  }

  /* ── Ikari: se habilita solo si hay un servicio web seleccionado ── */
  function syncIkariAvailability() {
    if (!ikariCheckbox || !ikariLabel) return;

    var webSelected = hasWebSelected();

    if (webSelected) {
      ikariCheckbox.disabled = false;
      ikariLabel.classList.remove('is-disabled');
    } else {
      /* Si estaba marcado y ya no hay servicio web, lo desmarcamos */
      if (ikariCheckbox.checked) {
        ikariCheckbox.checked = false;
      }
      ikariCheckbox.disabled = true;
      ikariLabel.classList.add('is-disabled');
    }
  }

  function calcTotal() {
    var total = 0;
    var adsSelected = getSelectedAdsCount();

    checkboxes.forEach(function (cb) {
      if (!cb.checked) return;

      /* Si ambos Ads están seleccionados, no sumamos cada uno por separado */
      if (cb.dataset.group === 'ads' && adsSelected === 2) return;

      total += parseInt(cb.dataset.price || 0, 10);
    });

    /* Si están ambos, se agrega una sola vez el precio de paquete */
    if (adsSelected === 2) total += ADS_BUNDLE_PRICE;

    return total;
  }

  function formatMXN(num) {
    return '$' + num.toLocaleString('es-MX') + ' MXN';
  }

  function updateTotal() {
    syncIkariAvailability();

    var total = calcTotal();
    if (!totalEl) return;

    var hasCustom = Array.from(checkboxes).some(function (cb) {
      return cb.checked && cb.dataset.label === 'Proyecto a la Medida';
    });

    var adsSelected = getSelectedAdsCount();

    totalEl.textContent = hasCustom && total === 0
      ? 'Cotización personalizada'
      : formatMXN(total) + (hasCustom ? ' + cotización esp.' : '');

    /* Mensaje contextual: si eligió ambos Ads, avisamos del descuento */
    if (totalLabelEl) {
      totalLabelEl.textContent = adsSelected === 2
        ? 'Estimado de Inversión (incluye paquete Meta+Google):'
        : 'Estimado de Inversión Inicial:';
    }

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

  /* Estado inicial: Ikari deshabilitado hasta que se elija un servicio web */
  syncIkariAvailability();

  /* ── 3. CTA WhatsApp — mensaje natural ──────────────────── */
  function buildNaturalMessage(selected) {
    if (selected.length === 0) {
      return 'Hola VikingDev! Vengo del cotizador de su web y me gustaría recibir más información sobre sus servicios. ¡Gracias!';
    }

    var webServices = ['Landing Page', 'Página Web Completa', 'Tienda E-Commerce', 'Proyecto a la Medida'];
    var addonServices = ['Ikari CRM (Add-on)'];
    var adsServices = ['Meta Ads (no incluye inversión)', 'Google Ads (no incluye inversión)'];
    var crmServices = ['CRM HighLevel'];

    var web    = selected.filter(function (s) { return webServices.indexOf(s) !== -1; });
    var addon  = selected.filter(function (s) { return addonServices.indexOf(s) !== -1; });
    var ads    = selected.filter(function (s) { return adsServices.indexOf(s) !== -1; });
    var crm    = selected.filter(function (s) { return crmServices.indexOf(s) !== -1; });

    var friendlyName = {
      'Landing Page': 'una landing page',
      'Página Web Completa': 'una página web completa',
      'Tienda E-Commerce': 'una tienda en línea',
      'Proyecto a la Medida': 'un proyecto a la medida',
      'Ikari CRM (Add-on)': 'el complemento de Ikari CRM',
      'Meta Ads (no incluye inversión)': 'campañas en Meta Ads',
      'Google Ads (no incluye inversión)': 'campañas en Google Ads',
      'CRM HighLevel': 'un CRM en HighLevel'
    };

    var parts = [];
    web.forEach(function (s)   { parts.push(friendlyName[s]); });
    addon.forEach(function (s) { parts.push(friendlyName[s]); });
    ads.forEach(function (s)   { parts.push(friendlyName[s]); });
    crm.forEach(function (s)   { parts.push(friendlyName[s]); });

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