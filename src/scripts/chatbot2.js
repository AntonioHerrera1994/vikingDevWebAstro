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

    // --- Parte nueva: Lógica de las opciones ---

    const preguntasYOpciones = {
        inicio: {
            mensaje: "¡Hola! ¿En qué puedo ayudarte?",
            opciones: ["Información de productos", "Horarios de atención", "Contacto"]
        },
        "Información de productos": {
            mensaje: "¿Sobre qué producto te interesa saber?",
            opciones: ["Producto A", "Producto B", "Volver al inicio"]
        },
        "Horarios de atención": {
            mensaje: "Nuestro horario es de Lunes a Viernes de 9:00 a 18:00.",
            opciones: ["Volver al inicio"]
        },
        "Contacto": {
            mensaje: "Puedes contactarnos por correo a info@empresa.com o al teléfono 123-456-7890.",
            opciones: ["Volver al inicio"]
        },
        "Producto A": {
            mensaje: "El Producto A es genial. Tiene X, Y y Z características.",
            opciones: ["Volver a Información de productos", "Volver al inicio"]
        },
        "Producto B": {
            mensaje: "El Producto B es aún mejor.  Ofrece A, B y C ventajas.",
            opciones: ["Volver a Información de productos", "Volver al inicio"]
        },
         "Volver al inicio": {
            mensaje: "¡Hola! ¿En qué puedo ayudarte?",
            opciones: ["Información de productos", "Horarios de atención", "Contacto"]
        },
        "Volver a Información de productos":{
            mensaje: "¿Sobre qué producto te interesa saber?",
            opciones: ["Producto A", "Producto B", "Volver al inicio"]
        }
    };

    function mostrarMensaje(mensaje, esUsuario) {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("message");
        mensajeDiv.classList.add(esUsuario ? "user-message" : "bot-message");
        mensajeDiv.textContent = mensaje;
        chatMessages.appendChild(mensajeDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


    function mostrarOpciones(opciones) {
    chatbotOptions.innerHTML = ""; // Limpiar opciones anteriores

    opciones.forEach(opcion => {
        const boton = document.createElement("button");
        boton.classList.add("chatbot-option-button");
        boton.textContent = opcion;
        boton.addEventListener("click", () => opcionSeleccionada(opcion));
        chatbotOptions.appendChild(boton);
    });
}

    function opcionSeleccionada(opcion) {
        mostrarMensaje(opcion, true); // Mostrar la opción elegida como mensaje del usuario
        const siguientePaso = preguntasYOpciones[opcion] || preguntasYOpciones["inicio"]; // Obtener el siguiente paso

        mostrarMensaje(siguientePaso.mensaje, false); // Mostrar mensaje del bot
        mostrarOpciones(siguientePaso.opciones); // Mostrar nuevas opciones
}


    // Iniciar la conversación
    mostrarOpciones(preguntasYOpciones.inicio.opciones);

});