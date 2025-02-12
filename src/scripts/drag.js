const scrollContainer = document.querySelector('.scroll-container');

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

scrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
});

scrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 1; // Ajusta este valor para la sensibilidad del arrastre
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// Para dispositivos táctiles (opcional):
scrollContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches && e.touches.length > 0) { // Check if touches are available
        startX = e.touches.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    }
});

scrollContainer.addEventListener('touchend', () => {
    isDragging = false;
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (!isDragging ||!e.touches || e.touches.length === 0) return; // Check touches

    const x = e.touches.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1; // Ajusta este valor para la sensibilidad del arrastre
    scrollContainer.scrollLeft = scrollLeft - walk;
});