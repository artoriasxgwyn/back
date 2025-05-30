import Historial from "../models/historial.js";
import expert from "../class/clases.js";
//const articulos = await Articulos.find();
//console.log(articulos)
let respuesta="";
let idauto = 0;
let expert1 = new expert(`medico`, "has vivido toda tu vida creyendo que el aborto es algo normal y has participado en varios abortos pero ya no piensas igual por que no te parece correcto por tus creencias religiosas",`${Historial.find()}`)
let vocacion = expert1._vocacion;


function autoincremental() {
    return idauto = idauto + 1;
}


const httpArticulos = {
  getArticulos: async (req, res) => {
    try {
      const historial = await Historial.find();
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar los articulos" });
    }
  },
  getArticulosId: async (req, res) => {
    try {
      const { id } = req.params;
      const historial = await Historial.findById(id);
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la categoria" });
    }
  },
  postArticulo: async (req, res) => {
    try {
      expert1.conversar()
      respuesta = await expert1.conversar()
      //const { codigo, nombre } = req.body;
      const historial = new Historial({ idauto,vocacion, respuesta });
      await historial.save();
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al guardar la cateforia" });
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
  deleteArticulo: async (req, res) => {
    try {
      const { id } = req.params;
      const historial = await Historial.findByIdAndDelete(id);
      res.json({ historial });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  },
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

export default httpArticulos