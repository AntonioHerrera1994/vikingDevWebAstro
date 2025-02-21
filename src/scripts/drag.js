const galeria = document.querySelector('.galeria');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const imagenes = galeria.querySelectorAll('img'); // Selecciona TODAS las imágenes
const imagenesPorPagina = 6;
let paginaActual = 1;

function mostrarImagenes() {
const inicio = (paginaActual - 1) * imagenesPorPagina;
const fin = inicio + imagenesPorPagina;

// Muestra u oculta las imágenes según la página actual
imagenes.forEach((img, index) => {
    if (index >= inicio && index < fin) {
        img.style.display = 'block'; // Muestra la imagen
    } else {
        img.style.display = 'none'; // Oculta la imagen
    }
});

// Deshabilitar/habilitar botones
btnAnterior.disabled = paginaActual === 1;
btnSiguiente.disabled = fin >= imagenes.length;
}

btnAnterior.addEventListener('click', () => {
    paginaActual--;
    mostrarImagenes();
});

btnSiguiente.addEventListener('click', () => {
    paginaActual++;
    mostrarImagenes();
});