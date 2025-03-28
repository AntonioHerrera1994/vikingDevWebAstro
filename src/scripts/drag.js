const galeria = document.querySelector('.galeria');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const enlaces = Array.from(galeria.querySelectorAll('a')); // Convertir a Array

let imagenesPorPagina = 6; // Por defecto para escritorio

// Detectar si es móvil al cargar la página
if (window.matchMedia("(max-width: 767px)").matches) {
  imagenesPorPagina = 2; // Cambiar a 2 imágenes por página en móvil
}

let paginaActual = 1;

function mostrarImagenes() {
  const inicio = (paginaActual - 1) * imagenesPorPagina;
  const fin = inicio + imagenesPorPagina;

  // Asegurarse que todos estén ocultos antes de mostrar los correctos
  enlaces.forEach(enlace => enlace.style.display = 'none');

  // Mostrar solo los de la página actual
  const enlacesPagina = enlaces.slice(inicio, fin);
  enlacesPagina.forEach(enlace => enlace.style.display = 'block');

  // Habilitar/deshabilitar botones
  btnAnterior.disabled = paginaActual === 1;
  // Corregir lógica de deshabilitar siguiente: comparar fin con el total
  btnSiguiente.disabled = fin >= enlaces.length;
}

// --- El resto de tus listeners de eventos (sin cambios) ---

// Event listener para los enlaces (corregido para usar el array)
enlaces.forEach((enlace, index) => {
  enlace.addEventListener('click', (event) => {
    // Calcula la página a la que corresponde esta imagen
    // Necesitamos recalcular imagenesPorPagina aquí si la ventana cambia de tamaño
    // Pero para simplificar, usamos el valor inicial detectado
    let currentImagenesPorPagina = 6;
    if (window.matchMedia("(max-width: 767px)").matches) {
        currentImagenesPorPagina = 2;
    }

    const nuevaPagina = Math.floor(index / currentImagenesPorPagina) + 1;

    // Si la imagen no está en la página actual, cambia a esa página
    if (nuevaPagina !== paginaActual) {
      paginaActual = nuevaPagina;
      mostrarImagenes();
    }
  });
});

btnAnterior.addEventListener('click', () => {
    if (paginaActual > 1) { // Asegurar que no baje de 1
        paginaActual--;
        mostrarImagenes();
    }
});

btnSiguiente.addEventListener('click', () => {
    // Calcular el número total de páginas
    let currentImagenesPorPagina = 6;
    if (window.matchMedia("(max-width: 767px)").matches) {
        currentImagenesPorPagina = 2;
    }
    const totalPaginas = Math.ceil(enlaces.length / currentImagenesPorPagina);

    if (paginaActual < totalPaginas) { // Asegurar que no suba más allá de la última página
        paginaActual++;
        mostrarImagenes();
    }
});


mostrarImagenes(); // Llama a la función para mostrar la página inicial

// Opcional: Escuchar cambios de tamaño de ventana para reajustar
// Esto puede ser más complejo y requerir "debouncing" para no ejecutarlo demasiado
/*
window.addEventListener('resize', () => {
    let currentImagenesPorPagina = 6;
    if (window.matchMedia("(max-width: 767px)").matches) {
        currentImagenesPorPagina = 2;
    }
    if (imagenesPorPagina !== currentImagenesPorPagina) {
        imagenesPorPagina = currentImagenesPorPagina;
        // Resetear a página 1 o ajustar página actual si queda fuera de rango
        paginaActual = 1;
        mostrarImagenes();
    }
});
*/