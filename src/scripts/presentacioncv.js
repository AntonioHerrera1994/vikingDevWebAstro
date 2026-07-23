// Profile.js — VikingDev Design System
// Dispara la animación de entrada al cargar la sección.

document.addEventListener('DOMContentLoaded', () => {
  const profile = document.getElementById('perfil');
  if (!profile) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    profile.classList.add('is-revealed');
    return;
  }

  // Pequeño delay para que el fade-up se sienta intencional, no instantáneo.
  requestAnimationFrame(() => {
    setTimeout(() => profile.classList.add('is-revealed'), 80);
  });
});