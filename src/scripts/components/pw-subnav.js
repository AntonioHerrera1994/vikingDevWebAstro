// PW Subnav: marca la sección visible y mantiene el enlace activo a la vista.
const nav = document.querySelector('[data-pw-subnav]');

if (nav && 'IntersectionObserver' in window) {
  const links = Array.from(nav.querySelectorAll('[data-target]'));
  const sections = links
    .map((link) => document.getElementById(link.dataset.target))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.dataset.target === id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
        // Desplaza la barra horizontal en móvil sin mover la página
        const list = link.closest('ul');
        if (list) {
          const left = link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
          list.scrollTo({ left, behavior: 'smooth' });
        }
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' } // franja central de la pantalla
  );

  sections.forEach((section) => io.observe(section));
}
