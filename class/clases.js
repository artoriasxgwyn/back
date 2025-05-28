import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAQ1qr8ZO5TOZQxR5edJMNvizzqqEShHt4" });
const test = {
    nombre: "johann",
    apellidos: "silva",
    func: function () {
        const namecomplete = `mi nombre completo es ${this.nombre}  ${this.apellidos}`;
        console.log(namecomplete);
    }
};

const historial = [
    {
        vocacion: "medico",
        mensaje: "hola que opinas de jesus"
    }
];

class Expert {
    constructor(vocacion, inputexpert) {
        this._vocacion = vocacion;
        this._inputexpert = inputexpert;
    }
    async conversar() {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${historial.at(-1).mensaje}`,
            config: {
                systemInstruction: `${this._inputexpert}, si el ${historial.at(-1).vocacion} es igual a ${this._vocacion} quiere decir que el mensaje es tuyo asi solo sigues explicado lo que estabas diciendo y dame el texto en un solo parrafo`,
            }
        });
        let respuesta = {
            vocacion: this._vocacion,
            data: response.text
        }
        historial.push(respuesta)
        console.log(historial.at(-1))
    }
}
let expert1 = new Expert(`medico`, "has vivido toda tu vida creyendo que el aborto es algo normal y has participado en varios abortos pero ya no piensas igual por que no te parece correcto por tus creencias religiosas")
let expert2 = new Expert(`activista feminista`, "eres una mujer que que defiende el aborto por que te parece que la mujer puede lo que quiera con su cuerpo")
console.log(await expert1.conversar())
console.log(await expert2.conversar())
console.log(await expert1.conversar())
console.log(await expert2.conversar())
console.log(await expert1.conversar())
console.log(await expert2.conversar())
console.log(await expert1.conversar())
