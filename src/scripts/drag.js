const galeria = document.querySelector('.galeria');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const enlaces = galeria.querySelectorAll('a'); // Selecciona todos los <a>
const imagenesPorPagina = 6;
let paginaActual = 1;

function mostrarImagenes() {
    const inicio = (paginaActual - 1) * imagenesPorPagina;
    const fin = inicio + imagenesPorPagina;

    enlaces.forEach((enlace, index) => {
        if (index >= inicio && index < fin) {
            enlace.style.display = 'block';
        } else {
            enlace.style.display = 'none';
        }
    });

    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = fin >= enlaces.length;
}

// Event listener para los enlaces
enlaces.forEach((enlace, index) => {
  enlace.addEventListener('click', (event) => {
  

    // Calcula la página a la que corresponde esta imagen
    const nuevaPagina = Math.floor(index / imagenesPorPagina) + 1;

    // Si la imagen no está en la página actual, cambia a esa página
    if (nuevaPagina !== paginaActual) {
      paginaActual = nuevaPagina;
      mostrarImagenes();
    }
    // Opcional:  Aquí podrías añadir otra acción (abrir un modal, etc.)
  });
});

btnAnterior.addEventListener('click', () => {
    paginaActual--;
    mostrarImagenes();
});

btnSiguiente.addEventListener('click', () => {
    paginaActual++;
    mostrarImagenes();
});

mostrarImagenes(); // Llama a la función para mostrar la página inicial