// AD Social Mock: rota entre Feed, Stories y Reels mientras está en pantalla.
// Si la persona elige un formato, la rotación se detiene.
const mock = document.querySelector('[data-camp-so]');

if (mock) {
  const buttons = Array.from(mock.querySelectorAll('[data-so-set]'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;
  let index = 0;

  const show = (i) => {
    index = i;
    const id = buttons[i].dataset.soSet;
    mock.dataset.format = id;
    buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    if (reduce || timer) return;
    timer = setInterval(() => show((index + 1) % buttons.length), 3200);
  };

  let userPicked = false;
  buttons.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      userPicked = true;
      stop();
      show(i);
    })
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPicked) start();
      else stop();
    }, { threshold: 0.4 });
    io.observe(mock);
  }
}
