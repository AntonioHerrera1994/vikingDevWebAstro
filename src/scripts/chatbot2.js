document.addEventListener("DOMContentLoaded", function() {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");
    const toggleIcon = document.getElementById("toggle-icon");
    const chatMessages = document.getElementById("chat-messages");
    const chatbotOptions = document.getElementById("chatbot-options"); // Referencia al contenedor de opciones

    let isChatbotVisible = false;

    chatbotToggle.addEventListener("click", function() {
        isChatbotVisible = !isChatbotVisible;
        chatbotContainer.style.display = isChatbotVisible ? "block" : "none";
        toggleIcon.textContent = isChatbotVisible ? "❌" : "💬";
    });

    // --- Estructura de datos MODIFICADA ---
    // Ahora usa 'mensajes' (plural) como un array de strings
    const preguntasYOpciones = {
        inicio: {
            // Mensaje inicial ahora es un array
            mensajes: ["¡Hola! 👋 Soy tu asistente virtual.", "¿En qué puedo ayudarte hoy?"],
            opciones: ["Información de servicios", "Horarios de atención", "Contacto"]
        },
        "Información de servicios": {
            mensajes: ["Claro, ofrecemos varios servicios.", "¿Sobre cuál te gustaría saber más?"], // Ejemplo con dos mensajes
            opciones: ["Página web", "Página E-commerce", "Aplicación movil", "Marketing digital", "Volver al inicio"] // Añadida opción Volver
        },
        "Horarios de atención": {
            mensajes: ["Nuestro horario de atención es de Lunes a Viernes, de 9:00 AM a 6:00 PM (horario Tijuana, B.C.)."], // Array con un solo mensaje
            opciones: ["Volver al inicio"]
        },
        "Contacto": {
            mensajes: [
                "Puedes contactarnos de las siguientes maneras:",
                '📧 Correo: <a href="mailto:info@empresa.com">info@empresa.com</a>',,
                '📞 Teléfono: <a href="tel:+526632477816">(663)247-7816</a>'
            ], // Ejemplo con múltiples mensajes
            opciones: ["Volver al inicio"]
        },
        "Página web": {
            mensajes: [
                "El desarrollo web se enfoca en crear la presencia digital fundamental de tu negocio.",
                "Tu sitio web profesional es tu carta de presentación en internet, diseñada para informar, atraer y generar confianza en tus visitantes.",
                "Desarrollamos ya sea un sitio web de una sola página (One Page) o una página web completa con más de una sección(Full Website).",
                "Utilizamos ya sea el gestor de contenido Wordpress (recomedado), Astro ó HTML y CSS puro, dependiendo de tus necesidades",
                "El desarrollo dura hasta 2 semanas dependiendo de la cantidad de contenido y va integrado y optimizado con SEO, Google Analytics y máximo rendimiento medido por Google.",
           
            ],
            opciones: ["Volver a Información de servicios", "Volver al inicio"] // Opciones más específicas de navegación
        },
        "Página E-commerce": {
            mensajes: [
                "El Desarrollo E-commerce consiste en construir tu tienda virtual.",
                "Creamos una plataforma segura y fácil de usar para que puedas vender tus productos o servicios directamente por internet, gestionando inventario, pagos y envíos.",
                "Desarrollamos tu tienda virtual con la cantidad de secciones que necesites y un máximo de 50 productos, listos para vender.",
                "Utilizamos ya sea el gestor de contenido Wordpress (recomedado), Astro, HTML y CSS puro ó React, dependiendo de tus necesidades",
                "El desarrollo dura hasta 2 semanas dependiendo de la cantidad de contenido y va integrado y optimizado con SEO, Google Analytics y máximo rendimiento medido por Google.",

                
            ],
            opciones: ["Volver a Información de servicios", "Volver al inicio"]
        },
        "Aplicación movil": {
            mensajes: [
                "El Desarrollo de aplicaciones móviles va más allá de un sitio web informativo.",
                "Creamos herramientas y sistemas a medida que funcionan desde cualquier dispositivo, diseñados para resolver necesidades específicas de tu negocio, automatizar procesos o interactuar de forma avanzada con tus usuarios (ej: portales de clientes, sistemas internos, CRMs a medida).",
                "El tiempo de desarrollo se estima en la primer reunion informativa.",

            ],
            opciones: ["Volver a Información de servicios", "Volver al inicio"]
        },
        "Marketing digital": {
            mensajes: [
                "El marketing digital es el conjunto de estrategias que usamos para aumentar la visibilidad de tu negocio en internet.",
                "Atraemos a tu público objetivo y convertimos esas visitas en clientes reales utilizando canales como SEO (posicionamiento en buscadores), redes sociales, publicidad en Google Ads, email marketing y marketing de contenidos.",
            ],
            opciones: ["Volver a Información de servicios", "Volver al inicio"]
        },
         "Volver al inicio": { // Esta opción ahora usa 'mensajes'
            mensajes: ["Entendido. ¿En qué más puedo ayudarte?"],
            opciones: ["Información de servicios", "Horarios de atención", "Contacto"]
        },
        "Volver a Información de servicios":{ // Nueva opción de navegación
            mensajes: ["Volviendo a servicios. ¿Sobre cuál te interesa saber?"], // Usa 'mensajes'
            opciones: ["Página web", "Página E-commerce", "Aplicación movil", "Marketing digital", "Volver al inicio"]
        }
        // Elimina "Volver a Información de productos" si ya no es relevante
    };

    // Función para mostrar mensajes (sin cambios)
    function mostrarMensaje(mensaje, esUsuario) {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("message");
        mensajeDiv.classList.add(esUsuario ? "user-message" : "bot-message");
        // Para permitir saltos de línea si los incluyes en los strings:
        mensajeDiv.innerHTML = mensaje.replace(/\n/g, '<br>');
        chatMessages.appendChild(mensajeDiv);
        // Scroll automático al último mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Función para mostrar opciones (sin cambios)
    function mostrarOpciones(opciones) {
        chatbotOptions.innerHTML = ""; // Limpiar opciones anteriores

        if (!opciones || opciones.length === 0) {
            // Si no hay opciones, no mostrar nada o un mensaje final
            // chatbotOptions.innerHTML = "<p>Fin de la conversación.</p>";
            return;
        }

        opciones.forEach(opcion => {
            const boton = document.createElement("button");
            boton.classList.add("chatbot-option-button");
            boton.textContent = opcion;
            boton.addEventListener("click", () => opcionSeleccionada(opcion));
            chatbotOptions.appendChild(boton);
        });
    }

    // --- Función opcionSeleccionada MODIFICADA ---
    function opcionSeleccionada(opcion) {
        mostrarMensaje(opcion, true); // Mostrar la opción elegida como mensaje del usuario

        // Limpiar opciones inmediatamente para que no se puedan clickear mientras responde el bot
        chatbotOptions.innerHTML = "Escribiendo..."; // Opcional: texto de carga

        const siguientePaso = preguntasYOpciones[opcion] || preguntasYOpciones["inicio"]; // Obtener el siguiente paso o volver al inicio

        // Verificar si hay mensajes y si es un array
        if (siguientePaso.mensajes && Array.isArray(siguientePaso.mensajes)) {
            // Recorrer y mostrar cada mensaje del bot
            // Usamos un pequeño retardo entre mensajes para simular escritura (opcional)
            let delay = 0;
            siguientePaso.mensajes.forEach((msg, index) => {
                setTimeout(() => {
                    mostrarMensaje(msg, false);
                    // Mostrar las opciones solo DESPUÉS del último mensaje
                    if (index === siguientePaso.mensajes.length - 1) {
                        mostrarOpciones(siguientePaso.opciones);
                    }
                }, delay);
                delay += 700; // Aumenta el retardo para el siguiente mensaje (ajusta 700ms como prefieras)
            });
        } else {
            // Fallback o mensaje de error si la estructura no es la esperada
            console.error("Configuración inválida para la opción:", opcion);
            mostrarMensaje("Lo siento, no puedo procesar esa opción en este momento.", false);
            // Mostrar opciones de inicio como recuperación
            mostrarOpciones(preguntasYOpciones.inicio.opciones);
        }
    }

    // --- Iniciar la conversación ---
    // Mostrar el/los mensaje(s) inicial(es) del bot
    if (preguntasYOpciones.inicio.mensajes && Array.isArray(preguntasYOpciones.inicio.mensajes)) {
        let initialDelay = 0;
        preguntasYOpciones.inicio.mensajes.forEach((msg, index) => {
            setTimeout(() => {
                mostrarMensaje(msg, false);
                // Mostrar opciones después del último mensaje inicial
                if (index === preguntasYOpciones.inicio.mensajes.length - 1) {
                    mostrarOpciones(preguntasYOpciones.inicio.opciones);
                }
            }, initialDelay);
            initialDelay += 700; // Retardo inicial
        });
    } else {
        // Si algo falla con la estructura inicial
        mostrarMensaje("Bienvenido. ¿Cómo puedo ayudarte?", false);
        mostrarOpciones(preguntasYOpciones.inicio.opciones);
    }
});