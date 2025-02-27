const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const senMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wraper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");


//Configuración de API
//const API_KEY = "AIzaSyDmhmU58I5lcpH9kEvQwH3FAZSVVxhjpw0";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
}

const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

//crear un elemento de mensaje con clases dinámicas y lo devuelve
const createMessageElement = (content, ...classes) =>{
    const div = document.createElement("div");
    div.classList.add("meesage", ...classes);
    div.innerHTML = content;
    return div;
}

//Genera la respuesta del bot
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    //agrega el historial del chat del usuario
    chatHistory.push({
        role: "user",
        parts: [{ text: userData.message}, ...(userData.file.data ? [{ inline_data: userData.file}] : [])]
    });


    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: chatHistory
        })
    }
    try {
        // Obtiene la respuesta del bot desde la API
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        //Extrae y muestra la respuesta del bot
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = apiResponseText;

        //agrega el historial de respuestas del chat
        chatHistory.push({
            role: "model",
            parts: [{ text: userData.message}]
        });

    } catch(error){
        console.log(error);
        messageElement.innerText = error.message;
        messageElement.style.color = "#ff0000";
    } finally{
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
    }
}

//gestiona los mensajes salientes de los usuarios
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value= "";
    fileUploadWrapper.classList.remove("file-uploaded");
    messageInput.dispatchEvent(new Event("input"));


    //crea y muestra el  mensaje del usuario
    const messageContent = `<div class="message-text"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});


    setTimeout(() => {
        const messageContent = `<i class="bi bi-robot"></i>
        <div class="message-text">
            <div class="thinking-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>`;

        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
        generateBotResponse(incomingMessageDiv);
    }, 600);

}

//pulsa la tecla enter para enviar mensajes
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if(e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768) {
        handleOutgoingMessage(e);
    }
});

//ajusta el espacio de la caja de texto danamicamente
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
   document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px"; 
});

//gestiona el cambio de entrada de archivos y muestra la vista previa
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64string = e.target.result.split(",")[1];

        //almacene en userData el archivo
        userData.file = {
            data: base64string,
            mime_type: file.type
        }
        fileInput.value = "";
    }
    reader.readAsDataURL(file);
});

//cancela la subida de imagenes
fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded")
});


senMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatot"));
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatot"));