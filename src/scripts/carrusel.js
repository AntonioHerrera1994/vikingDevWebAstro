const roadmapContainer = document.getElementById('roadmap-container');
let isDragging = false;
let startX;
let startY; // Importante para evitar scroll vertical accidental
let scrollLeft;

// --- Eventos de Ratón (Escritorio) ---
roadmapContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - roadmapContainer.offsetLeft;
    startY = e.pageY - roadmapContainer.offsetTop;  // Guarda la posición Y inicial
    scrollLeft = roadmapContainer.scrollLeft;
    roadmapContainer.style.cursor = 'grabbing'; // Cambia el cursor
    roadmapContainer.style.userSelect = 'none'; // Evita selección de texto
});

roadmapContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    roadmapContainer.style.cursor = 'grab'; // Restaura el cursor
});

roadmapContainer.addEventListener('mouseup', () => {
    isDragging = false;
    roadmapContainer.style.cursor = 'grab'; // Restaura el cursor
});

roadmapContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); //  ¡Importante! Evita comportamiento predeterminado
    const x = e.pageX - roadmapContainer.offsetLeft;
    const walk = (x - startX) * 2; // Ajusta la velocidad
    roadmapContainer.scrollLeft = scrollLeft - walk;
});

// --- Eventos Táctiles (Móvil) ---
roadmapContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - roadmapContainer.offsetLeft;
    startY = e.touches[0].pageY - roadmapContainer.offsetTop; // Guarda la posición Y inicial
    scrollLeft = roadmapContainer.scrollLeft;
    roadmapContainer.style.userSelect = 'none'; // Evita selección de texto
    // No cambiamos el cursor en táctil
});

roadmapContainer.addEventListener('touchend', () => {
    isDragging = false;
});

roadmapContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // ¡CRUCIAL para evitar scroll de la página!

    const x = e.touches[0].pageX - roadmapContainer.offsetLeft;
    const y = e.touches[0].pageY - roadmapContainer.offsetTop;
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;

      // Verifica si el movimiento es principalmente horizontal
    if (Math.abs(walkX) > Math.abs(walkY)) {
         roadmapContainer.scrollLeft = scrollLeft - walkX;
    }

});