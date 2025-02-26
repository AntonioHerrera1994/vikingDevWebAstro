// src/pages/api/chatbot.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import {  validateFileTypeAndSize } from '../../lib/utils'; // Importa la función de validación

const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const model_vision = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const MAX_HISTORY_LENGTH = 10;  // Limita el historial a los últimos 10 mensajes

async function processGeminiResponse(modelToUse, chatHistory) {
    try {
        const result = await modelToUse.generateContent(chatHistory);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error en generateContent:", error);
        // Importante: No expongas detalles del error interno al cliente.
        throw new Error("Error al procesar la solicitud con la API de Gemini."); // Lanza un error genérico.
    }
}

export async function POST({ request }) {
    try {
        const requestData = await request.json();
        const { prompt, fileData, fileMimeType } = requestData;

        if (!prompt && !fileData) {
            return new Response(JSON.stringify({ error: "Se requiere un mensaje o un archivo." }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

         //Validación del archivo.
        if (fileData) {
            const isValid = validateFileTypeAndSize(fileMimeType, fileData);
            if (!isValid.valid) {
                return new Response(JSON.stringify({ error: isValid.error }), { status: 400, headers: { "Content-Type": "application/json" } });
            }
        }

        // Construye el historial de chat, limitando su tamaño.  Adaptado para manejar texto e imágenes.
        let chatHistory = requestData.chatHistory || [];
        if(chatHistory.length > MAX_HISTORY_LENGTH){
            chatHistory = chatHistory.slice(-MAX_HISTORY_LENGTH); // Conserva solo los últimos mensajes
        }

        //Añade la entrada del usuario actual al historial
        const userMessage = {
            role: "user",
            parts: []
        };

        if(prompt) {
             userMessage.parts.push({text: prompt});
        }

        if (fileData) {
             userMessage.parts.push({inline_data: { mime_type: fileMimeType, data: fileData}});
        }

        chatHistory.push(userMessage);

        let modelToUse = model;
        if(fileData) {
          modelToUse = model_vision; //Usa el modelo de vision si se añadió un archivo.
        }


        const geminiResponse = await processGeminiResponse(modelToUse, chatHistory);

        //Añade la respuesta al historial.
        chatHistory.push({
            role: "model",
            parts: [{text: geminiResponse}]
        });


        return new Response(JSON.stringify({ respuesta: geminiResponse, chatHistory: chatHistory }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error en API Route:", error); // Log del error completo en el servidor
        return new Response(JSON.stringify({ error: error.message || "Error desconocido" }), { //Devuelve un error
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}