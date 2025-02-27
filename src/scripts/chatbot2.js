document.addEventListener("DOMContentLoaded", function() { //Espera a que cargue el HTML
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");
    const toggleIcon = document.getElementById("toggle-icon");

    let isChatbotVisible = false; // Variable para rastrear el estado

    chatbotToggle.addEventListener("click", function() {
        isChatbotVisible = !isChatbotVisible; // Invierte el estado

        if (isChatbotVisible) {
            chatbotContainer.style.display = "block"; // Muestra el chatbot
            toggleIcon.textContent = "❌"; // Cambia el icono a una "X"
        } else {
            chatbotContainer.style.display = "none"; // Oculta el chatbot
            toggleIcon.textContent = "💬"; // Cambia el icono al emoji de chat
        }
    });
    
    // Preguntas y respuestas predefinidas (¡AQUÍ ESTÁ LA CLAVE!)
    const respuestas = {
        "hola": "¡Hola! ¿En qué puedo ayudarte?",
        "¿cómo estás?": "Estoy bien, gracias por preguntar.",
        "¿qué haces?": "Respondo tus preguntas. ¡Pregunta lo que quieras!",
        "adiós": "¡Hasta luego! Que tengas un buen día.",
        "¿cual es tu nombre?": "Soy un chatbot, no tengo nombre.",
        "default": "No entiendo tu pregunta.  Intenta con algo más." // Respuesta por defecto
    };

    // Función para mostrar un mensaje en el chat
    function mostrarMensaje(mensaje, esUsuario) {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("message");
        mensajeDiv.classList.add(esUsuario ? "user-message" : "bot-message");
        mensajeDiv.textContent = mensaje;
        chatMessages.appendChild(mensajeDiv);
        // Scroll hacia abajo para mostrar el último mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Función para obtener la respuesta del chatbot
    function obtenerRespuesta(pregunta) {
        const preguntaNormalizada = pregunta.toLowerCase().trim(); // Convertir a minúsculas y quitar espacios extra
        
        // Buscar la respuesta en el objeto 'respuestas'
        for (let clave in respuestas) {
            if (preguntaNormalizada.includes(clave)) {
                return respuestas[clave];
            }
        }
        return respuestas["default"];  //Respuesta por defecto.
    }

    // Evento al hacer clic en el botón de enviar
    sendButton.addEventListener("click", function() {
        const pregunta = userInput.value;

        if (pregunta.trim() === "") { //Evita enviar mensajes vacios
            return;
        }

        // Mostrar el mensaje del usuario
        mostrarMensaje(pregunta, true);

        // Obtener y mostrar la respuesta del bot
        const respuesta = obtenerRespuesta(pregunta);
        mostrarMensaje(respuesta, false);

        // Limpiar el campo de entrada
        userInput.value = "";
    });

     // Evento al presionar Enter en el campo de entrada
     userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendButton.click(); // Simula un clic en el botón de enviar
        }
    });
});