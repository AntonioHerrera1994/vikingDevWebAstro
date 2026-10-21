// AD Search Mock: escribe la búsqueda letra por letra al entrar en pantalla
// y después muestra el anuncio y los resultados. Sin JS se ve el estado final.
const mock = document.querySelector('[data-camp-sm]');

if (mock && 'IntersectionObserver' in window) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const target = mock.querySelector('[data-camp-sm-query]');
  const query = mock.dataset.query || target.textContent;

  if (!reduce && target) {
    target.textContent = '';
    mock.classList.add('is-typing');

    const type = (i = 0) => {
      target.textContent = query.slice(0, i);
      if (i < query.length) {
        setTimeout(() => type(i + 1), 70 + Math.random() * 60);
      } else {
        setTimeout(() => {
          mock.classList.remove('is-typing');
          mock.classList.add('is-done');
        }, 350);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setTimeout(type, 300);
      },
      { threshold: 0.5 }
    );
    io.observe(mock);
  }
}
