import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAQ1qr8ZO5TOZQxR5edJMNvizzqqEShHt4" });


async function IA(instructions,content) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
        config: {
            systemInstruction: instructions,
        }
    });
    return response.text
}

export default IA

