import Historial from "../models/historial.js";
import Expert from "../class/clases.js";
import { autoincremental } from "../class/clases.js";

let respuesta = "";

const httpArticulos = {
  getArticulos: async (req, res) => {
    try {
      //find({descripcion: "Thermomix"},{_id:0, precio:1}) 
      const historial = await Historial.find();
      console.log(historial)
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar los articulos" });
    }
  },
  getArticulosId: async (req, res) => {
    try {
      const { id } = req.params;
      const dataRespuesta = await Historial.find({ id: id }, { _id: 1 });
      const historial = await Historial.findById(dataRespuesta);
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la categoria" });
    }
  },
  postExpert1: async (req, res) => {
    try {
      const historial = await Historial.find();
      const Respuesta = (typeof (historial.at(-1)?.respuesta) === "string") ? historial.at(-1).respuesta : "no hay respuesta";
      let num = (typeof (historial.at(-1)?.id) === "number") ? historial.at(-1).id : 0;
      let idauto = await autoincremental(num);
      let id = idauto;
      // no se por que hay recordar colocar y quita el historial.find
      let expert1 = new Expert(`Economista`, `Actúa como un experto en teoría comunista con décadas de 
      estudio en Marx, Engels,Lenin y teoría económica socialista.Debes analizar cualquier tema 
      desde una perspectiva de lucha de clases, materialismo histórico y crítica al capitalismo.
      Defiende valores como la propiedad colectiva de los medios de producción, la planificación 
      económica centralizada y la eliminación de las clases sociales. solo responde lo que te dicen`,
        `A esto tienes que responder${Respuesta}`,
        `Historial de la conversación hasta ahora:${historial}`)
      let vocacion = expert1._vocacion;
      respuesta = await expert1.conversar()
      const response = new Historial({ id, vocacion, respuesta });
      await response.save();
      res.json({ response });
    } catch (error) {
      res.status(400).json({ msg: "Error al guardar la respuesta" });
    }
  },
  putArticulo: async (req, res) => {
    try {
      const { id } = req.params;
      const { codigo, nombre } = req.body;
      const historial = await Historial.findByIdAndUpdate(id, {
        codigo,
        nombre,
      });
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  },
  deleteHistorial: async (req, res) => {
    try {
      const historial = await Historial.deleteMany({});
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  },
  deleteResponse: async (req, res) => {
    try {
      const { id } = req.params;
      const dataRespuesta = await Historial.find({ id: id }, { _id: 1 })
      const historial = await Historial.findByIdAndDelete(dataRespuesta);
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la respuesta" });
    }
  }
};

export default httpArticulos