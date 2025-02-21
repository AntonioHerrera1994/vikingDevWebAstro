const roadmapContainer = document.getElementById('roadmap-container');
let isDragging = false;
let startX;
let scrollLeft;

roadmapContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - roadmapContainer.offsetLeft;
  scrollLeft = roadmapContainer.scrollLeft;
});

roadmapContainer.addEventListener('mouseleave', () => {
  isDragging = false;
});

roadmapContainer.addEventListener('mouseup', () => {
  isDragging = false;
});

roadmapContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - roadmapContainer.offsetLeft;
  const walk = (x - startX) * 2; // Ajusta la velocidad de desplazamiento
  roadmapContainer.scrollLeft = scrollLeft - walk;
});