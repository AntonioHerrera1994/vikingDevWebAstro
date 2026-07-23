

document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('.experience__row');
  if (!rows.length) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    rows.forEach((row) => row.classList.add('is-visible'));
    return;
  }

  rows.forEach((row) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    row.style.transition = 'opacity 500ms ease, transform 500ms ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  rows.forEach((row) => observer.observe(row));
});