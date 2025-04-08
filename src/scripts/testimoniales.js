document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    const slides = sliderContainer.querySelectorAll('.testimonial-slide');
    const prevBtn = sliderContainer.querySelector('.ts-prev');
    const nextBtn = sliderContainer.querySelector('.ts-next');
    const dotsContainer = sliderContainer.querySelector('.testimonial-dots');

    // Verificar si todos los elementos necesarios existen
    if (!sliderContainer || !slides.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.error('Error: No se encontraron todos los elementos del slider. Verifica las clases CSS.');
        return; // Salir si falta algo
    }

    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval = null; // Para el auto-play

    // --- Funciones ---
    function createDots() {
        dotsContainer.innerHTML = ''; // Limpiar dots existentes
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button'); // Usar button por accesibilidad
            dot.classList.add('ts-dot');
            dot.dataset.index = i; // Guardar índice
            dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
            dot.addEventListener('click', () => {
                showSlide(i);
                resetInterval(); // Reiniciar auto-play al hacer clic
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots(index) {
        const dots = dotsContainer.querySelectorAll('.ts-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateButtons(index) {
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalSlides - 1;
    }

    function showSlide(index) {
        // Validar índice
        if (index < 0 || index >= totalSlides) {
            console.warn(`Índice de slide inválido: ${index}`);
            // Opcional: hacer que sea cíclico
             index = (index % totalSlides + totalSlides) % totalSlides;
            // return; // Si no quieres que sea cíclico
        }

        // Ocultar slide actual
        slides[currentIndex].classList.remove('active');

        // Mostrar nuevo slide
        currentIndex = index;
        slides[currentIndex].classList.add('active');

        // Actualizar dots y botones
        updateDots(currentIndex);
        // Descomenta la siguiente línea si NO quieres bucle infinito en botones
        // updateButtons(currentIndex);
    }

    // --- Auto-Play ---
    function startInterval() {
        clearInterval(slideInterval); // Limpiar anterior
        slideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % totalSlides; // Bucle infinito
            showSlide(nextIndex);
        }, 5000); // Cambia cada 7 segundos
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Pausar en hover (opcional)
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', startInterval);

    // --- Inicialización ---
    createDots();
    showSlide(0); // Mostrar el primer slide
    startInterval(); // Iniciar auto-play

    // --- Event Listeners Botones ---
    prevBtn.addEventListener('click', () => {
        // Usa módulo para bucle infinito o resta simple si los botones se deshabilitan
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
         // Usa módulo para bucle infinito o suma simple si los botones se deshabilitan
        let nextIndex = (currentIndex + 1) % totalSlides;
        showSlide(nextIndex);
        resetInterval();
    });

}); // Fin DOMContentLoaded