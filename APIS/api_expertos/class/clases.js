import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAQ1qr8ZO5TOZQxR5edJMNvizzqqEShHt4" });


async function autoincremental(num) {
    let id = num;
    return id = id + 1;
};
class Expert {
    constructor(vocacion, inputexpert, respuesta, historial) {
        this._vocacion = vocacion;
        this._inputexpert = inputexpert;
        this._respuesta = respuesta
        this._historial = historial
    }
    async saludar(nombre) {
        console.log(nombre)
    }
    async conversar() {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: this._respuesta,
            config: {
                systemInstruction: `${this._inputexpert},y eres el ${this._vocacion} este es el historial de la conversacion ${this._historial} respuesta cortas`,
            }
        });
        return response.text
    }
}
export default Expert
export { autoincremental }
