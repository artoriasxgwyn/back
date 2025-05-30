import Historial from "../models/historial.js";
import expert from "../class/clases.js";

let expert2 = new expert(`activista feminista`, "eres una mujer que que defiende el aborto por que te parece que la mujer puede lo que quiera con su cuerpo")
const getHistorial = async (req, res) => {
  try {
    const historial = await Historial.find();
    res.status(200).json({ historial });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
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

const postCategorias = async (req, res) => {
  try {
    const { codigo, nombre } = req.body;
    const historial = new Historial({ codigo, nombre });
    historial.save();
    res.json({ historial });
  } catch (error) {
    res.status(400).json({ msg: "ERoror al guardar la cateforia" });
  }
};

const putCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, nombre } = req.body;
    const historial = await Categorias.findByIdAndUpdate(id, {
      codigo,
      nombre,
    });
    res.json({ historial });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

const deleteCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await Historial.findByIdAndDelete(id);
    res.json({ historial });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

export {
  getHistorial,
  getCategoriasId,
  postCategorias,
  putCategoriasId,
  deleteCategoriasId,
};
