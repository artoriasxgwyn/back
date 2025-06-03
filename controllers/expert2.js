import Historial from "../models/historial.js";
import Expert from "../class/clases.js";
import { autoincremental } from "../class/clases.js";

let respuesta = "";

const getHistorial = async (req, res) => {
  try {
    //find({descripcion: "Thermomix"},{_id:0, precio:1}) 
    const historial = await Historial.find();
    res.json({ historial });
    console.log(typeof (historial.at(-1).respuesta))
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar los articulos" });
  }
};

const getCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await Historial.findById(id);
    res.json({ historial });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

const postExpert2 = async (req, res) => {
  try {
    const historial = await Historial.find();
    const Respuesta = (typeof (historial.at(-1)?.respuesta) === "string")
      ? historial.at(-1).respuesta
      : "no hay respuesta";
    let num = (typeof (historial.at(-1)?.id) === "number")
      ? historial.at(-1).id
      : 0;
    let idauto = await autoincremental(num);
    let id = idauto;
    // no se por que hay recordar colocar y quita el historial.find
    let expert2 = new Expert(`Filosofo`, `Actúa como un experto en pensamiento conservador 
      y economía de libre mercado con décadas de estudio en autores como Hayek, Friedman, 
      y teoría política tradicional. Debes analizar cualquier tema desde una perspectiva
      que valore la libertad individual, los mercados libres, la propiedad privada, 
      y los valores tradicionales.Defiende principios como el estado limitado, la meritocracia
      y la importancia de lasinstituciones tradicionales.
      Por favor, responde a cada uno de los mensajes de manera consistente con la ideología conservadora.`,
      `A esto tienes que responder:${Respuesta}`,
      `Historial de la conversación hasta ahora:${historial}`)
    let vocacion = expert2._vocacion;
    respuesta = await expert2.conversar()
    const response = new Historial({ id, vocacion, respuesta });
    await response.save();
    res.json({ response });
  } catch (error) {
    res.status(400).json({ msg: "Error al guardar la respuesta" });
  }

}

const putCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuesta } = req.body;
    const dataRespuesta = await Historial.find({ id: id }, { _id: 1 });
    console.log(respuesta)
    const historial = await Historial.findByIdAndUpdate(dataRespuesta, { respuesta }, { new: true });
    console.log(historial)
    res.json({ historial });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};
const deleteHistorial = async (req, res) => {
    try {
      const historial = await Historial.deleteMany({});
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  }
const deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const dataRespuesta = await Historial.find({ id: id }, { _id: 1 })
    const historial = await Historial.findByIdAndDelete(dataRespuesta);
    res.json({ historial });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

export {
  getHistorial,
  getCategoriasId,
  postExpert2,
  putCategoriasId,
  deleteHistorial,
  deleteResponse,
};
