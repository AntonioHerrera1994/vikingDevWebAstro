document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    const cursorElement = document.querySelector('.cursor');
    const texts = [
        "Sabemos que elegir al socio digital adecuado es una decisión importante, y nos sentimos honrados de que consideres a VikingDev para dar vida a tu proyecto. Tu confianza es el motor que impulsa nuestra creatividad y nuestro compromiso con la excelencia. Estamos emocionados de la posibilidad de colaborar contigo y construir algo extraordinario juntos. ¡Prepárate para ver tus ideas transformarse en una realidad digital impactante!"
       
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingComplete = false;
    let completeTime = 0;
    let typingSpeed = 10; // Velocidad base en ms

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            // Escribiendo
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 10 + Math.random() * 50; // Variación aleatoria para efecto más natural
        } else if (isDeleting && charIndex > 0) {
            // Borrando
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 10; // Borrar más rápido
        } else {
            // Cambiar entre escribir y borrar
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            
            if (!isDeleting && charIndex === 0) {
                // Texto completado
                typingComplete = true;
                completeTime = Date.now();
            } else {
                typingComplete = false;
            }
            
            typingSpeed = isDeleting ? 2000 : 500; // Pausa antes de borrar/escribir
        }
        
        setTimeout(typeWriter, typingSpeed);
    }

    function checkReset() {
        if (typingComplete && (Date.now() - completeTime) >= 60000) { // 60,000 ms = 1 minuto
            // Reiniciar el ciclo
            textIndex = 0;
            charIndex = 0;
            isDeleting = false;
            typingComplete = false;
            typewriterElement.textContent = '';
        }
        
        requestAnimationFrame(checkReset);
    }

    // Iniciar efectos
    setTimeout(typeWriter, 500); // Comenzar después de 1 segundo
    checkReset(); // Iniciar el verificador de reinicio
});